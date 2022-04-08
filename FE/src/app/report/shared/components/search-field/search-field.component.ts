import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, debounceTime, EMPTY, filter, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { LocationSearchService } from 'src/app/weather-org/services/location-search.service';
import { Geo } from 'src/app/weather-org/types/geo.type';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() selectedGeo: EventEmitter<Geo> = new EventEmitter<Geo>();
  ngSelectTypeHead: EventEmitter<string> = new EventEmitter();
  ngSelectSpinner = false;
  ngSlectItems: Geo[] = [];
  stopListeners$ = new Subject();
  constructor(
    private locationSearchService: LocationSearchService,
    private toastr: ToastrService,
  ) { }

  private listenToNgSelectTypeHead() {
    this.ngSelectTypeHead.pipe(
      takeUntil(this.stopListeners$),
      filter(query => query?.length > 3),
      debounceTime(1000),
      tap(_ => this.ngSelectSpinner = true),
      switchMap(query => this.locationSearchService.getCityInfo(query)),
      catchError(error => of(error).pipe(
        tap(_ => {
          this.toastr.error('server error!');
          this.ngSelectSpinner = false;
        }),
        switchMap(_ => EMPTY)
      ))
    ).subscribe(
      next => {
        this.ngSlectItems = next;
        this.ngSelectSpinner = false;
      },
    );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.listenToNgSelectTypeHead();
  }

  monitorNgSelectChanges($event: Geo) {
    this.selectedGeo.emit($event);
  }

  ngOnDestroy(): void {
    this.stopListeners$.next(true);
    this.stopListeners$.complete();
  }
}

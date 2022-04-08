import { City } from "./city.type";
import { ForcastList } from "./forcast-list.type";

export type Forcast = {
    cod: string,
    city:City,
    message: number,
    cnt: number,
    list: ForcastList[]
};
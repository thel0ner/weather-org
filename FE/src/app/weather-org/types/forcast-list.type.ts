import { Clouds } from "./clouds.type";
import { ForcastMain } from "./focast-main.type";
import { Weather } from "./weather.type";
import { Wind } from "./wind.type";

export type ForcastList = {
    dt: number,
    main: ForcastMain,
    weather: Weather[],
    clouds: Clouds,
    wind: Wind,
    visibility: number,
    pop: number,
    dt_txt: string,
};
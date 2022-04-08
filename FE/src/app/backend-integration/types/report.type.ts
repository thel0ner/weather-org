import { Forcast } from "src/app/weather-org/types/forcast.type";

export type Report = {
    totalValues: number,
    totalPages: number,
    rows: Forcast[],
    error: boolean
};
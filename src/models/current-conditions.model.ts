import {Place} from "./place.model";

export class CurrentConditions  {
  date: string;
  measurementTime: string;
  place: Place; // nearest place (locality)
  station?: string; // weather station name
  temp: number;
  relativeHumidity: number;
  dewPoint?: number;
  precipitationToday: number;
}

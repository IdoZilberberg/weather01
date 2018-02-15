import {Coords} from "./coords.model";

export class CurrentConditions  {
  date: string;
  measurementTime: string;
  // place: Place; // nearest place (locality)
  coords: Coords;
  station?: string; // weather station name
  temp: number;
  relativeHumidity: number;
  dewPoint?: number;
  precipitationToday: number;
}

import {Coords} from "./coords.model";

export class CurrentConditions  {
  date: string;
  measurementTime: string;
  // place: Place; // nearest place (locality)
  coords: Coords;
  station?: string; // weather station name
  temp: number;
  feelsLike: number;
  weather?: string;
  relativeHumidity: number;
  dewPoint?: number;
  precipitationToday: number;
  icon?: string;
  iconUrl?: string;
}

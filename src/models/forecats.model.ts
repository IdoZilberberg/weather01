import {Coords} from "./coords.model";

export class Forecast {

  date: string;
  measurementTime: string;
  coords: Coords;
  station: string;
  tempHigh: number;
  tempLow: number;
  conditions: string;
  icon: string;
  iconUrl: string;
  rainDay?: number;
  rainNight?: number;
  snowDay?: number;
  snowNight?: number;
  windSpeed: number;
  windDirection: string;

}

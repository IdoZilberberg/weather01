import {Coords} from "./coords.model";

export class Forecast {

  targetDate: string;
  targetTime?: string;
  targetDateDisplay?: string;
  targetTimeDisplay?: string;
  coords: Coords;
  station?: string;
  temp?: number;
  feelsLike?: number;
  dewPoint?: number;
  tempHigh?: number;
  tempLow?: number;
  conditions: string;
  icon: string;
  iconUrl: string;
  humidity?: string;
  rain?: number;
  rainDay?: number;
  rainNight?: number;
  snow?: number;
  snowDay?: number;
  snowNight?: number;
  windSpeed: number;
  windDirection: string;

}

import {Coords} from "./coords.model";
import {Country} from "./country.model";

export class Place  {
  country?: string;
  countryCode?: string;
  countryInfo?: Country;
  state?: string;
  stateCode?: string;
  locality?: string;
  flagUrl?: string;
  countryPopulation?: number;
  localityPopulation?: number;
  coords: Coords

}

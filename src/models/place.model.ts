import {Coords} from "./coords.model";

export class Place  {
  country?: string;
  countryCode?: string;
  state?: string;
  stateCode?: string;
  locality?: string;
  flagUrl?: string;
  countryPopulation?: number;
  localityPopulation?: number;
  coords: Coords

}

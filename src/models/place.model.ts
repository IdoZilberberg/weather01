import {Coords} from "./coords.model";

export class Place  {
  country?: string;
  countryCode?: string;
  locality?: string;
  flagUrl?: string;
  countryPopulation?: number;
  cityPopulation?: number;
  coords: Coords

}

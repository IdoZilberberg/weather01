import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Place} from "../../models/place.model";
import {CountriesService} from "../../services/countries.service";
import {Country} from "../../models/country.model";

@Component({
  selector: 'w-place',
  templateUrl: 'place.html'
})
export class PlaceComponent implements OnChanges {
  @Input() place: Place;

  country: Country = <Country>{};

  constructor(private countriesService: CountriesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('current place changes: ', changes);

    if(changes.place && changes.place.currentValue) {
      if(changes.place.previousValue && changes.place.previousValue.countryCode === changes.place.currentValue.countryCode) {
        return;
      }

      this.countriesService.getCountryInfo(changes.place.currentValue.countryCode)
      .subscribe(
        country => {
          this.country = country;
        },
        error => {
          console.log('Error', error.message);
        }

      );


    }

  }

}

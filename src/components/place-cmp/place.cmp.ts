import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {Place} from "../../models/place.model";
import {Country} from "../../models/country.model";

@Component({
  selector: 'w-place',
  templateUrl: 'place.html'
})
export class PlaceComponent implements OnChanges {
  @Input() place: Place;
  @Output() flagClicked = new EventEmitter<void>();

  country: Country = <Country>{};

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('current place changes: ', changes);

    // if(changes.place && changes.place.currentValue) {
    //   if(changes.place.previousValue && changes.place.previousValue.countryCode === changes.place.currentValue.countryCode) {
    //     return;
    //   }
    // }
    //
  }

  onClickFlag() {

    this.flagClicked.emit();


  }

}

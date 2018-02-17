import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {CurrentConditions} from "../../models/current-conditions.model";

@Component({
  selector: 'w-current-conditions',
  templateUrl: 'current-conditions.html'
})
export class CurrentConditionsComponent implements OnChanges {

  @Input() currentConditions: CurrentConditions;
  @Output() onClickTemp = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log('current cond changes: ', changes);
  }

  ionViewWillEnter() {
    console.log('current conditions: ', this.currentConditions);
  }

  clickTemp() {
    console.log('clickTemp');
    this.onClickTemp.emit();
  }

}

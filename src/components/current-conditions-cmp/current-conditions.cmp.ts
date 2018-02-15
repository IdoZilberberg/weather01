import {Component, Input} from "@angular/core";
import {CurrentConditions} from "../../models/current-conditions.model";

@Component({
  selector: 'w-current-conditions',
  templateUrl: 'current-conditions.html'
})
export class CurrentConditionsComponent {

  @Input() currentConditions: CurrentConditions;

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { KeyValue } from '@angular/common';
import { WebsocketService } from 'src/app/configuration/WebsocketService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-io-status',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './io-status.component.html',
  styleUrls: ['./io-status.component.scss']
})
export class IoStatusComponent  {

  columnWiseIndicators: any[] = [];
  
indicators={
  "START_PB": true,
  "STOP_PB": false,
  "HOLD_PB": true,
  "RESET_PB": false,
  "EMERGENCY_STOP": true,
  "NEST_A_SIDE_START_PB": false,
  "NEST_B_SIDE_START_PB": true,
  "NEXT_A&B_AUXILIARY_START_PB": false,
  "SPARE_1010": true,
  "NEST_A_SIDE_CURTAIN_1011": false,
  "NEST_A_SIDE_CURTAIN_1012": true,
  "SPARE_1013": true,
  "SPARE_1014": false,
  "SPARE_1015": true,
  "SPARE_1016": false,
  "SPARE_1017": true,
  "NEST_A_FIXTURE_1_CLAMP_CYL_FWD_RS": false,
  "NEST_A_FIXTURE_1_CLAMP_CYL_REV_RS": true,
  "NEST_A_FIXTURE_2_CLAMP_CYL_FWD_RS": true,
  "NEST_A_FIXTURE_2_CLAMP_CYL_REV_RS": false,
  "NEST_A_FIXTURE_2_CLAMP_CYL1_FWD_RS": true,
  "SPARE_1025": false,
  "SPARE_1026": true,
  "SPARE_1027": false,
  "SPARE_1030": true,
  "SPARE_1031": false,
  "SPARE_1032": true,
  "SPARE_1033": false,
  "SPARE_1034": true,
  "SPARE_1035": false,
  "SPARE_1036": true,
  "SPARE_1037": false,
  "NEST_A_VACUUM_GENERATOR_FB": true,
  "NEST_B_VACUUM_GENERATOR_FB": false,
  "NEST_A_FIXTURE_1_PART_PRESENCE_PRX_1": true,
  "NEST_A_FIXTURE_1_PART_PRESENCE_PRX_2": false,
  "NEST_A_FIXTURE_2_PART_PRESENCE_PRX_1": true,
  "NEST_A_FIXTURE_2_PART_PRESENCE_PRX_2": false,
  "NEST_B_FIXTURE_1_PART_PRESENCE_PRX_1": true,
  "NEST_B_FIXTURE_1_PART_PRESENCE_PRX_2": false,
  "NEST_B_FIXTURE_2_PART_PRESENCE_PRX_1": true,
  "NEST_B_FIXTURE_2_PART_PRESENCE_PRX_2": false,
  "SAFETY_DOOR_1": true,
  "SAFETY_DOOR_2": false,
  "SAFETY_DOOR_3": true,
  "SAFETY_DOOR_4": false,
  "AIR_PRESSURE_SWITCH": true,
  "SPARE_1057": false,
  "CONTROL_ON": true,
  "START_LAMP": false,
  "HOLD_PB_LAMP": true,
  "RESET_PB_LAMP": false,
  "EMERGENCY_PB_LAMP": true,
  "FRL_SOL": false,
  "SPARE_2006": true,
  "TOWER_LAMP_RED": false,
  "TOWER_LAMP_YELLOW": true,
  "TOWER_LAMP_GREEN": false,
  "TOWER_LAMP_BUZZER": true,
  "SPARE_2013": false,
  "SPARE_2014": true,
  "SPARE_2015": false,
  "SPARE_2016": true,
  "SPARE_2017": false,
  "NEST_A_PART_1_OK_LAMP": true,
  "NEST_A_PART_1_NOK_LAMP": false,
  "NEST_A_PART_2_OK_LAMP": true,
  "NEST_A_PART_2_NOK_LAMP": false,
  "NEST_B_PART_1_OK_LAMP": true,
  "NEST_B_PART_1_NOK_LAMP": false,
  "NEST_B_PART_2_OK_LAMP": true,
  "NEST_B_PART_2_NOK_LAMP": false,
  "NEST_A_FIXTURE_1_CLAMP_CYL_FWD": true,
  "NEST_A_FIXTURE_1_CLAMP_CYL_REV": false,
  "NEST_A_FIXTURE_2_CLAMP_CYL_FWD": true,
  "NEST_A_FIXTURE_2_CLAMP_CYL_REV": false,
  "NEST_B_FIXTURE_1_CLAMP_CYL_FWD": true,
  "NEST_B_FIXTURE_1_CLAMP_CYL_REV": false,
  "NEST_B_FIXTURE_2_CLAMP_CYL_FWD": true,
  "NEST_B_FIXTURE_2_CLAMP_CYL_REV": false,
  "NEST_A_FIXTURE_1_VACUUM_GENERATOR": true,
  "NEST_A_FIXTURE_1_VACUUM_SOL": false,
  "NEST_B_FIXTURE_1_VACUUM_GENERATOR": true,
  "NEST_B_FIXTURE_1_VACUUM_SOL": false,
  "SPARE_2044": true,
  "SPARE_2045": false,
  "SPARE_2046": true,
  "SPARE_2047": false,
  "SPARE_2050": true,
  "SPARE_2051": false,
  "SPARE_2052": true,
  "SPARE_2053": false,
  "SPARE_2054": true,
  "SPARE_2055": false,
  "SPARE_2056": true,
  "SPARE_2057": false
}


 splitKey(key: string): { code: string, tagName: string } {
    const firstUnderscore = key.indexOf('_');
    return {
      code: key.substring(0, firstUnderscore),
      tagName: key.substring(firstUnderscore + 1)
    };
  }

  // Preserve original object order
  originalOrder = (a: KeyValue<string, boolean>, b: KeyValue<string, boolean>): number => 0;

   getCardClasses(status: boolean): string {
    return status === true ? 'bg-success text-white' : 'bg-light text-dark';
  }

}
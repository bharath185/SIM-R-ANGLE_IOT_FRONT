import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { KeyValue } from '@angular/common';
import { WebsocketService } from 'src/app/configuration/WebsocketService';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-io-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './io-status.component.html',
  styleUrls: ['./io-status.component.scss']
})
export class IoStatusComponent  {

  columnWiseIndicators: any[] = [];
  
indicators={
  "X0_START_PB": false,
  "X1_STOP_PB": false,
  "X2_HOLD_PB": false,
  "X3_RESET_PB": false,
  "X4_EMERGENCY_STOP": false,
  "X5_NEST_A_SIDE_START_PB": false,
  "X6_NEST_B_SIDE_START_PB": false,
  "X7_NEXT_A&B_AUX_START_PB": false,
  "X10_SPARE": false,
  "X13_SPARE": false,
  "X14_SPARE": false,
  "X15_SPARE": false,
  "X16_SPARE": false,
  "X17_SPARE": false,
  "X25_SPARE": false,
  "X26_SPARE": false,
  "X27_SPARE": false,
  "X30_SPARE": false,
  "X31_SPARE": false,
  "X32_SPARE": false,
  "X33_SPARE": false,
  "X34_SPARE": false,
  "X35_SPARE": false,
  "X36_SPARE": false,
  "X37_SPARE": false,
  "X52_SAFETY_DOOR_1": false,
  "X53_SAFETY_DOOR_2": false,
  "X54_SAFETY_DOOR_3": false,
  "X55_SAFETY_DOOR_4": false,
  "X56_AIR_PRESSURE_SWITCH": false,
  "X57_SPARE": false,
  
  "Y0_CONTROL_ON": false,
  "Y1_START_LAMP": false,
  "Y2_HOLD_PB_LAMP": false,
  "Y3_RESET_PB_LAMP": false,
  "Y4_EMERGENCY_PB_LAMP": false,
  "Y5_FRL_SOL": false,
  "Y6_SPARE": false,
  "Y7_TOWER_LAMP_RED": false,
  "Y10_TOWER_LAMP_YELLOW": false,
  "Y11_TOWER_LAMP_GREEN": false,
  "Y12_TOWER_LAMP_BUZZER": false,
  "Y13_SPARE": false,
  "Y14_SPARE": false,
  "Y15_SPARE": false,
  "Y16_SPARE": false,
  "Y17_SPARE": false,
  "Y20_NEST_A_PART_1_OK_LAMP": false,
  "Y21_NEST_A_PART_1_NOK_LAMP": false,
  "Y22_NEST_A_PART_2_OK_LAMP": false,
  "Y23_NEST_A_PART_2_NOK_LAMP": false,
  "Y24_NEST_B_PART_1_OK_LAMP": false,
  "Y25_NEST_B_PART_1_NOK_LAMP": false,
  "Y26_NEST_B_PART_2_OK_LAMP": false,
  "Y27_NEST_B_PART_2_NOK_LAMP": false,
  "Y30_NEST_A_FIXTURE_1_CLAMP_CYL_FWD": false,
  "Y31_NEST_A_FIXTURE_1_CLAMP_CYL_REV": false,
  "Y32_NEST_A_FIXTURE_2_CLAMP_CYL_FWD": true,
  "Y33_NEST_A_FIXTURE_2_CLAMP_CYL_REV": false,
  "Y34_NEST_B_FIXTURE_1_CLAMP_CYL_FWD": false,
  "Y35_NEST_B_FIXTURE_1_CLAMP_CYL_REV": false,
  "Y36_NEST_B_FIXTURE_2_CLAMP_CYL_FWD": false,
  "Y37_NEST_B_FIXTURE_2_CLAMP_CYL_REV": false,
  "Y40_NEST_A_FIXTURE_1_VACUUM_GENERATOR": false,
  "Y41_NEST_A_FIXTURE_1_VACUUM_SOL": true,
  "Y42_NEST_B_FIXTURE_1_VACUUM_GENERATOR": false,
  "Y43_NEST_B_FIXTURE_1_VACUUM_SOL": false,
  "Y44_SPARE": false,
  "Y45_SPARE": false,
  "Y46_SPARE": false,
  "Y47_SPARE": false,
  "Y50_SPARE": false,
  "Y51_SPARE": false,
  "Y52_SPARE": false,
  "Y53_SPARE": false,
  "Y54_SPARE": false,
  "Y55_SPARE": false,
  "Y56_SPARE": false,
  "Y57_SPARE": false
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

}
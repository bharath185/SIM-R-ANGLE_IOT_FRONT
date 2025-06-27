import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from 'src/app/configuration/WebsocketService';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-sensor-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sensor-status.component.html',
  styleUrls: ['./sensor-status.component.scss']
})
export class SensorStatusComponent  {
  
indicators={
  "X11_NEST_A_SIDE_CURTAIN": false,
  "X12_NEST_A_SIDE_CURTAIN": false,
  "X20_NEST_A_FIXTURE_1_CLAMP_CYL_FWD_RS": false,
  "X21_NEST_A_FIXTURE_1_CLAMP_CYL_REV_RS": false,
  "X22_NEST_A_FIXTURE_2_CLAMP_CYL_FWD_RS": false,
  "X23_NEST_A_FIXTURE_2_CLAMP_CYL_REV_RS": false,
  "X24_NEST_A_FIXTURE_2_CLAMP_CYL1_FWD_RS": false,
  "X40_NEST_A_VACUUM_GENERATOR_FB": false,
  "X41_NEST_B_VACUUM_GENERATOR_FB": false,
  "X42_NEST_A_FIXTURE_1_PART_PRESENCE_PRX_1": false,
  "X43_NEST_A_FIXTURE_1_PART_PRESENCE_PRX_2": false,
  "X44_NEST_A_FIXTURE_2_PART_PRESENCE_PRX_1": false,
  "X45_NEST_A_FIXTURE_2_PART_PRESENCE_PRX_2": false,
  "X46_NEST_B_FIXTURE_1_PART_PRESENCE_PRX_1": false,
  "X47_NEST_B_FIXTURE_1_PART_PRESENCE_PRX_2": false,
  "X50_NEST_B_FIXTURE_2_PART_PRESENCE_PRX_1": false,
  "X51_NEST_B_FIXTURE_2_PART_PRESENCE_PRX_2": false
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
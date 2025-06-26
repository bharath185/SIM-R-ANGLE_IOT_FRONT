import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from 'src/app/configuration/WebsocketService';

@Component({
  selector: 'app-manual-mode',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './manual-mode.component.html',
  styleUrl: './manual-mode.component.scss'
})
export class ManualModeComponent  implements OnInit, OnDestroy{

  connectionId="manual-status";
  isConnected: boolean= false;

constructor(private wsService:WebsocketService){}


  ngOnInit(): void {
    this.wsService.initConnection(this.connectionId);
    this.wsService.getMessages(this.connectionId).subscribe((msg: string) => {
      try {
        this.data = JSON.parse(msg);
      } catch (e) {
        console.error('Error parsing message:', e);
      }
    });
  }

  data:any;
    async pushValue(address: string, value: any): Promise<void> {

      const data = {
      section: 'manual',
      tag_name: address,
      value: value
    };
    const message = JSON.stringify(data);

    console.log("Sending message:", message);

    try {
      if (!this.isConnected) {
        this.wsService.initConnection('plc-write');
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      this.wsService.sendMessage(this.connectionId,message).subscribe({
        next: (response: any) => {
          console.log("WebSocket Response:", response);
        },
        error: (error: any) => {
          console.error("WebSocket Error:", error);

        }
      });
    } catch (error) {
      console.error("Command failed:", error);
    }
  }


targetPoslc: number = 0;
targetSpeedlc: number = 0;
targetPosg2f: number = 0;
targetSpeedg2f: number = 0;
targetPosg1f: number = 0;
targetSpeedg1f: number = 0;
targetPosg2x: number = 0;
targetSpeedg2x: number = 0;
targetPosuc: number = 0;
targetSpeeduc: number = 0;
targetPosg2y: number = 0;
targetSpeedg2y: number = 0;
targetPosg1y: number = 0;
targetSpeedg1y: number = 0;

setJogValues(register: string, address1:any, pos: number,  address2:any, speed: number) {
  this.pushValue(address1, pos);
  this.pushValue(address2, speed);
  this.pushValue(register, true);
  console.log("passing value to plc",address1, pos,address2, speed,register, 1)
  
}

  ngOnDestroy(): void {
    this.wsService.closeConnection(this.connectionId);
    this.wsService.ngOnDestroy();
  }

}

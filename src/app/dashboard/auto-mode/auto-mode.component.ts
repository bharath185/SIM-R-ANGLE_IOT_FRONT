import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/configuration/WebsocketService';

@Component({
  selector: 'app-auto-mode',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [WebsocketService],
  templateUrl: './auto-mode.component.html',
  styleUrls: ['./auto-mode.component.scss']
})
export class AutoModeComponent implements OnInit, OnDestroy {
  // Status variables
  alarmMessage = 'No alarms detected';
  okCount = 0;
  ngCount = 0;
  alaram = 0;
  machineMessage = 0;
  
  // Current barcode data - initialized as empty
  currentBarcodeData: any = {
    barcode1: '',
    barcode2: '',
    barcode3: '',
    barcode4: '',
    nap1: { radius1: '', radius2: '', fai1: '', fai2: '', fai3: '', fai4: '', overall_result: '' },
    nap2: { radius1: '', radius2: '', fai1: '', fai2: '', fai3: '', fai4: '', overall_result: '' },
    nbp1: { radius1: '', radius2: '', fai1: '', fai2: '', fai3: '', fai4: '', overall_result: '' },
    nbp2: { radius1: '', radius2: '', fai1: '', fai2: '', fai3: '', fai4: '', overall_result: '' }
  };

  private subscription!: Subscription;
  private alarmSubscription!: Subscription;
  connectionId = "machine-status";
  connectionId1 = "auto-status";

  constructor(
    private readonly router: Router, 
    private wsService: WebsocketService
  ) { }

  ngOnInit() {
    this.initWebSocketConnections();
  }

  private initWebSocketConnections() {
    this.wsService.initConnection(this.connectionId);
    this.subscription = this.wsService.getMessages(this.connectionId).subscribe({
      next: (msg: string) => this.handleMachineStatusMessage(msg),
      error: (err) => console.error('Machine-status WebSocket error:', err)
    });

    this.wsService.initConnection(this.connectionId1);
    this.alarmSubscription = this.wsService.getMessages(this.connectionId1).subscribe({
      next: (msg: any) => this.handleAutoStatusMessage(msg),
      error: (err) => console.error('Auto-status WebSocket error:', err)
    });
  }

  private handleMachineStatusMessage(msg: string) {
    try {
      const data = JSON.parse(msg);
      this.currentBarcodeData = {
        barcode1: data.barcodes?.barcode1 || '',
        barcode2: data.barcodes?.barcode2 || '',
        barcode3: data.barcodes?.barcode3 || '',
        barcode4: data.barcodes?.barcode4 || '',
        nap1: data.nap1 || { radius1: '', radius2: '', fai1: '', fai2: '', fai3: '', fai4: '', overall_result: '' },
        nap2: data.nap2 || { radius1: '', radius2: '', fai1: '', fai2: '', fai3: '', fai4: '', overall_result: '' },
        nbp1: data.nbp1 || { radius1: '', radius2: '', fai1: '', fai2: '', fai3: '', fai4: '', overall_result: '' },
        nbp2: data.nbp2 || { radius1: '', radius2: '', fai1: '', fai2: '', fai3: '', fai4: '', overall_result: '' }
      };
      this.updateCounts();
    } catch (error) {
      console.error('Error processing machine status message:', error);
    }
  }

  private updateCounts() {
    this.okCount = 0;
    this.ngCount = 0;
    
    ['nap1', 'nap2', 'nbp1', 'nbp2'].forEach(station => {
      const result = this.currentBarcodeData[station]?.overall_result;
      if (result === 1) {
        this.okCount++;
      } else if (result === 0) {
        this.ngCount++;
      }
    });
  }

  private handleAutoStatusMessage(msg: any) {
    try {
      const data = typeof msg === 'string' ? JSON.parse(msg.trim()) : msg;
      this.updateStatusData(data);
    } catch (error) {
      console.error('Error processing auto status message:', error);
    }
  }

  private updateStatusData(data: any) {
    this.okCount = data.OK ?? this.okCount;
    this.ngCount = data?.NOK ?? this.ngCount;
    this.alaram = data?.ALARM ?? this.alaram;
    this.machineMessage = data?.RUNNING_MSG ?? this.machineMessage;
    
    this.alarmMessage = this.alaram > 0 
      ? `Alarm detected (Code: ${this.alaram})` 
      : 'No alarms detected';
  }

  getResultClass(result: number): string {
    return result === 1 ? 'table-success' : result === 0 ? 'table-danger' : '';
  }

  getResultText(result: number): string {
    return result === 1 ? 'OK' : result === 0 ? 'NOK' : '';
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.alarmSubscription?.unsubscribe();
    this.wsService.ngOnDestroy();
  }

  goBackHome() {
    this.router.navigate(['/']);
  }
}
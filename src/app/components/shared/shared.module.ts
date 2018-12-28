import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralChartComponent } from './general-chart/general-chart.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [GeneralChartComponent, ModalComponent],
  exports: [GeneralChartComponent, ModalComponent],
  imports: [CommonModule, ChartsModule, FormsModule, IonicModule],
})
export class SharedModule {}

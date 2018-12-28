import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TicketsPage } from './tickets.page';

import { TicketsDetailComponent } from './tickets-detail/tickets-detail.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TicketsPage,
  },
  {
    path: 'details',
    component: TicketsDetailComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TicketsPage, TicketsDetailComponent],
})
export class TicketsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TicketsPage } from './tickets.page';
import { TicketsNewEditComponent } from './tickets-new-edit/tickets-new-edit.component';

const routes: Routes = [
  {
    path: '',
    component: TicketsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TicketsPage, TicketsNewEditComponent]
})
export class TicketsPageModule {}

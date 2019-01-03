import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StadisticsPage } from './stadistics.page';
import { Tab1Component } from './tab1/tab1.component';
import { Tab2Component } from './tab2/tab2.component';
import { Tab3Component } from './tab3/tab3.component';
import { SharedModule } from '../shared/shared.module';
import { ModalComponent } from '../shared/modal/modal.component';
import { DirectivesModule } from '../directives/directives.module';

const routes: Routes = [
  {
    path: '',
    component: StadisticsPage,
    children: [
      {
        path: '',
        redirectTo: '/stadistics/tab1',
        pathMatch: 'full',
      },
      {
        path: 'tab1',
        component: Tab1Component,
      },
      {
        path: 'tab2',
        component: Tab2Component,
      },
      {
        path: 'tab3',
        component: Tab3Component,
      },
    ],
  },
  /* {
    path: 'tab1',
    component: Tab1Component,
  },
  {
    path: 'tab2',
    component: Tab2Component,
  },
  {
    path: 'tab3',
    component: Tab3Component,
  },*/
];

@NgModule({
  entryComponents: [ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DirectivesModule,
    RouterModule.forChild(routes),
  ],
  declarations: [StadisticsPage, Tab1Component, Tab2Component, Tab3Component],
})
export class StadisticsPageModule {}

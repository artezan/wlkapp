import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tickets',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: './components/products/products.module#ProductsPageModule',
  },
  {
    path: 'tickets',
    loadChildren: './components/tickets/tickets.module#TicketsPageModule',
  },  { path: 'stadistics', loadChildren: './components/stadistics/stadistics.module#StadisticsPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

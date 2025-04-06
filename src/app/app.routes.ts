import { Routes } from '@angular/router';
import {FormItemComponent} from './form-item/form-item.component';

export const routes: Routes = [
  {path: 'calcular', component: FormItemComponent},
  { path: '', redirectTo: 'calcular', pathMatch: 'full' }
];

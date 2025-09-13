import { Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { Detail } from './pages/detail/detail';
import { Edit } from './pages/edit/edit';
import { Add } from './pages/add/add';

export const routes: Routes = [
    { path: '', component: Main }, 
    { path: 'detail/:id', component: Detail }, 
    { path: 'add', component: Add }, 
    { path: 'edit/:id', component: Edit }, 
];

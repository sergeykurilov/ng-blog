import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import {AdminFooterBlockModule} from '../../../../view/admin-footer-block/admin-footer-block.module';
import {AdminHeaderBlockModule} from '../../../../view/admin-header-block/admin-header-block.module';
import {AdminNavBlockModule} from '../../../../view/admin-nav-block/admin-nav-block.module';


@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminPageComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'dashboard'
          },
          {
            path: 'dashboard',
            loadChildren: () => import('./routing/dashboard/dashboard.module')
              .then(m => m.DashboardModule),

          },
          {
            path: 'grid/:namespace/:entity',
            loadChildren: () => import('./routing/grid/grid.module')
              .then(m => m.GridModule),

          },
          {
            path: 'form/:namespace/:entity',
            loadChildren: () => import('./routing/form/form.module')
              .then(m => m.FormModule),

          },
        ]
      }
    ]),
    AdminFooterBlockModule,
    AdminHeaderBlockModule,
    AdminNavBlockModule,
  ]
})
export class AdminModule { }

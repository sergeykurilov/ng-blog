import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import {AdminFooterBlockModule} from '../../../../view/admin-footer-block/admin-footer-block.module';
import {AdminHeaderBlockModule} from '../../../../view/admin-header-block/admin-header-block.module';


@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: AdminPageComponent,
        loadChildren: () => import('./routing/dashboard/dashboard.module')
          .then(m => m.DashboardModule),

      },
    ]),
    AdminFooterBlockModule,
    AdminHeaderBlockModule
  ]
})
export class AdminModule { }

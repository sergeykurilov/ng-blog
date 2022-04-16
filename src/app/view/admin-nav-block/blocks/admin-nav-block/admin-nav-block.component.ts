import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {NestedTreeNode} from '../../../../store/admin-menu-store/store/admin-auth.reducer';
import {Store, select} from '@ngrx/store';
import {initMenu} from '../../../../store/admin-menu-store/store/admin-menu.actions';
import {getMenuData} from '../../../../store/admin-menu-store/store/admin-auth.selectors';


@Component({
  selector: 'app-admin-nav-block',
  templateUrl: './admin-nav-block.component.html',
  styleUrls: ['./admin-nav-block.component.scss']
})
export class AdminNavBlockComponent implements OnInit {
  constructor(private store$: Store) { }

  data$: Observable<NestedTreeNode[]> = this.store$.pipe(select(getMenuData));

  ngOnInit(): void {
    this.store$.dispatch(initMenu());
  }
}

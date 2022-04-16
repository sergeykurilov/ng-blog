import {createAction, props} from '@ngrx/store';
import { NestedTreeNode } from './admin-auth.reducer';

export const initMenu = createAction(
  '[Admin Menu] Init'
);


export const initMenuSuccess = createAction(
  '[Admin Menu] Init Success',
  props<{data: NestedTreeNode[]}>()
);

export const initMenuFailure = createAction(
  '[Admin Menu] Init Failure',
  props<{serverError: string}>()
);

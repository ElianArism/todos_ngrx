import { createAction, props } from '@ngrx/store';
import { filterType } from '../filter.type';

export const setFilter = createAction(
  '[Filter] Set filter',
  props<{ filterType: filterType }>()
);

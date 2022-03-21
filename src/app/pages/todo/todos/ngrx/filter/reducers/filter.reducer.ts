import { createReducer, on, Action } from '@ngrx/store';
import { filterType } from '../filter.type';
import { setFilter } from '../actions/filter.actions';

const initialState: filterType = 'all';

const _filterReducer = createReducer<filterType, Action>(
  initialState,
  on(setFilter, (state, { filterType }) => filterType)
);

export function filterReducer(oldState: any, action: Action) {
  return _filterReducer(oldState, action);
}

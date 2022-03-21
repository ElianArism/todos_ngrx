import { ActionReducerMap } from '@ngrx/store';
import { Todo } from './pages/todo/todos/model/todo.model';
import { todosReducer } from './pages/todo/todos/ngrx/todos/reducers/todo.reducer';
import { filterType } from './pages/todo/todos/ngrx/filter/filter.type';
import { filterReducer } from './pages/todo/todos/ngrx/filter/reducers/filter.reducer';

/**
 * Global Store Structure
 */
export interface AppState {
  todos: Todo[];
  filter: filterType;
}

// Group of reducers
export const appReducers: ActionReducerMap<AppState> = {
  todos: todosReducer,
  filter: filterReducer,
};

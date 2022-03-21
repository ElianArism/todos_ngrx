import { Action, createReducer, on } from '@ngrx/store';
import {
  create,
  toggleCompleted,
  edit,
  remove,
  markAsCompleted,
} from '../actions/todo.actions';
import { Todo } from '../../../model/todo.model';
import { removeCompleted } from '../actions/todo.actions';

/**
 * Todos initial state
 */
export const initialState: Todo[] = [
  new Todo('Task 1'),
  new Todo('Task 2'),
  new Todo('Task 3'),
];

/**
 * Reduce structure
 * Only this function can create new states
 *
 * 1st param data structure initialized => initialState
 * 2nd...inf params => reducer triggers
 */
const _todosReducer = createReducer(
  initialState,
  on(create, (state, action) => {
    return [...state, new Todo(action.text)];
  }),
  on(toggleCompleted, (state, action) => {
    return state.map((todo) => {
      if (todo.id === action.id) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      } else {
        return todo;
      }
    });
  }),
  on(edit, (state, { id, text }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      } else {
        return todo;
      }
    });
  }),
  on(remove, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(removeCompleted, (state) => state.filter(({ complete }) => !complete)),
  on(markAsCompleted, (state, { tasksStatus }) =>
    state.map((todo) => ({ ...todo, complete: tasksStatus }))
  )
);

/**
 * reducer getter
 * @param oldState: oldState
 * @param action: action that describes changes to do in the oldState
 * @returns _todosReducer => newState
 */
export function todosReducer(oldState: Todo[] | undefined, action: Action) {
  return _todosReducer(oldState, action);
}

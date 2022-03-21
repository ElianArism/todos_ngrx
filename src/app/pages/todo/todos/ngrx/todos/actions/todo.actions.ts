import { createAction, props } from '@ngrx/store';

/**
 * Actions
 * 1st param type = description
 * 2st param payload object
 */

export const create = createAction(
  '[TODO] Create todo',
  props<{ text: string }>()
);

export const toggleCompleted = createAction(
  '[TODO] Toggle todo.complete status',
  props<{ id: number }>()
);

export const edit = createAction(
  '[TODO] Edit todo',
  props<{ id: number; text: string }>()
);

export const remove = createAction(
  '[TODO] Remove todo',
  props<{ id: number }>()
);

export const removeCompleted = createAction('[TODO] Remove completed todos');

export const markAsCompleted = createAction(
  '[TODO] Mark all task as completed',
  props<{ tasksStatus: boolean }>()
);

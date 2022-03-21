import { Component, OnInit } from '@angular/core';
import * as actions from './todos/ngrx/todos/actions/todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  toggleAllState: boolean = false;
  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {}

  markAsCompleted(): void {
    this.toggleAllState = !this.toggleAllState;
    this.store.dispatch(
      actions.markAsCompleted({ tasksStatus: this.toggleAllState })
    );
  }
}

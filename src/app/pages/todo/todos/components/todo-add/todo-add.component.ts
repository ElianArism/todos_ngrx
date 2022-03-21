import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.reducer';
import * as actions from '../../ngrx/todos/actions/todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent implements OnInit {
  todoInput!: FormControl;

  constructor(
    /**
     * Store injection (is like a service)
     */
    private store: Store<AppState>
  ) {
    this.todoInput = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {}

  addTodo(): void {
    if (this.todoInput.invalid || !this.todoInput.value.trim().length) return;
    this.store.dispatch(actions.create({ text: this.todoInput.value.trim() }));
    this.todoInput.setValue('');
  }
}

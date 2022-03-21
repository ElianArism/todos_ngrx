import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../../model/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.reducer';
import { Subscription } from 'rxjs';
import { filterType } from '../../ngrx/filter/filter.type';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos!: Todo[];
  subs!: Subscription;
  currentFilter!: filterType;

  constructor(
    /**
     * Store injection (like a service)
     */
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    /**
     * Store subscription
     */
    this.subs = this.store.subscribe((state) => {
      this.todos = state.todos;
      this.currentFilter = state.filter;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe(); // unsubscribe observable
  }
}

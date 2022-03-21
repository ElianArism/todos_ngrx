import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { filterType } from '../../ngrx/filter/filter.type';
import { Subscription } from 'rxjs';
import * as filterActions from '../../ngrx/filter/actions/filter.actions';
import * as todoActions from '../../ngrx/todos/actions/todo.actions';
@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
})
export class TodoFooterComponent implements OnInit, OnDestroy {
  subs!: Subscription;
  currentFilter!: filterType;
  filters: filterType[] = ['all', 'active', 'completed'];
  pendingTodos: number = 0;
  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.subs = this.store.subscribe((state) => {
      this.currentFilter = state.filter;
      this.pendingTodos = state.todos.filter((todo) => !todo.complete).length;
    });
  }

  changeFilter(newFilter: filterType): void {
    this.store.dispatch(filterActions.setFilter({ filterType: newFilter }));
  }

  clearCompleted(): void {
    this.store.dispatch(todoActions.removeCompleted());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

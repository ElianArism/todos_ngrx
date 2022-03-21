import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Todo } from '../../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppState } from '../../../../../app.reducer';
import { Store } from '@ngrx/store';
import * as actions from '../../ngrx/todos/actions/todo.actions';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit, OnDestroy {
  private subs!: Subscription;
  @Input() todo!: Todo;
  @ViewChild('editInputRef') editInputRef!: ElementRef<HTMLInputElement>;
  isCompletedCheckbox!: FormControl;
  editInput!: FormControl;
  editMode: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isCompletedCheckbox = new FormControl(this.todo.complete);
    this.editInput = new FormControl(this.todo.text, Validators.required);

    this.subs = this.isCompletedCheckbox.valueChanges.subscribe((value) => {
      console.log('Value: ', value);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  editTask(): void {
    this.editMode = true;
    this.editInput.setValue(this.todo.text);
    setTimeout(() => {
      this.editInputRef.nativeElement.select();
    }, 1);
  }

  finishEditing(): void {
    this.editMode = false;

    if (
      this.editInput.invalid ||
      !this.editInput.value.trim().length ||
      this.editInput.value === this.todo.text
    ) {
      return;
    }

    this.store.dispatch(
      actions.edit({ id: this.todo.id, text: this.editInput.value.trim() })
    );
  }

  toggleCopletedTask(): void {
    this.store.dispatch(actions.toggleCompleted({ id: this.todo.id }));
  }

  deleteTodo(): void {
    this.store.dispatch(actions.remove({ id: this.todo.id }));
  }
}

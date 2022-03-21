import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../pages/todo/todos/model/todo.model';
import { filterType } from '../pages/todo/todos/ngrx/filter/filter.type';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Todo[], filter: filterType): Todo[] {
    const filterCases = {
      completed: () => value.filter(({ complete }) => complete),
      active: () => value.filter(({ complete }) => !complete),
    };

    return filterCases[filter as keyof typeof filterCases]
      ? filterCases[filter as keyof typeof filterCases]()
      : value;
  }
}

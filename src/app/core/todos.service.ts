import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, startWith, Subject, switchMap} from 'rxjs';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  importance: number;
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  #http = inject(HttpClient);
  #refresh = new Subject<void>();

  getTodos() {
    return this.#refresh.pipe(
      startWith('initial fetch'),
      switchMap(() =>
        this.#http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos').pipe(
          map(todos => todos.map(todo => ({
                ...todo,
                importance: this.#randomIntFromInterval(1, 10)
              })
            )
              .slice(0, 10)
              .sort((a, b) => b.importance - a.importance)
          ))
      )
    );
  }

  refresh(){
    this.#refresh.next();
  }

  #randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}

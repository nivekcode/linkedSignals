import {ChangeDetectionStrategy, Component, inject, linkedSignal} from '@angular/core';
import {Todo, TodosService} from '../../core/todos.service';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'todo-list',
  template: `
    <div class="header">
      <h1>Todo list</h1>
      <button class="refresh-btn" (click)="refresh()">
        <span class="material-symbols-outlined">refresh</span>
      </button>
    </div>

    @for (todo of todos(); track $index) {
      <div class="card todo-item">
        @if (todo.completed) {
          <span class="done material-symbols-outlined">
check_circle
</span>
        } @else {
          <span class="open material-symbols-outlined">
error
</span>
        }

        <div class="todo-content">
          <span class="title">
          {{ todo.title }}
            </span>
          <span>
          {{ todo.importance }}
            </span>
          <div class="voter">
            <button (click)="upvote(todo)">
              <span class="material-symbols-outlined">
keyboard_arrow_up
</span>
            </button>
            <button (click)="downVote(todo)">
              <span class="material-symbols-outlined">
keyboard_arrow_down
</span>
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: `

    .refresh-btn {
      background: transparent;
      border: none;
      cursor: pointer;
    }

    .todo-item {
      margin-top: 12px;
      display: flex;
      align-items: center;
    }

    .voter {
      margin-left: 12px;
      display: flex;
      flex-direction: column;

      button {
        border: none;
        background: transparent;
        cursor: pointer;
      }
    }

    .title {
      flex: 1;
    }

    .done {
      color: green;
      padding-right: 8px;
    }

    .open {
      color: red;
      padding-right: 8px;
    }

    .todo-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    input {
      height: 24px;
      width: 24px;
      cursor: pointer;
    }

    fieldset {
      display: flex;
      align-items: center;
      gap: 12px;
      border: none;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  #todosService = inject(TodosService);

  todos = linkedSignal<Todo[]>(toSignal(this.#todosService.getTodos(), {
      initialValue: []
    })
  );

  upvote(todo: Todo) {
    this.todos.update(todos => {
      const todoToUpvote = todos.find(t => t.id === todo.id);
      const rest = todos.filter(t => t.id !== todo.id);
      if (todoToUpvote) {
        todoToUpvote.importance++;
        return [...rest, todoToUpvote].sort(
          (a, b) => b.importance - a.importance
        );
      }
      return todos;
    });
  }

  downVote(todo: Todo) {
    this.todos.update(todos => {
      const todoToUpvote = todos.find(t => t.id === todo.id);
      const rest = todos.filter(t => t.id !== todo.id);
      if (todoToUpvote) {
        todoToUpvote.importance--;
        return [todoToUpvote, ...rest].sort(
          (a, b) => b.importance - a.importance
        );
      }
      return todos;
    });
  }

  refresh(){
    this.#todosService.refresh();
  }
}

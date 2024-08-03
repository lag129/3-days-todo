import { AchivementItem } from '../AchivementItem.js';
import { TodoStorage } from '../TodoStorage.js';

export default [
    new AchivementItem({
        id: "complete-count-1",
        title: "初めて完了した",
        description: "ToDoを1つ完了させる",
        checker: () => {
            const loaded = new TodoStorage().loadTodoItems();
            return loaded.filter((item) => item.isCompleted).length >= 1;
        }
    }),
    new AchivementItem({
        id: "complete-count-3",
        title: "3つ完了した",
        description: "ToDoを3つ完了させる",
        checker: () => {
            const loaded = new TodoStorage().loadTodoItems();
            return loaded.filter((item) => item.isCompleted).length >= 3;
        }
    }),
    new AchivementItem({
        id: "complete-count-5",
        title: "5つ完了した",
        description: "ToDoを5つ完了させる",
        checker: () => {
            const loaded = new TodoStorage().loadTodoItems();
            return loaded.filter((item) => item.isCompleted).length >= 5;
        }
    }),
    new AchivementItem({
        id: "complete-count-10",
        title: "10個完了した",
        description: "ToDoを10個完了させる",
        checker: () => {
            const loaded = new TodoStorage().loadTodoItems();
            return loaded.filter((item) => item.isCompleted).length >= 10;
        }
    }),
    new AchivementItem({
        id: "todo-count-1",
        title: "デビュー",
        description: "ToDoを1つ登録する",
        checker: () => {
            const loaded = new TodoStorage().loadTodoItems();
            return loaded.length >= 1;
        }
    }),
    new AchivementItem({
        id: "todo-count-3",
        title: "3つ登録した",
        description: "ToDoを3つ登録する",
        checker: () => {
            const loaded = new TodoStorage().loadTodoItems();
            return loaded.length >= 3;
        }
    }),
    new AchivementItem({
        id: "todo-count-5",
        title: "5つ登録した",
        description: "ToDoを5つ登録する",
        checker: () => {
            const loaded = new TodoStorage().loadTodoItems();
            return loaded.length >= 5;
        }
    }),
    new AchivementItem({
        id: "todo-count-10",
        title: "10個登録した",
        description: "ToDoを10個登録する",
        checker: () => {
            const loaded = new TodoStorage().loadTodoItems();
            return loaded.length >= 10;
        }
    })
]
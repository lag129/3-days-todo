import { AchivementItem } from '../AchivementItem.js';
import { TodoStorage } from '../TodoStorage.js';

export default [
    new AchivementItem({
        id: "complete-count-1",
        title: "初めて完了した",
        description: "ToDoを1つ完了させる",
        checker: (item) => {
            const loaded = new TodoStorage().loadTodoItems();
            return loaded.filter((item) => item.isCompleted).length >= 1;
        }
    }),
    new AchivementItem({
        id: "complete-count-3",
        title: "3つ完了した",
        description: "ToDoを3つ完了させる",
        checker: (item) => {
            const loaded = new TodoStorage().loadTodoItems();
            return loaded.filter((item) => item.isCompleted).length >= 3;
        }
    }),
]
import { TodoStorage } from "./TodoStorage.js";
import { TodoItem } from "./TodoItem.js";

export class TodoList {
    #items;
    #storage;

    /**
     * 
     * @param {TodoItem[]} [items = []]
     * @returns {void}
     */
    constructor(items = []) {
        this.#items = items;
        this.#storage = new TodoStorage();
    }

    /**
     * ToDoアイテムを追加
     * @param {TodoItem} item
     * @returns {void}
     */
    add(item) {
        this.#items.push(item);
        this.#storage.addTodoItem(item);
    }

    remove(id) {
        this.#items = this.#items.filter((item) => item.id !== id);
        this.#storage.removeTodoItem(id);
    }

    /**
     * ToDoアイテムを更新
     * @param {TodoItem} item
     * @returns {void}
     */
    update(item) {
        const index = this.#items.findIndex((i) => i.id === item.id);
        if (index < 0) {
            return;
        }
        this.#items[index] = item;
        this.#storage.updateTodoItem(item);
    }

    /**
     * TodoListからidに一致するToDoアイテムを取得。なければnullを返す
     * @param {string?} id
     * @returns 
     */
    find(id) {
        return this.#items.find((item) => item.id === id) ?? null;
    }
    /**
     * ToDoアイテムを取得
     * @returns {TodoItem[]}
     */
    get items() {
        return this.#items;
    }

    /**
     * <tr>要素を生成
     * @returns {HTMLElement[]}
     * @example
     * const table = document.querySelector("#js-todo-table");
     * const todoList = new TodoList();
     * const trs = todoList.generateTRElement();
     * trs.forEach((tr) => {
     *    table.appendChild(tr);
     * });
     */
    generateTRElements() {
        return this.#items.map((item) => item.generateTRElement());
    }
}
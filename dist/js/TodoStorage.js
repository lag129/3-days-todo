import { CONSTANTS } from "./Constants.js";
import { TodoItem } from "./TodoItem.js";

export class TodoStorage {
    #storage = localStorage;
    #KEY = CONSTANTS.STORAGE_KEYS.TODO_ITEMS;

    constructor() {
        if (!this.#storage.getItem(this.#KEY)) {
            this.#storage.setItem(this.#KEY, JSON.stringify([]));
        }
    }

    /**
     * ストレージからデータを取得
     * @private
     * @returns {TodoItem[]}
     */
    #loadTodoItems() {
        const itemsJSON = this.#storage.getItem(this.#KEY);
        /**
         * @type {Object} itemsObjs
         */
        const itemsObjs = JSON.parse(itemsJSON, (k,v)=> {
            if (k === "createdAt" || k === "deadlineAt") {
                return new Date(v);
            }
            return v;
        });
        return itemsObjs.map((obj) => new TodoItem(obj));
    }

    /**
     * ストレージにJSONデータを保存
     * @private
     * @param {TodoItem[]} items
     * @param {void}
     */
    #saveTodoItems(items) {
        this.#storage.setItem(this.#KEY, JSON.stringify(items));
    }

    /**
     * ストレージのデータにToDoアイテムを追加
     * @param {TodoItem} item
     * @returns {void}
     */
    addTodoItem(item) {
        const items = this.#loadTodoItems();
        items.push(item);
        this.#saveTodoItems(items);
    }

    /**
     * ストレージのデータからIDに一致するToDoアイテムを削除
     * @param {number} id
     * @returns {void}
     */
    removeTodoItem(id) {
        const items = this.#loadTodoItems();
        const newItems = items.filter((item) => item.id !== id);
        this.#saveTodoItems(newItems);
    }

    /**
     * ストレージのデータからIDに一致するToDoアイテムを更新
     * @param {TodoItem} item
     * @returns {void}
     */
    updateTodoItem(id, item) {
        const loadedItems = this.#loadTodoItems();
        const index = loadedItems.findIndex((item) => item.id === id);
        loadedItems[index] = item;
        this.#saveTodoItems(loadedItems);
    }

    /**
     * ストレージのデータを全て取得
     * @returns {TodoItem[]}
     */
    loadTodoItems() {
        return this.#loadTodoItems();
    }

}
import { CONSTANTS } from "./Constants.js";
const PERIOD_TO_DEADLINE_MSEC = CONSTANTS.PERIOD_TO_DEADLINE_MSEC;
import { TodoStorage } from "./TodoStorage.js";
import formatMillisec2HHMMSS from "./util/formatMillisec2HHMMSS.js";
/**
 * @class
 * @property {string} id
 * @property {string} title
 * @property {boolean} isCompleted
 * @property {Date} createdAt - 作成日時
 * @property {Date} deadlineAt - 締め切り日時
 */
export class TodoItem {
    #storage = new TodoStorage();

    constructor(options) {
        // デフォルト値を生成
        const now = new Date();
        const defaults = {
            id: Date.now().toString(),
            title: "TITLE",
            isCompleted: false,
            createdAt: now,
            deadlineAt: new Date(now.getTime() + PERIOD_TO_DEADLINE_MSEC)
        }
        const merged = { ...defaults, ...options };

        this.id = merged.id;
        this.title = merged.title;
        this.isCompleted = merged.isCompleted;
        this.createdAt = merged.createdAt;
        this.deadlineAt = merged.deadlineAt;
    }

    /**
     * 締め切り日時までの残り時間を取得
     * @returns {number} - 残り時間（ミリ秒
     * @example
     * const todo = new TodoItem({
     *    deadlineAt: new Date("2021-08-04T00:00+09:00")
     * });
     * console.log(todo.remainingTime); // 1000 * 60 * 60 * 24 * 3
     */
    get remainTime() {
        return this.deadlineAt.getTime() - new Date().getTime();
    }

    /**
     * <tr>要素を生成する
     */
    generateTRElement() {
        const tr = document.createElement("tr");
        tr.classList.add("todo-item");
        tr.id = this.id;
        ["isCompleted", "title", "createdAt", "remainTime"].forEach((key) => {
            if (["deadlineAt"].includes(key)) return; // 無視

            const value = this[key];
            const td = document.createElement("td");
            if (key === "isCompleted") {
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = value;
                checkbox.addEventListener("change", (event) => {
                    this.isCompleted = event.target.checked;
                    this.#storage.updateTodoItem(this.id, this);
                });
                td.appendChild(checkbox);
            } else if (key === "createdAt") {
                td.textContent = value.toLocaleString();
            } else if (key === "remainTime") {
                td.id = "js-td-remainTime";
                // hh:mm:ss形式にフォーマット
                const formatted = formatMillisec2HHMMSS(this.remainTime);
                td.textContent = formatted;
            } else {
                td.textContent = value;
            }
            // td.classList.add(key);
            tr.appendChild(td);
        });
        // 削除ボタン
        const removeTd = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.textContent = "削除";
        removeButton.addEventListener("click", () => {
            this.#storage.removeTodoItem(this.id); // ストレージから削除
            tr.remove(); // 画面から削除
        });
        removeTd.appendChild(removeButton);
        tr.appendChild(removeTd);
        return tr;
    }
}

import { CONSTANTS } from "./Constants.js";
const PERIOD_TO_DEADLINE_MSEC = CONSTANTS.PERIOD_TO_DEADLINE_MSEC;
import { TodoStorage } from "./TodoStorage.js";
import formatMillisec2HHMMSS from "./util/formatMillisec2HHMMSS.js";
/**
 * @class
 * @property {string} id
 * @property {string} title
 * @property {boolean} isCompleted
 * @property {boolean} isRemoved
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
            isRemoved: false,
            createdAt: now,
            deadlineAt: new Date(now.getTime() + PERIOD_TO_DEADLINE_MSEC)
        }
        const merged = { ...defaults, ...options };

        // プロパティを設定
        this.id = merged.id;
        this.title = merged.title;
        this.isCompleted = merged.isCompleted;
        this.isRemoved = merged.isRemoved;
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
        // ["isCompleted", "title", "remainTime"].forEach((key) => {
        //     if (["deadlineAt"].includes(key)) return; // 無視

        //     const value = this[key];
        //     const td = document.createElement("td");
        //     if (key === "isCompleted") {
        //         const checkbox = document.createElement("input");
        //         checkbox.type = "checkbox";
        //         checkbox.checked = value;
        //         checkbox.addEventListener("change", (event) => {
        //             this.isCompleted = event.target.checked;
        //             this.#storage.updateTodoItem(this.id, this);
        //         });
        //         td.appendChild(checkbox);
        //     } else if (key === "remainTime") {
        //         td.id = "js-td-remainTime";
        //         // hh:mm:ss形式にフォーマット
        //         const formatted = formatMillisec2HHMMSS(this.remainTime);
        //         td.textContent = formatted;
        //     } else {
        //         td.textContent = value;
        //     }
        //     // td.classList.add(key);

        // 各カラムを生成
        ["COMPLETION_CHECKBOX", "TITLE", "REMAIN_TIME", "EMOJI", "REMAIN_PROGRESS", "REMOVE_BUTTON"].forEach((name) => {
            const td = document.createElement("td");
            switch (name) {
                case "COMPLETION_CHECKBOX": {
                    td.classList.add("todo-item-completion");
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = this.isCompleted;
                    checkbox.addEventListener("change", (event) => {
                        this.isCompleted = event.target.checked;
                        this.#storage.updateTodoItem(this.id, this);
                        // チェックボックスの状態に応じてタイトルに取り消し線を付ける
                        const titleElement = tr.querySelector(".todo-item-title");
                        if (titleElement) {
                            titleElement.style.textDecoration = this.isCompleted ? "line-through" : "none";
                        }
                    });
                    td.appendChild(checkbox);
                }; break;

                case "TITLE": {
                    td.classList.add("todo-item-title");
                    td.textContent = this.title;
                    // 初期状態で取り消し線を付ける
                    if (this.isCompleted) {
                        td.style.textDecoration = "line-through";
                    }
                }; break;

                case "REMAIN_TIME": {
                    // TODO: index.jsのコードと重複している
                    td.classList.add("todo-item-remainTime");
                    td.id = "js-td-remainTime";
                    // hh:mm:ss形式にフォーマット
                    const formatted = formatMillisec2HHMMSS(this.remainTime);
                    td.textContent = this.isCompleted ? "完了" : this.remainTime > 0 ? formatted : "期限切れ";
                }; break;

                case "REMAIN_PROGRESS": {
                    td.classList.add("todo-item-remainProgress");
                    const progress = document.createElement("progress");
                    progress.max = PERIOD_TO_DEADLINE_MSEC;
                    progress.value = this.remainTime;
                    td.appendChild(progress);
                }; break;

                case "REMOVE_BUTTON": {
                    td.classList.add("todo-item-remove");
                    const removeButton = document.createElement("button");
                    removeButton.textContent = "🗑️";
                    removeButton.addEventListener("click", () => {
                        this.isRemoved = true; // 削除フラグを立てる
                        this.#storage.updateTodoItem(this.id, this); // ストレージの内容を更新
                        tr.remove(); // 画面から削除
                    });
                    td.appendChild(removeButton);
                }; break;

                case "EMOJI": {
                    td.classList.add("todo-item-emoji");
                    // remainTimeに応じて絵文字を変更
                    if (this.isCompleted) {
                        td.textContent = "🎉"; // 完了した場合の絵文字
                    } else if (this.remainTime > 1000 * 60 * 60 * 24) { // 1日以上
                        td.textContent = "🙂";
                    } else if (this.remainTime > 1000 * 60 * 60) { // 1時間以上
                        td.textContent = "😅";
                    } else if (this.remainTime > 0) { // 1時間未満
                        td.textContent = "😰";
                    } else { // 期限切れ
                        td.textContent = "😡";
                    }
                }; break;

                default: break;
            }
            tr.appendChild(td);
        });

        return tr;
    }
}

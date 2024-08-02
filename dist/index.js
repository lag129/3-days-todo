"use strict";
import { TodoList } from "./js/TodoList.js";
import { TodoItem } from "./js/TodoItem.js";
import { TodoStorage } from "./js/TodoStorage.js";
import formatMillisec2HHMMSS from "./js/util/formatMillisec2HHMMSS.js";
// import { CONSTANTS } from "./js/Constants";

const todoStorage = new TodoStorage();
const todoList = new TodoList(todoStorage.loadTodoItems());

const renderTodoTable = () => {
    const table = document.querySelector("#js-todo-table");
    const trs = todoList.generateTRElements();
    // TODO: 削除ボタンを追加する
    // tableの中身をクリアしてヘッダー行を追加
    table.innerHTML = `
        <tr>
            <th>完了フラグ<br>(<code>completed</code>)</th>
            <th>タイトル<br>(<code>title</code>)</th>
            <th id="remainTime">残り時間<br>(<code>remainTime</code>)</th>
            <th>プログレスバー</th>
            <th>削除ボタン</th>
        </tr>
    `;
    trs.forEach((tr) => {
        table.appendChild(tr);
    });
};

// ストレージに保存されているToDoリストを描画
window.addEventListener("load", () => {
    console.log("load: renderTodoTable()");
    renderTodoTable();
});

// フォームの送信ボタンがクリックされたときの処理
const formE = document.querySelector("#js-new-form");
formE.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputTitleE = document.querySelector("#js-new-title");
    const inputStartDateTimeE = document.querySelector("#js-new-startDateTime");
    const title = inputTitleE.value;
    // const startDateTime = inputStartDateTimeE.value;
    const item = new TodoItem({ title: title });
    todoList.add(item);
    renderTodoTable();
});

// // 開始日時の初期値を現在の日時に設定
// window.addEventListener("load", () => {
//     const now = new Date();
//     // 現在の日時をフォーマットして取得
// 	let [_, year, month, day, hour, minute] = now.toLocaleString().match(/(\d{4})\/(\d{1,2})\/(\d{1,2})\s(\d{1,2}):(\d{1,2})/);
//     month = month.padStart(2, "0");
//     day = day.padStart(2, "0");
//     hour = hour.padStart(2, "0");
//     minute = minute.padStart(2, "0");
//     const str = `${year}-${month}-${day}T${hour}:${minute}`;
//     // 開始日時の入力フィールドに設定
//     document.querySelector("#js-new-startDateTime").value = str;
// });

// 1秒ごとに残り時間を更新
setInterval(() => {
    console.debug("setInterval: update remainTime");
    todoList.items.forEach((item) => {
        const tr = document.getElementById(item.id);
        if (!tr) {
            return;
        }
        const remainTimeTD = tr.querySelector(".todo-item-remainTime");
        const formatted = formatMillisec2HHMMSS(item.remainTime);
        // 残り時間の更新
        // 完了フラグが立っている場合は「完了」、残り時間が0未満の場合は「期限切れ」と表示
        remainTimeTD.textContent = item.isCompleted ? "完了" : item.remainTime > 0 ? formatted : "期限切れ";
        // プログレスバーの更新
        const progressE = tr.querySelector(".todo-item-remainProgress").querySelector("progress");
        progressE.attributes["value"].value = item.remainTime;
    });
}, 1000);
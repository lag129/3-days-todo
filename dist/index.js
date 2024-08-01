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
<<<<<<< HEAD
    const trs = todoList.generateTRElements();
    // TODO: 削除ボタンを追加する
    // tableの中身をクリアしてヘッダー行を追加
    table.innerHTML = `
        <tr>
            <th>完了フラグ<br>(<code>completed</code>)</th>
            <th>タイトル<br>(<code>title</code>)</th>
            <th>作成日時<br>(<code>createdAt</code>)</th>
            <th id="remainTime">残り時間<br>(<code>remainTime</code>)</th>
        </tr>
    `;
    trs.forEach((tr) => {
||||||| c91c480
    // TODO: テーブルの行を作成して追加する処理が重複しているので、関数化する
    todoItems.forEach((todo) => {
        const tr = document.createElement("tr");
        for (const [key, value] of Object.entries(todo)) {
            const td = document.createElement("td");
            if (key === "completed") {
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = value;
                checkbox.addEventListener("change", (event) => {
                    todo.completed = event.target.checked;
                });
                td.appendChild(checkbox);
            } else {
                td.textContent = value;
            }
            td.classList.add(key);
            tr.appendChild(td);
        }
=======
    // TODO: テーブルの行を作成して追加する処理が重複しているので、関数化する
    todoItems.forEach((todo) => {
        const tr = document.createElement("tr");
        ["completed", "title", "startDateTime", "remainTime"].forEach(key => {
            const value = todo[key];
        //for (const [key, value] of Object.entries(todo)) {
            const td = document.createElement("td");
            if (key === "completed") {
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = value;
                checkbox.addEventListener("change", (event) => {
                    todo.completed = event.target.checked;
                });
                td.appendChild(checkbox);
            } else {
                td.textContent = value;
            }
            td.classList.add(key);
            tr.appendChild(td);
        });
>>>>>>> 8bda29236f764978c3ba136b5bad15c6d175ab77
        table.appendChild(tr);
    });
<<<<<<< HEAD
||||||| c91c480
});

// 開始日時の初期値を現在の日時に設定
window.addEventListener("load", () => {
    const now = new Date();
    // 現在の日時をフォーマットして取得
	let [_, year, month, day, hour, minute] = now.toLocaleString().match(/(\d{4})\/(\d{1,2})\/(\d{1,2})\s(\d{1,2}):(\d{1,2})/);
    month = month.padStart(2, "0");
    day = day.padStart(2, "0");
    hour = hour.padStart(2, "0");
    minute = minute.padStart(2, "0");
    const str = `${year}-${month}-${day}T${hour}:${minute}`;
    // 開始日時の入力フィールドに設定
    document.querySelector("#js-new-startDateTime").value = str;
});

// フォームの送信イベントを処理
formE.addEventListener("submit", (ev) => {
    ev.preventDefault(); // デフォルトの送信動作を防ぐ

    // 入力されたタイトルと開始日時を取得
    const title = inputTitleE.value;
    inputTitleE.value = ""; // 入力を消去
    const startDateTime = inputStartDateTimeE.value;
    let remainTime = updateTime();// 残り時間を計算

    // 新しいToDo項目を作成
    const newTodo = {
        title,
        startDateTime,
        completed: false,
        remainTime
    }
    console.table(newTodo);// コンソールに表示
    todoItems.push(newTodo);
    localStorage.setItem(STORAGE_KEYS.TODOITEMS, JSON.stringify(todoItems));

    // 新しい行をテーブルに追加
    const tr = document.createElement("tr");
    for(const [key, value] of Object.entries(newTodo)) {
        console.log(`${key}: ${value}`);

        const td = document.createElement("td");

        if (key === "completed") {
            // 完了チェックボックスを追加
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";// チェックボックスのタイプを設定
            checkbox.checked = value;// 初期状態を設定
            checkbox.addEventListener("change", (event) => {
                // チェックボックスの状態が変更されたときに完了状態を更新
                newTodo.completed = event.target.checked;
                // ローカルストレージ内のToDoリストを更新
                todoItems.find((todo) => todo.id === newTodo.id).completed = event.target.checked;
                localStorage.setItem(STORAGE_KEYS.TODOITEMS, JSON.stringify(todoItems));
            });
            td.appendChild(checkbox); // チェックボックスをセルに追加
        } else {
            td.textContent = value;// その他のプロパティはテキストとしてセルに追加
        }

        td.classList.add(key);
        tr.appendChild(td);
    }
    tableE.append(tr);

    // 1秒ごとに残り時間を更新
    setInterval(() => {
        remainTime = updateTime();
        const remainTimeTd = tr.querySelector("td.remainTime");
        remainTimeTd.textContent = remainTime;
    }, 1000);
})

// とりあえずの日時を設定
const targetTime = new Date('2024-08-04T00:00+09:00').getTime();

// 残り時間を計算する関数
const updateTime = () => {
    const now = new Date();
    const diff = targetTime - now;
    const diffSec = Math.floor(diff / 1000);

    return diffSec;
=======
});

// 開始日時の初期値を現在の日時に設定
window.addEventListener("load", () => {
    const now = new Date();
    // 現在の日時をフォーマットして取得
	let [_, year, month, day, hour, minute] = now.toLocaleString().match(/(\d{4})\/(\d{1,2})\/(\d{1,2})\s(\d{1,2}):(\d{1,2})/);
    month = month.padStart(2, "0");
    day = day.padStart(2, "0");
    hour = hour.padStart(2, "0");
    minute = minute.padStart(2, "0");
    const str = `${year}-${month}-${day}T${hour}:${minute}`;
    // 開始日時の入力フィールドに設定
    document.querySelector("#js-new-startDateTime").value = str;
});

// フォームの送信イベントを処理
formE.addEventListener("submit", (ev) => {
    ev.preventDefault(); // デフォルトの送信動作を防ぐ

    // 入力されたタイトルと開始日時を取得
    const title = inputTitleE.value;
    inputTitleE.value = ""; // 入力を消去
    const startDateTime = inputStartDateTimeE.value;
    let remainTime = updateTime();// 残り時間を計算

    // 新しいToDo項目を作成
    const newTodo = {
        title,
        startDateTime,
        completed: false,
        remainTime
    }
    console.table(newTodo);// コンソールに表示
    todoItems.push(newTodo);
    localStorage.setItem(STORAGE_KEYS.TODOITEMS, JSON.stringify(todoItems));

    // 新しい行をテーブルに追加
    const tr = document.createElement("tr");// 行を作成

    ["completed", "title", "startDateTime", "remainTime"].forEach(key => {
        const value = newTodo[key];
    //for(const [key, value] of Object.entries(newTodo)) {
        console.log(`${key}: ${value}`);

        const td = document.createElement("td");

        if (key === "completed") {
            // 完了チェックボックスを追加
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";// チェックボックスのタイプを設定
            checkbox.checked = value;// 初期状態を設定
            checkbox.addEventListener("change", (event) => {
                // チェックボックスの状態が変更されたときに完了状態を更新
                newTodo.completed = event.target.checked;
                // ローカルストレージ内のToDoリストを更新
                todoItems.find((todo) => todo.id === newTodo.id).completed = event.target.checked;
                localStorage.setItem(STORAGE_KEYS.TODOITEMS, JSON.stringify(todoItems));
            });
            td.appendChild(checkbox); // チェックボックスをセルに追加
        } else {
            td.textContent = value;// その他のプロパティはテキストとしてセルに追加
        }

        td.classList.add(key);
        tr.appendChild(td); // セルを行に追加
    });
    tableE.append(tr);

    // 1秒ごとに残り時間を更新
    setInterval(() => {
        remainTime = updateTime();
        const remainTimeTd = tr.querySelector("td.remainTime");
        remainTimeTd.textContent = remainTime;
    }, 1000);
})

// とりあえずの日時を設定
const targetTime = new Date('2024-08-04T00:00+09:00').getTime();

// 残り時間を計算する関数
const updateTime = () => {
    const now = new Date();
    const diff = targetTime - now;
    const diffSec = Math.floor(diff / 1000);

    return diffSec;
>>>>>>> 8bda29236f764978c3ba136b5bad15c6d175ab77
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

// 1秒ごとに各<tr id="<<todoitem.id>>">内の<td id="remainTime">の残り時間を更新
setInterval(() => {
    // console.debug("setInterval: update remainTime");
    const trs = document.querySelectorAll("tr.todo-item");
    trs.forEach((tr) => {
        const id = tr.id;
        const item = todoList.find(id);
        const remainTimeE = tr.querySelector("#js-td-remainTime");
        if (!item || !remainTimeE) {
            return;
        }
        const formatted = formatMillisec2HHMMSS(item.remainTime);
        remainTimeE.textContent = formatted;
    });
}, 1000);
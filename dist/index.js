"use strict";
/**
 * ローカルストレージのキー
 */
const STORAGE_KEYS = {
    TODOITEMS: "todo-items"
}

// フォームと入力フィールド、テーブル要素を取得
const formE = document.querySelector("#js-new-form");
const inputTitleE = document.querySelector("#js-new-title");
const inputStartDateTimeE = document.querySelector("#js-new-startDateTime");
const tableE = document.querySelector("#js-todo-table");

/**
 * ToDo項目の配列
 * @type {Object[]}
 */
const todoItems = [];

// ページ読み込み時にローカルストレージからToDoリストを取得
window.addEventListener("load", () => {
    // ローカルストレージからToDoリストを取得
    const storedTodoItems = localStorage.getItem(STORAGE_KEYS.TODOITEMS);
    if (storedTodoItems) {
        todoItems.push(...JSON.parse(storedTodoItems));
    }
    const table = document.querySelector("#js-todo-table");
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
                    const titleTd = tr.querySelector("td.title");
                    if (event.target.checked) {
                        titleTd.style.textDecoration = "line-through";
                    } else {
                        titleTd.style.textDecoration = "none";
                    }
                });
                td.appendChild(checkbox);
            } else {
                td.textContent = value;
                // タイトルが完了済みの場合は取り消し線を追加
                if (key === "title" && todo.completed) {
                    td.style.textDecoration = "line-through";
                }
            }
            td.classList.add(key);
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
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
            // チェックボックスの状態が変更されたときに完了状態を更新
            checkbox.addEventListener("change", (event) => {
                newTodo.completed = event.target.checked;
                // ローカルストレージ内のToDoリストを更新
                todoItems.find((todo) => todo.id === newTodo.id).completed = event.target.checked;
                localStorage.setItem(STORAGE_KEYS.TODOITEMS, JSON.stringify(todoItems));

                // タイトルのセルに取り消し線を追加
                const titleTd = tr.querySelector("td.title");// タイトルのセルを取得
                if (event.target.checked) {
                    titleTd.style.textDecoration = "line-through";// 取り消し線を追加
                } else {
                    titleTd.style.textDecoration = "none";// 取り消し線を削除
                }   
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
};

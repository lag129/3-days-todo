"use strict";

// フォームと入力フィールド、テーブル要素を取得
const formE = document.querySelector("#js-new-form");
const inputTitleE = document.querySelector("#js-new-title");
const inputStartDateTimeE = document.querySelector("#js-new-startDateTime");
const tableE = document.querySelector("#js-todo-table");


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

    // 新しい行をテーブルに追加
    const tr = document.createElement("tr");
    for(const [k, v] of Object.entries(newTodo)) {
        console.log(`${k}: ${v}`);

        const td = document.createElement("td");
        td.textContent = v;
        td.classList.add(k);
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
};

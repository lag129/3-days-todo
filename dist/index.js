"use strict";

const formE = document.querySelector("#js-new-form");
const inputTitleE = document.querySelector("#js-new-title");
const inputStartDateTimeE = document.querySelector("#js-new-startDateTime");
const tableE = document.querySelector("#js-todo-table");


// 開始日時の初期値を現在の日時に設定
window.addEventListener("load", () => {
    const now = new Date();
    const str = now.toISOString().match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/)[0]; // YYYY-MM-DD
    document.querySelector("#js-new-startDateTime").value = str;
});

formE.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const title = inputTitleE.value;
    inputTitleE.value = ""; // 入力を消去
    const startDateTime = inputStartDateTimeE.value;

    const newTodo = {
        title,
        startDateTime,
        completed: false
    }
    console.table(newTodo);

    const tr = document.createElement("tr");
    for(const [k, v] of Object.entries(newTodo)) {
        console.log(`${k}: ${v}`);

        const td = document.createElement("td");
        td.textContent = v;
        tr.appendChild(td);
    }
    tableE.append(tr);
})
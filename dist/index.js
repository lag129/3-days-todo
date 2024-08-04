"use strict";
import { TodoItem } from "./js/TodoItem.js";
import { TodoStorage } from "./js/TodoStorage.js";
import achivements from "./js/definition/achivements.js";

import formatMillisec2HHMMSS from "./js/util/formatMillisec2HHMMSS.js";
// import { CONSTANTS } from "./js/Constants";

const todoStorage = new TodoStorage();

const renderTodoTable = () => {
    const table = document.querySelector("#js-todo-table");
    table.innerHTML = "";
    // isRemovedがfalseのものだけを描画
    const trsNot = todoStorage.loadTodoItems()
        .filter((item) => !item.isRemoved && !item.isCompleted)
        .map((item) => item.generateTRElement())
        .forEach((tr) => table.appendChild(tr));
    
    // 完了済みのものだけを描画
    const tableCompleted = document.querySelector("#js-todo-table-completed");
    tableCompleted.innerHTML = "";
    const trsCompleted = todoStorage.loadTodoItems()
        .filter((item) => !item.isRemoved && item.isCompleted)
        .map((item) => item.generateTRElement())
        .forEach((tr) => tableCompleted.appendChild(tr));
    
    const trsExists = table.querySelector('tr') !== null || tableCompleted.querySelector('tr') !== null;
    const emptyTodoMessage = document.querySelector("#js-empty-todo-message");
    emptyTodoMessage.textContent = "何も無いよ; ;";
    if (!trsExists) {
        emptyTodoMessage.style.display = "flex";
    } else {
        emptyTodoMessage.style.display = "none";
    }
};

const renderAchivements = () => {
    console.debug("renderAchivements()");
    const containerE = document.querySelector("div.achivement-container");
    achivements.forEach((achivement) => {
        const itemE = achivement.generateHTMLElement();
        containerE.appendChild(itemE);
    });
};

// ストレージに保存されているToDoリストを描画
window.addEventListener("load", () => {
    console.log("load: renderTodoTable()");
    renderTodoTable();
    renderAchivements();
});

// フォームの送信ボタンがクリックされたときの処理
const formE = document.querySelector("#js-new-form");
formE.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputTitleE = document.querySelector("#js-new-title");
    const inputStartDateTimeE = document.querySelector("#js-new-startDateTime");
    // タイトルが入力されていない場合は何もしない
    if(inputTitleE.value === "") return;
    let options;
    // デバッグ用コマンド
    if (inputTitleE.value.startsWith("!DEBUG")) {
        const [_, subcommand, ...args] = inputTitleE.value.split(" ");
        if (subcommand === "json") {
            options = JSON.parse(args[0]);
            return;
        } else if (subcommand === "clear") {
            todoStorage.clearTodoItems();
            return;
        }
    }
    options = { title: inputTitleE.value };
    const item = new TodoItem(options);
    todoStorage.addTodoItem(item);
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
setInterval(async () => {
    console.debug("setInterval: update remainTime");
    renderTodoTable();
    countCompletedTodo();
    await checkAchivementIsCompleted();
}, 1000);

const checkAchivementIsCompleted = async () => {
    await achivements
        .filter((achivement) => !achivement.isAchived && achivement.checker())
        .forEach(async (achivement) => {
            console.info(`achivement ${achivement.id} is completed!`);
            achivement.isAchived = true;
            const itemE = document.getElementById(achivement.id);
            itemE.classList.remove("not-achived");
            itemE.classList.add("achived");
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            return;
        });
    return;
}

// 完了済みのToDoをカウント
const countCompletedTodo = () => {
    let countCompleted = 0;
    const text = document.getElementById("js-count-completed");
    const progressCircle = document.getElementById("js-progress-circle");
    const progressText = document.getElementById("js-progress-text");
    const itemsJSON = todoStorage.loadTodoItems();
    const totalTasks = itemsJSON.length; // totalTasksを設定

    if (itemsJSON) {
        itemsJSON.forEach((item) => {
            if (item.isCompleted) {
                countCompleted++;
            }
        });
    }

    if (text) {
        text.textContent = "完了Todo: " + countCompleted;
    }

    if (progressCircle && progressText) {
        const percentage = totalTasks > 0 ? Math.min((countCompleted / totalTasks) * 100, 100) : 0;
        progressCircle.style.background = `conic-gradient(#4caf50 ${percentage}%, #bcd6bd ${percentage}%)`;
        //progressText.textContent = `${Math.round(percentage)}%`;
        progressText.textContent = `${countCompleted} / ${totalTasks}`;
    }
};

async function openShareScreen() {
    const text = document.getElementById("js-count-completed");
    const textString = `3 Days ToDoを使って、${text.textContent}個を達成しました！`
    if (navigator.share) {
        try {
            await navigator.share({
                title: '3 Days ToDo',
                text: textString,
                url: location.href,
            });
        } catch (e) {
            console.log(e.message);
        }
    } else {
        navigator.clipboard.writeText(textString + " " + location.href);
        alert("クリップボードにコピーしました!");
    }
}
document.getElementById('js-share-button').addEventListener('click', openShareScreen);

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.getElementById('js-hamburger-button');
    const sidebar = document.querySelector('.sidebar');

    hamburgerButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
});
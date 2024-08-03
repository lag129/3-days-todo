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
        .filter((item) => !item.isRemoved)
        .map((item) => item.generateTRElement())
        .forEach((tr) => table.appendChild(tr));
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
    const options = ((value) => {
        if(value.startsWith("!DEBUG")) {
            return JSON.parse(value.match(/!DEBUG\s(.*)/)[1]);
        } else {
            return {title: value};
        }
    })(inputTitleE.value);
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
setInterval(() => {
    console.debug("setInterval: update remainTime");
    renderTodoTable();
    countCompletedTodo();
    checkAchivementIsCompleted();
}, 1000);

const checkAchivementIsCompleted = () => {
    achivements.forEach((achivement) => {
        // console.log(`check achivement: ${achivement.id}`);
        if(achivement.checker()) {
            // achivement.achive();
            // console.log(`achivement: ${achivement.id}`);
            const itemE = document.querySelector(`.achivement-container .item#${achivement.id}`);
            itemE.classList.add("achived");
            itemE.classList.remove("not-achived");
        }
    });
}

// 完了済みのToDoをカウント
const countCompletedTodo = () => {
    let countCompleted = 0;
    const text = document.getElementById("js-count-completed");
    const progressCircle = document.getElementById("js-progress-circle");
    const progressText = document.getElementById("js-progress-text");
    const itemsJSON = todoStorage.loadTodoItems();
    const totalTasks = 5; // 完了タスクの目標数

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
        const percentage = Math.min((countCompleted / totalTasks) * 100, 100);
        progressCircle.style.background = `conic-gradient(#4caf50 ${percentage}%, #bcd6bd ${percentage}%)`;
        //progressText.textContent = `${Math.round(percentage)}%`;
        progressText.textContent = `${countCompleted} / ${totalTasks}`;
    }
};

async function openShareScreen() {
    const text = document.getElementById("js-count-completed");
    const textString = `ToDoリストを使って、${text.textContent}個を達成しました！`
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'ToDoリスト',
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
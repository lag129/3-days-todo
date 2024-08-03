/**
 * 定数をまとめたファイル
 * @example
 * import CONSTANTS from "./Constants.js";
 * @example
 * import { STORAGE_KEYS } from "./Constants.js";
 * console.log(STORAGE_KEYS);
 */
export const CONSTANTS = {
    // ローカルストレージのキーをまとめたオブジェクト
    STORAGE_KEYS: {
        // ToDoアイテムを保存するためのキー
        TODO_ITEMS: "todo-items"
    },
    // 締め切りまでの期間をミリ秒で表した定数（3日間）
    PERIOD_TO_DEADLINE_MSEC: 1000 * 60 * 60 * 24 * 3
};
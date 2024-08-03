/**
 * @class AchivementItem
 * @property {string} id - アチーブメントごとにユニークなID
 * @property {string} title - アチーブメントのタイトル
 * @property {string} description - アチーブメントの説明（獲得条件を記載？）
 * @property {boolean} isAchived - アチーブメントを達成したかどうか
 * @property {Function} checker - アチーブメント達成条件をチェックする関数
 * @property {Function} achive - アチーブメント達成時に実行する関数
 */
export class AchivementItem {
    /**
     * @param {Object} options
     * @param {string} options.id
     * @param {string} options.title
     * @param {description} options.description
     * @param {Function} options.checker
     */
    constructor(options) {
        this.id = options.id; // アチーブメントのIDを設定
        this.title = options.title; // アチーブメントのタイトルを設定
        this.description = options.description; // アチーブメントの説明を設定
        this.isAchived = false; // 初期状態ではアチーブメントは未達成
        this.checker = options.checker; // アチーブメント達成条件をチェックする関数を設定
        this.achive = options.achive; // deprecated? アチーブメント達成時に実行する関数を設定
    }

    /**
     * アチーブメントを表現するHTML要素を生成する
     * @returns {HTMLDivElement}
     */
    generateHTMLElement() {
        const item = document.createElement("div"); // .item要素を作成
        item.classList.add("item");
        this.checker(); // アチーブメント達成条件をチェック. ここでisAchivedが変更される
        item.classList.add(this.isAchived ? "achived" : "not-achived"); // 達成状態に応じてクラスを追加
        item.id = this.id; // 要素のIDを設定

        const top = document.createElement("div"); // .top要素を作成
        top.classList.add("top");
        const icon = document.createElement("div"); // アイコン要素を作成
        icon.classList.add("icon");
        icon.textContent = "🏆"; // アイコンの内容を設定
        top.appendChild(icon);
        const title = document.createElement("div"); // タイトル要素を作成
        title.classList.add("title");
        title.textContent = this.title; // タイトルの内容を設定
        top.appendChild(title);

        const bottom = document.createElement("div"); // .bottom要素を作成
        const description = document.createElement("div"); // 説明要素を作成
        description.classList.add("description");
        description.textContent = this.description; // 説明の内容を設定
        bottom.appendChild(description);

        item.appendChild(top); // .itemに.topを追加
        item.appendChild(bottom); // .itemに.bottomを追加
        return item; // .item要素を返す
    }

    /**
     * アチーブメントをJSON形式に変換する
     * @returns {Object}
     */
    toJSON() {
        return {
            id: this.id, // IDをJSONに含める
            title: this.title, // タイトルをJSONに含める
            description: this.description, // 説明をJSONに含める
            isAchived: this.isAchived, // 達成状態をJSONに含める
        };
    }
}
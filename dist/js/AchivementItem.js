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
        this.id = options.id;
        this.title = options.title;
        this.description = options.description;
        this.isAchived = false;
        this.checker = options.checker;
        this.achive = options.achive; // deprecated?
    }

    /**
     * 
     * @returns {HTMLDivElement}
     */
    generateHTMLElement() {
        // .item
        const item = document.createElement("div");
        item.classList.add("item");
        this.isAchived = this.checker(); // アチーブメント達成条件をチェック
        item.classList.add(this.isAchived ? "achived" : "not-achived");
        item.id = this.id;

        // .item .top
        const top = document.createElement("div");
        top.classList.add("top");
        const icon = document.createElement("div");
        icon.classList.add("icon");
        icon.textContent = "🏆";
        top.appendChild(icon);
        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = this.title;
        top.appendChild(title);

        // .item .bottom
        const bottom = document.createElement("div");
        const description = document.createElement("div");
        description.classList.add("description");
        description.textContent = this.description;
        bottom.appendChild(description);

        item.appendChild(top);
        item.appendChild(bottom);
        return item;
    }


    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            isAchived: this.isAchived,
        };
    }
}
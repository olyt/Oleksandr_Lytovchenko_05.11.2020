import "./FavoritesItem.scss"
import CloseIcon from "../svg/CloseIcon";

export default class FavoriteItem {
    constructor(name, handleBtn) {
        this.name = name;
        this.handleBtn = handleBtn;
        this.elem = {
            listItem: document.createElement("li"),
            nameNode: document.createElement("span"),
            removeBtn: document.createElement("button"),
            closeIcon: new CloseIcon("black", 30, 30)
        };
    }

    render(parent) {
        const {nameNode, listItem, removeBtn, closeIcon} = this.elem;

        nameNode.textContent = this.name;
        closeIcon.render(removeBtn);

        listItem.dataset.name = this.name;

        listItem.classList.add("favorites__list-item");
        removeBtn.classList.add("favorites__btn");
        nameNode.classList.add("favorites__name");

        removeBtn.addEventListener("click", this.handleBtn);

        listItem.append(nameNode, removeBtn);
        parent.append(listItem);
    }
}
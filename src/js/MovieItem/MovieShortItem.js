import "./MovieShortItem.scss"
import "./MovieDetail.scss"
import FavoritesIcon from "../svg/FavoritesIcon";
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import ModalMovie from "../ModalMovie/ModalMovie";

export class MovieShortItem {
    constructor({id, img, name, year}) {
        this.id = id;
        this.imgURL = img;
        this.name = name;
        this.year = year;
        this.elem = {
            self: document.createElement("div"),
            imgNode: document.createElement("img"),
            nameNode: document.createElement("h3"),
            yearNode: document.createElement("span"),
            favoriteBtn: document.createElement("button"),
            favIcon: new FavoritesIcon("gray", 30, 30)
        };
    }

    render(parent) {
        const {self, imgNode, nameNode, yearNode, favoriteBtn, favIcon} = this.elem,
            descWrapper = document.createElement("div");

        if (this.checkFavorites()) {
            favIcon.setFill("#ffc107");
        }

        nameNode.textContent = this.name;
        yearNode.textContent = this.year;
        imgNode.src = this.imgURL;

        imgNode.alt = "Movie poster";

        self.classList.add("movie-item");
        imgNode.classList.add("movie-item__img");
        favoriteBtn.classList.add("movie-item__fav-btn");
        descWrapper.classList.add("movie-item__desc-wrapper");
        nameNode.classList.add("movie-item__head");
        yearNode.classList.add("movie-item__year");

        self.addEventListener("click", event => {
            if (event.target === favoriteBtn) {
                this.toggleFavorites(favoriteBtn, favIcon);
            } else {
                const modal = new ModalMovie(this.id, () => this.toggleFavoritesBtnColor());
                modal.render(document.body, document.createElement("div"));
            }
        })

        favIcon.render(favoriteBtn);
        descWrapper.append(nameNode, yearNode);
        self.append(favoriteBtn, imgNode, descWrapper);

        parent.append(self);
    }

    checkFavorites() {
        const favorites = JSON.parse(localStorage.getItem("favorites")),
            currentItem = favorites.find(i => i === this.name);

        return !!currentItem;
    }

    toggleFavorites(btn, icon) {
        if (this.checkFavorites()) {
            this.removeFromFavorites(btn, icon);
        } else {
            this.addToFavorites(btn, icon);
        }
    }

    changeFavoritesBtn(btn, icon, fill) {
        icon.setFill(fill);
        btn.innerHTML = "";
        icon.render(btn)
    }

    toggleFavoritesBtnColor() {
        const {favIcon, favoriteBtn} = this.elem;
        switch (favIcon.fill) {
            case "gray":
                this.changeFavoritesBtn(favoriteBtn, favIcon, "#ffc107");
                break;
            case "#ffc107":
                this.changeFavoritesBtn(favoriteBtn, favIcon, "gray");
                break;
        }
    }

    addToFavorites(btn, icon) {
        const favorites = JSON.parse(localStorage.getItem("favorites"));

        favorites.push(this.name);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        this.changeFavoritesBtn(btn, icon, "#ffc107");

        const newFavListItem = new FavoriteItem(this.name, () => this.removeFromFavorites(btn, icon));
        newFavListItem.render(document.querySelector(".favorites__list"))
    }

    removeFromFavorites(btn, icon) {
        const favorites = JSON.parse(localStorage.getItem("favorites")),
            newFavorites = favorites.filter(i => i !== this.name);

        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        this.changeFavoritesBtn(btn, icon, "gray");

        const favoritesListNode = document.querySelector(".favorites__list");
        const favoritesOnList = [...document.querySelectorAll(".favorites__list-item")];
        const oneItem = favoritesOnList.find(item => item.dataset.name === this.name);
        favoritesListNode.removeChild(oneItem);
    }
}

export class MovieDetail extends MovieShortItem {
    constructor({id, img, name, director, starring, year, genres, description}, shortFavoritesHandler) {
        super({id, img, name, year});
        this.director = director;
        this.starring = starring;
        this.genres = genres;
        this.description = description;
        this.shortHandler = shortFavoritesHandler;
    }

    render(parent) {
        const {imgNode, nameNode, yearNode, favoriteBtn, favIcon} = this.elem,
            self = document.createElement("div"),
            leftPartWrapper = document.createElement("div"),
            rightPartWrapper = document.createElement("div"),
            genresWrapper = document.createElement("div"),
            descriptionNode = document.createElement("p"),
            directorNode = document.createElement("p"),
            starringNode = document.createElement("p");

        if (this.checkFavorites()) {
            favIcon.setFill("#ffc107");
        }

        favoriteBtn.addEventListener("click", () => {
            this.toggleFavorites(favoriteBtn, favIcon);
            this.shortHandler();
        });

        this.genres.forEach(item => {
            const genreNode = document.createElement("span");
            genreNode.classList.add("movie-detail__genre-item");
            genreNode.textContent = item;
            genresWrapper.append(genreNode);
        });

        nameNode.textContent = this.name;
        yearNode.textContent = this.year;
        descriptionNode.textContent = this.description;
        directorNode.textContent = `Director: ${this.director}`;
        starringNode.textContent = `Starring: ${this.starring.join(", ")}`;
        imgNode.src = this.imgURL;

        imgNode.alt = "Movie poster";

        self.classList.add("movie-detail");
        leftPartWrapper.classList.add("movie-detail__left-section");
        rightPartWrapper.classList.add("movie-detail__right-section");
        genresWrapper.classList.add("movie-detail__genres");
        descriptionNode.classList.add("movie-detail__desc");
        descriptionNode.classList.add("movie-detail__desc");
        directorNode.classList.add("movie-detail__director");
        starringNode.classList.add("movie-detail__starring");
        imgNode.classList.add("movie-detail__img");
        nameNode.classList.add("movie-detail__name");
        yearNode.classList.add("movie-detail__year");
        favoriteBtn.classList.add("movie-detail__btn");

        favIcon.render(favoriteBtn);
        leftPartWrapper.append(imgNode, favoriteBtn, yearNode, genresWrapper);
        rightPartWrapper.append(nameNode, descriptionNode, directorNode, starringNode);
        self.append(leftPartWrapper, rightPartWrapper);
        parent.append(self);
    }
}
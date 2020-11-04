import "./ModalMovie.scss"
import CloseIcon from "../svg/CloseIcon";
import getMovieById from "../utils/getMovieById";
import {MovieDetail} from "../MovieItem/MovieShortItem";

export default class ModalMovie {
    constructor(id, handlerFavoritesSynchro) {
        this.id = id;
        this.handlerFavorites = handlerFavoritesSynchro;
        this.modal = document.createElement("div");
        this.closeBtn = document.createElement("button");
        this.closeIcon = new CloseIcon("white", 60, 60);
    }

    async render(parent) {
        const movieItem = await getMovieById(this.id),
            movieDetail = new MovieDetail(movieItem, this.handlerFavorites);


        this.closeIcon.render(this.closeBtn);

        this.modal.classList.add("modal");
        this.closeBtn.classList.add("modal__btn");

        this.closeBtn.addEventListener("click", () => {
           parent.removeChild(this.modal);
        });

        this.modal.append(this.closeBtn);
        movieDetail.render(this.modal);
        parent.prepend(this.modal);
    }
}
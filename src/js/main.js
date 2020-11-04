import getMovies from "./utils/getMovies";
import {MovieShortItem} from "./MovieItem/MovieShortItem";
import FavoriteItem from "./FavoriteItem/FavoriteItem";

if (!localStorage.getItem("favorites")) {
    localStorage.setItem("favorites", JSON.stringify([]));
}

async function renderPage() {
    const moviesList = await getMovies();

    moviesList.forEach(item => {
        const movie = new MovieShortItem(item);
        movie.render(document.querySelector(".movies-gallery__wrapper"));

        if (movie.checkFavorites()) {
            const {favoriteBtn, favIcon} = movie.elem;
            showFirstLaunchFavorites(movie, () => movie.removeFromFavorites(favoriteBtn, favIcon));
        }
    })
}

function showFirstLaunchFavorites(movieObj, handleBtn) {
    const favListItem = new FavoriteItem(movieObj.name, handleBtn);
    favListItem.render(document.querySelector(".favorites__list"));
}

renderPage();


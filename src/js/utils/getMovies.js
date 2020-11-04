const getMovies = () => {
    return fetch("http://my-json-server.typicode.com/moviedb-tech/movies/list")
        .then(res => res.json())
        .catch(err => console.log(err));
};

export default getMovies;
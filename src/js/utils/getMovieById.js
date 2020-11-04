const getMovieById = (id) => {
    return fetch(`http://my-json-server.typicode.com/moviedb-tech/movies/list/${id}`)
        .then(res => res.json())
        .catch(err => console.log(err));
};

export default getMovieById;
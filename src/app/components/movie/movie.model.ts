export class Movie {
    popularity: number;
    voteCount: number;
    video: boolean;
    posterPath: string;
    id: number;
    adult: boolean;
    backdropPath: string;
    originalLanguage: string;
    originalTitle: string;
    genreIds: number[];
    title: string;
    voteAverage: number;
    overview: string;
    releaseDate: Date;
    year;
    constructor(json: any) {
        if (!json) {
            return;
        }
        this.popularity = json.popularity;
        this.voteCount = json.vote_count;
        this.video = json.video;
        this.posterPath = `https://image.tmdb.org/t/p/original${json.poster_path}`;
        this.id = json.id;
        this.adult = json.adult;
        this.backdropPath = `https://image.tmdb.org/t/p/original${json.backdrop_path}`;
        this.originalLanguage = json.original_language;
        this.originalTitle = json.original_title;
        this.genreIds = json.genre_ids;
        this.title = json.title;
        this.voteAverage = json.vote_average;
        this.overview = json.overview;
        if (json.release_date) {
            this.releaseDate = new Date(json.release_date);
            this.year = this.releaseDate.getFullYear();
        }
    }
}

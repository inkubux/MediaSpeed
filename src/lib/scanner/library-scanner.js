export default class LibraryScanner {
    constructor(directoryScanner, movieScanner, episodeScanner, movieService, libraryService, logger) {
        this.directoryScanner = directoryScanner;
        this.movieScanner = movieScanner;
        this.episodeScanner = episodeScanner;
        this.movieService = movieService;
        this.libraryService = libraryService;
        this.logger = logger;
    }

    async scan(library) {
        this.logger.info('scanning ' + library.path);

        library.last_update = Date.now();
        await this.libraryService.update(library.uid, library);

        if (library.type === 'movie') {
            return this.scanMovies(library);
        }

        if (library.type === 'episode') {
            return this.scanEpisodes(library);
        }
    }

    async scanMovies(library) {
        const newMoviesFiles = await this.directoryScanner.getNewFiles(library.path);
        for (const index in newMoviesFiles) {
            const path = newMoviesFiles[index];

            // @todo migrate to MovieScanner
            await this.movieScanner.execute(path, library);
        }
    }

    async scanEpisodes(library) {
        const newEpisodeFiles = await this.directoryScanner.getNewFiles(library.path);
        for (const index in newEpisodeFiles) {
            const path = newEpisodeFiles[index];

            // @todo rename EpisodeScanner
            await this.episodeScanner.execute(path, library);
        }
    }
}

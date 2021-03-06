import { BadRequest } from 'fejl';
import BaseService from './base-service';

// Prevent overposting.
const props = [
    'type',
    'uid',
    'library_uid',
    'filePath',
    'fileName',
    'show_name',
    'episode_number',
    'season_number',
    'name',
    'air_date',
    'tmdb_show_id',
    'tmdb_season_id',
    'tmdb_id',
    'tmdb_still_path',
    'overview',
    'vote_average',
    'vote_count',
    'show_uid',
    'season_uid',
    'width',
    'height',
    'file_duration',
    'file_size',
    'bit_rate',
    'video_codec',
    'still_path',
    'local_screenshot',
    'local_still',
    'audios',
    'subtitles'
];

export default class EpisodeService extends BaseService {
    constructor(episodeStore) {
        super(episodeStore, props);
    }

    assertInput(data) {
        BadRequest.assert(data, 'No episode payload given');
        BadRequest.assert(data.uid, 'uid is required');
        BadRequest.assert(data.name, 'name is required'); // @todo change to title..
        BadRequest.assert(data.filePath, 'filepath is required');
        BadRequest.assert(data.fileName, 'filename does not exist');
        BadRequest.assert(data.episode_number, 'episode_number does not exist');
        BadRequest.assert(data.season_number, 'season_number does not exist');
    }
}

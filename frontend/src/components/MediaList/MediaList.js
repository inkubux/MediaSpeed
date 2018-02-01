import React from 'react';
import MediaItem from '../MediaItem/MediaItem';
import {Grid} from 'semantic-ui-react';
import './MediaList.css';

const MediaList = ({ medias, layout, columns }) =>

    <Grid stackable columns={columns || 6}>
        {medias.map((media) => {
            return <Grid.Column key={media.uid}>
                <MediaItem  media={media} layout={layout}/>
            </Grid.Column>
        })}
    </Grid>;

export default MediaList;
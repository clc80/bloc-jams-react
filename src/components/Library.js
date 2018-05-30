import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from '../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {albums: albumData };
  }

  render () {
    return (
      <section className='library'>
        <div className="album-information">
        {
          this.state.albums.map( (album, index) =>
          <Link to={`/album/${album.slug}`} key={index}>
          <img src={album.albumCover} alt={album.title} />
          <div className="albumTitle">{album.title}</div>
          <div className="albumArtist">{album.artist}</div>
          <div className="albumlength">{album.songs.length} songs</div>
          </Link>
        )
      }
    </div>
      </section>
    )
  }
}

export default Library;

import React, { Component } from 'react';
import albumData from '../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

  const album = albumData.find( album => {
    return album.slug === this.props.match.params.slug
  });

  this.state = {
  album: album,
  currentSong: album.songs[0],
  curretTime: 0,
  duration: album.songs[0].duration,
  volume: 0.5,
  isPlaying: false
};

this.audioElement = document.createElement('audio');
this.audioElement.src = album.songs[0].audioSrc;
  }
  componentDidMount() {
  this.eventListeners = {
    timeupdate: e => {
      this.setState({ currentTime: this.audioElement.currentTime });
    },
    durationchange: e => {
      this.setState({ duration: this.audioElement.duration });
    },
    volumechange: e => {
      this.setState({ volume: this.audioElement.volume});
    }
  };
  this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
  this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }
  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
  }
  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }
  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }
  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }
  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if(!isSameSong) { this.setSong(song); }
      this.play();
    }
  }
  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }
  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(currentIndex + 1, this.state.album.songs.length - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }
  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }
  formatTime(time) {
    if (isNaN(time) === true || time === undefined ) {
     return '-:--';
   }
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);

    if (minutes < 10 ) {
      minutes = '0' + minutes.toString();
    }
    if (seconds < 10) {
      seconds = '0'+ seconds.toString();
    }
    return minutes + ":" + seconds
  }
  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ currentVolume: newVolume });
  }
  mouseEnter(e) {
    e.target.className = 'ion-md-play'
  }

  mouseLeave(e) {
    e.target.className = "song-number"
  }

  playOrPause(e) {
    if(this.state.isPlaying) {
      e.target.className = "ion-md-play"
    } else {
      e.target.className = "ion-md-pause"
    }
  }

  render() {
    return (
      <section className="library">
        <div className="album-info">
          <div className="album-details">
            <h1 id="album-title">
              {this.state.album.title}
            </h1>
            <h2 className="artist">
              {this.state.album.artist}
            </h2>
            <div id="release-info">
              {this.state.album.releaseInfo}
            </div>
          </div>
          <img id="album-cover-art"
            src={this.state.album.albumCover}
            alt={this.state.album.title}
          />
        </div>
        
        <div className="tableAndControls">
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>

          <tbody>
            {
              this.state.album.songs.map( (song, index) =>
                <tr className="song"
                  key={index}
                  onClick={() => this.handleSongClick(song)}>
                  <td id={index} className="song-number" >
                    <span
                      onMouseEnter={(e) => this.mouseEnter(e) }
                      onMouseLeave={(e) => this.mouseLeave(e) }
                      onClick={(e) => this.playOrPause(e) }>
                        {index + 1}
                      </span>
                      </td>
                  <td>{song.title}</td>
                  <td>{this.formatTime(song.duration)}</td>
                </tr>
              )
          }
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          currentVolume={this.audioElement.volume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={(time) => this.formatTime(time)}
        />
      </div>
      </section>
    );
  }
}

export default Album;

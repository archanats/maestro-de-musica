import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

class Tracks extends Component {
  state = { isPlaying: false, audio: null, playingPreviewUrl: null };

  playAudio = (previewUrl) => () => {
    const audio = new Audio(previewUrl);
    if (!this.state.isPlaying) {
      this.setState({
        audio: audio,
        isPlaying: true,
        playingPreviewUrl: previewUrl,
      });
      audio.play();
    } else {
      this.state.audio.pause();
      if (this.state.playingPreviewUrl !== previewUrl) {
        audio.play();
        this.setState({ audio, playingPreviewUrl: previewUrl });
      } else {
        this.setState({ isPlaying: false });
      }
    }
  };

  playIcon = (track) => {
    if (!track.preview_url) {
      return <span>N/A</span>;
    }
    
    if (
      this.state.isPlaying &&
      this.state.playingPreviewUrl === track.preview_url
    ) {
      return <span>||</span>;
    }
    return <span>&#9654;</span>;
  };

  render() {
    const { tracks } = this.props;
    console.log(tracks);
    return (
      <>
        {tracks.map((track) => {
          const { id, name, album, preview_url } = track;

          return (
            <Col
              lg={3}
              key={id}
              onClick={this.playAudio(preview_url)}
              className="track my-4"
            >
              <img
                src={album.images[0].url}
                alt="album-pic"
                className="track-img"
              />
              <p className="track-title">{name}</p>
              <p class="play-icon">{this.playIcon(track)}</p>
            </Col>
          );
        })}
      </>
    );
  }
}

export default Tracks;

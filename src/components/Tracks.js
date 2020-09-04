import React, { Component } from 'react';
import { Col, Card, Media } from 'react-bootstrap';

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
      return <span>| |</span>;
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
              xs={12}
              lg={3}
              key={id}
              onClick={this.playAudio(preview_url)}
              className="mt-5"
            >
            
              {/* // <p className="track-title">{name}</p>
              // <p className="play-icon">{this.playIcon(track)}</p>  */}
              <Card>
                <Card.Img src={album.images[0].url}
                alt="album-pic"/>
                <Card.ImgOverlay>
                  <Card.Title>{name}</Card.Title>
                  <Card.Text className="play-icon">{this.playIcon(track)}</Card.Text>
                </Card.ImgOverlay>
              </Card>
           </Col>
          );
        })}
      </>
    );
  }
}

export default Tracks;

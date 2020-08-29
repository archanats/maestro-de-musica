import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Artist from './Artist';
import Tracks from './Tracks';
import Search from './Search';

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';

class App extends Component {
  state = { artist: null, tracks: [] };
  
  searchArtist = artistQuery => {
    fetch(`${API_ADDRESS}/artist/${artistQuery}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.artists.total > 0) {
          const artist = json.artists.items[0];
          this.setState({ artist });

          fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
            .then((response) => response.json())
            .then((json) => this.setState({ tracks: json.tracks }))
            .catch((error) => alert(error.message));
        }
      })
      .catch((error) => alert(error.message));
  };

  render() {
    return (
      <Container>
        <Row>
          <Col className="mt-5">
            <h2>Maestro de Musica</h2>
          </Col>
        </Row>
        <Row md={2} lg={3} className="justify-content-around">
          <Col>
            <Search searchArtist={this.searchArtist}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Artist artist={this.state.artist} />
          </Col>
        </Row>
        <Row>
          <Tracks tracks={this.state.tracks} />
        </Row>
      </Container>
    );
  }
}

export default App;

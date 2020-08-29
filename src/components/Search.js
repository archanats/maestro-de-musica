import React, { Component } from 'react';
import { Row, InputGroup, FormControl, Button, Col } from 'react-bootstrap';

class Search extends Component {
  state = { artistQuery: '' };

  updateArtistQuery = (event) => {
    console.log(event.target.value);
    this.setState({ artistQuery: event.target.value });
  };

  searchArtist = () => {
    this.props.searchArtist(this.state.artistQuery);
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.searchArtist();
    }
  };

  render() {
    return (
      <>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search for an Artist"
            onChange={this.updateArtistQuery}
            onKeyPress={this.handleKeyPress}
          />
          <InputGroup.Append>
            <Button className="btn-dark" onClick={this.searchArtist}>
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </>
    );
  }
}

export default Search;

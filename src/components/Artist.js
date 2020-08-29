import React from 'react';

const Artist = ({ artist }) => {
  if (artist) {
    const { images, followers, genres, name } = artist;
    return (
      <div className="mt-5">
        <img
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            objectFit: 'cover',
          }}
          src={images[0] && images[0].url}
          alt="artist-profile"
        />
        <h3 className="mt-3">{name}</h3>
        <p>{followers.total} followers</p>
        <p>{genres.join(',')}</p>
      </div>
    );
  } else {
    return <div />;
  }
};

export default Artist;

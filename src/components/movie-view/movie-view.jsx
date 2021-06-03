import React from "react";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.imageUrl} />
        </div>
        <div className="movie-title">
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="value">{movie.description}</span>
        </div>
        <button
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back to list
        </button>
      </div>
    );
  }
}

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
    };
  }
}

import React from 'react';
import {Link} from 'react-router-dom';

class TrackResults extends React.Component {

	constructor() {

		super();

		this.state = {

			tracks: []
		};
	}

	millisToMinAndSecs = (millis) => {

		var minutes = Math.floor(millis / 60000);
		var seconds = ((millis % 60000) / 1000).toFixed(0);
		return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
	}

	render() {

		var style = {

			margin: '5px',
			width: '60px',
			heigth: '60px'
		};	

		var buttonStyle = {

			margin: '15px',
		};

		var listStyle = {

			backgroundColor: 'transparent',
			borderTop:' 1px solid #ddd',
			borderRadius: 0,
			color: '#fff',
		};

		return (
			<div>
			<h3>Tracks Results for {this.props.searchQuery}:</h3>
				{
					this.props.tracks.length > 0 && this.props.tracks.slice(0, 5).map((track) => {
						return (
							<div key={track.id} className="list-group" style={listStyle}>
							<Link to={{ pathname: `/song/${track.id}`, state: track  }} className="list-group-item list-group-item-action flex-column align-items-start">
							<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1"> <img src={track.album.images[0].url} style={style} alt="..." className="img-thumbnail float-left" />
							{ track.name }
							</h5>
							<small>{this.millisToMinAndSecs(track.duration_ms)}</small>
							</div>
							<p className="mb-1">{track.artists[0].name}</p>
							<small>{track.album.name}</small>
							</Link>
							</div>
							);
						})
					}

					{
						this.props.tracks.length < 0 && <h1>No Results Found</h1>
					}
			</div>
		);
	}

}	

export default TrackResults;

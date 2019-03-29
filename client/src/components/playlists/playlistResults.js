import React from 'react';
import {Link} from 'react-router-dom';

class PlaylistResults extends React.Component {

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
			<h3>Playlist Results for {this.props.searchQuery}:</h3>
				{
					this.props.playlists.length > 0 && this.props.playlists.slice(0, 5).map((playlist) => {
						return (
							<div key={playlist.id} className="list-group" style={listStyle}>
							<Link to={`/song/${playlist.id}`} className="list-group-item list-group-item-action flex-column align-items-start">
							<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1"> <img src={playlist.images[0].url} style={style} alt="..." className="img-thumbnail float-left" />
							{ playlist.name }
							</h5>
							<small>Tracks: {playlist.tracks.total}</small>
							</div>
							<p className="mb-1">{playlist.owner.display_name}</p>
							<small>{playlist.type}</small>
							</Link>
							</div>
							);
						})
					}

					{
						this.props.playlists.length < 0 && <h1>No Results Found</h1>
					}
			</div>
		);
	}
}

export default PlaylistResults;
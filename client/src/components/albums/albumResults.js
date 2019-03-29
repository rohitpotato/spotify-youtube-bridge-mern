import React from 'react';
import {Link} from 'react-router-dom';

class AlbumResults extends React.Component {

	componentDidMount() {

		console.log(this.props.albums);
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
			<h3>Album Results for {this.props.searchQuery}:</h3>
				{
					this.props.albums.length > 0 && this.props.albums.slice(0, 5).map((album) => {
						return (
							<div key={album.id} className="list-group" style={listStyle}>
							<Link to={{ pathname: `/album/${album.id}`, state: album  }} className="list-group-item list-group-item-action flex-column align-items-start">
							<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1"> <img src={album.images[0].url} style={style} alt="..." className="img-thumbnail float-left" />
							{ album.name }
							</h5>
							<small>Tracks: {album.total_tracks}</small>
							</div>
							<p className="mb-1">{album.artists[0].name}</p>
							<small>{album.name}</small>
							</Link>
							</div>
							);
						})
					}

					{
						this.props.albums.length < 0 && <h1>No Results Found</h1>
					}
			</div>
		);
	}
}

export default AlbumResults;
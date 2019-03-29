import React from 'react';
import {Link} from 'react-router-dom';

class ArtistResults extends React.Component {

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
			<h3>Artist Results for {this.props.searchQuery}:</h3>
				{
					this.props.artists.length > 0 && this.props.artists.slice(0, 5).map((artist) => {
						return (
							<div key={artist.id} className="list-group" style={listStyle}>
							<Link to={`/song/${artist.id}`} className="list-group-item list-group-item-action flex-column align-items-start">
							<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1"> 
								<img src={artist.images.length > 0 ? artist.images[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ-D8yJhD9JIgfY2txmLBC2QbtogJRAngP4wyhpb7PfhyYGKDb'} style={style} alt="..." className="img-thumbnail float-left" />
							{ artist.name }
							</h5>
							<small>Spotify Followers: {artist.followers.total}</small>
							</div>
							</Link>
							</div>
							);
						})
					}

					{
						this.props.artists.length < 0 && <h1>No Results Found</h1>
					}
			</div>
		);
	}
}

export default ArtistResults;
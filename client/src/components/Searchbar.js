import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import TrackResults from './tracks/trackResults';
import AlbumResults from './albums/albumResults';
import ArtistResults from './artists/artistResults';
import PlaylistResults from './playlists/playlistResults';
import { css } from '@emotion/core';
import { ClipLoader, ScaleLoader} from 'react-spinners';
import {getNewReleases, getUserFavs} from '../actions/musicActions';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class SearchBar extends React.Component {

	constructor() {

		super();

		this.state = {

			searchData: '',
			trackResults: [],
			albumResults: [],
			artistResults: [],
			playlistResults: [],
			loading: false
		};
	}

	componentDidMount() {

		this.props.getNewReleases();
		this.props.getUserFavs();
	}

	inputHandler = (e) => {

		this.setState({ searchData: e.target.value });
	};

	searchHandler = (e) => {

		e.preventDefault();
		this.setState({ loading: true });
		const searchData = {

			search: this.state.searchData
		};

		axios.post(`/music/search`, searchData).then((res) => {
			this.setState({ trackResults: res.data.tracks.body.tracks.items, 
							albumResults:res.data.albums.body.albums.items,  
							artistResults: res.data.artists.body.artists.items,
							playlistResults: res.data.playlists.body.playlists.items,
							loading: false 
						});
			
		}).catch((e) => {
			this.setState({ loading: true });
			console.log(e);
		});
	};

	render() {

		var style = {

			margin: '5px'
		};
		let newreleasesContent;
		const {newreleases, loading} = this.props.music;
		if(newreleases === null || loading === true || newreleases === undefined) {

			newreleasesContent = <ScaleLoader
		    	css={override}
			    sizeUnit={"px"}
			    size={100}
			    color={'#123abc'}
			    loading={loading}
		    />
		} else {

			if(newreleases.length > 0) {

					newreleasesContent = newreleases.map(newRelease => (
						<a href={`/album/${newRelease.id}`} key={newRelease.id}>
						  <div className="col-sm-2">	
						    <div className="card">
						      <img src={newRelease.images[0].url} heigth="150px" width="150px" class="rounded mx-auto d-block" alt="..."/>
						    </div>
						    	<p className="blockquote-footer">{newRelease.name}</p>
						  </div>
						</a>
				))

			} else {

				newreleasesContent = <h3>Oops! Nothing Found!</h3>
			}
		}

		return (

		<div>
		  <h1>Need Music?</h1>
		  <p className="lead">Use the Spotify Something app to browse new releases and find your favorite songs<br /> Browse the site and you will discover more! </p>
		    <div className="form-group">
		    <form onSubmit={this.searchHandler}>
		      <input type="text" name="searchData" onChange={this.inputHandler} className="form-control" placeholder="Search Music..." />
		      <br />   
		      <button type="button" onClick={this.searchHandler} className="btn btn-success">Get Results</button>
		     </form>
		    </div>    

		    <ClipLoader
		    	css={override}
			    sizeUnit={"px"}
			    size={150}
			    color={'#123abc'}
			    loading={this.state.loading}
		    />
		    	{this.state.trackResults.length > 0 && <TrackResults tracks={this.state.trackResults} searchQuery={this.state.searchData}/> }
		    		<br />
		    	{this.state.albumResults.length > 0 && <AlbumResults albums={this.state.albumResults} searchQuery={this.state.searchData}/> }
		    		<br />
		    	{this.state.artistResults.length > 0 && <ArtistResults artists={this.state.artistResults} searchQuery={this.state.searchData}/> }

		    <p>New Releases:</p>
				<div className="row" >
					{newreleasesContent}
				</div>
		</div>


		);
	}
}


const mapStateToProps = state => ({
	auth: state.auth,
	music: state.music
});

export default connect(mapStateToProps, {getNewReleases, getUserFavs})(SearchBar);
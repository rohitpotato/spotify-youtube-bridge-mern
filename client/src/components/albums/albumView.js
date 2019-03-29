import React from 'react';
import {connect} from 'react-redux';
import {verify} from '../../actions/authActions';
import {Link} from 'react-router-dom';
import Navbar from '../navbar';
import Axios from 'axios';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import TrackResults from '../tracks/trackResults';
import {getAlbumTracks, getRecommendedAlbums, getAlbum} from '../../actions/musicActions';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class AlbumView extends React.Component {

	componentWillMount() {
		this.props.verify(this.props.history);
	}	

	componentDidMount() {

		this.props.getAlbum((this.props.match.params.id));
		this.props.getAlbumTracks((this.props.match.params.id));
	}

	getAlbumTracks = (e) => {
		const album = this.props.location.state;;
	};

	render() {
		const {album} = this.props.music;
		const {albumTracks, loading} = this.props.music;
		let albumTracksContent, albumContent;

		if(albumTracks === null || loading === true || albumTracks === undefined) {

			albumTracksContent = <ClipLoader
		    	css={override}
			    sizeUnit={"px"}
			    size={100}
			    color={'#123abc'}
			    loading={loading}
		    />
		} else {

			if(albumTracks.length > 0) {

					albumTracksContent = albumTracks.map(albumTrack => (
						<a href={`/song/${albumTrack.id}`} key={albumTrack.id}>
						  <div className="col-sm-2">	
						    <div className="card">
						      <img src={album.images[0].url} heigth="150px" width="150px" class="rounded mx-auto d-block" alt="..."/>
						    </div>
						    	<p className="blockquote-footer">{albumTrack.name}</p>
						  </div>
						</a>
				))

			} else {

				albumTracksContent = <h3>Oops! Nothing Found!</h3>
			}
		}

		if(album === null || loading == true || album == undefined) {

			albumContent = <ClipLoader
		    	css={override}
			    sizeUnit={"px"}
			    size={100}
			    color={'#123abc'}
			    loading={loading}
		    />
		} else {

			albumContent = (
				<div>
				<img src={album.images[0].url} heigth="150px" width="150px" class="rounded mx-auto d-block" alt="..."/>
				<br />
				<blockquote className="blockquote text-center">
				  <h4 className="text-white-50 mx-auto mb-1">{ album.name }</h4>
				  <p className="blockquote-footer">Artist: <cite title="Source Title"> {album.artists[0].name} </cite></p>
				  <p className="blockquote-footer">Total Tracks: <cite title="Source Title"> {album.total_tracks} </cite></p>
				  <br />
				  <p>
				        <a href={album.external_urls.spotify} target="_blank" className="btn btn-success btn-lg">
				          <span className="glyphicon glyphicon-play"></span>View Onsite!
				        </a>
				   </p>
				</blockquote>
			  </div>
			);
		}

		return (

			<div className="container">
				<Navbar />
				<br />
				<br />
				{albumContent}
				<p>In this Album:</p>
				<div className="row" >
					{albumTracksContent}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	music: state.music
});


export default connect(mapStateToProps, {verify, getAlbumTracks, getRecommendedAlbums, getAlbum})(AlbumView);
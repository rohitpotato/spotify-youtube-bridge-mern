import React from 'react';
import Navbar from '../navbar';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {verify} from '../../actions/authActions';
import Recommended from '../recommended/recommended';
import searchYoutube from 'youtube-api-v3-search';
import config from '../../config/config';
import Axios from 'axios';
import { getTrack } from '../../actions/musicActions';
import { css } from '@emotion/core';
import { ClipLoader, ScaleLoader } from 'react-spinners';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


class SongView extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			youtubeUrl: '',
			loading: false
		};
	} 

	componentWillMount() {
		this.props.verify(this.props.history);
	}	

	componentDidMount() {
		this.props.getTrack(this.props.match.params.id);
	}

	
	getYTLink = (e) => {
		e.preventDefault();
		this.setState({ loading: true });
		const options = {
			q: `${this.props.music.track.artists[0].name} - ${this.props.music.track.name}`,
			type: 'video'
		};
		searchYoutube(config.youtubeApi, options).then((res) => {
			var url = `https://www.youtube.com/watch?v=${res.items[0].id.videoId}`;
			this.setState({ youtubeUrl: url });
			this.setState({ loading: false });
		}).catch((e) => {
			console.log(e);
		});
	};
	render() {

		if(this.state.loading === true) {

			urlContent = <ScaleLoader
		    	css={override}
			    sizeUnit={"px"}
			    size={150}
			    color={'#123abc'}
			    loading={this.state.loading}/>
			
		} else {

			urlContent = (
				<div>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon3">Your Link:</span>
						</div>
						<input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" value={this.state.youtubeUrl} readOnly/>
					</div>
				</div>
			);
		}

		const {track, loading} = this.props.music;
		let trackContent, urlContent;
		if(track === null || loading == true) {

			trackContent = <ClipLoader
		    	css={override}
			    sizeUnit={"px"}
			    size={150}
			    color={'#123abc'}
			    loading={loading}/>
		} else {

			trackContent = (
			  <div>
				<img src={track.album.images[0].url} heigth="150px" width="150px" className="rounded mx-auto d-block" alt="..."/>
				<br />
				<blockquote className="blockquote text-center">
				  <h4 className="text-white-50 mx-auto mb-1">{ track.name }</h4>
				  <p className="blockquote-footer">Album: <cite title="Source Title"> {track.album.name} </cite></p>
				  <br />
				    <p>
				        <a href={track.preview_url} target="_blank" className="btn btn-success btn-lg">
				          <span className="glyphicon glyphicon-play"></span> Play Preview
				        </a>
				        <button onClick = {this.getYTLink} className="btn btn-danger btn-lg" style={{ margin: '10px' }}>
				          <span className="glyphicon glyphicon-play"></span>GET YT LINK
				        </button>
				     </p>
				 	{urlContent}

				 	<div>

				 	{!this.state.loading && <CopyToClipboard text={this.state.youtubeUrl}>
				 		<button className="btn btn-info">Copy to clipboard</button>
				 	</CopyToClipboard>}

				 	</div>

				</blockquote>
				<Recommended />
			  </div>
			);
		}

		return (	

			<div className="container">
				<Navbar />
				<br />
				<br />
				{trackContent}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	music: state.music
});

export default connect(mapStateToProps, {verify, getTrack, pure: false})(SongView);

// Fix rerender bug!

import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getRecommendedTracks} from '../../actions/musicActions';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


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
	marginBottom: '10px'
};

class Recommended extends React.Component {


	componentDidMount() {

		this.props.getRecommendedTracks(this.props.match.params.id);
	}		

	millisToMinAndSecs = (millis) => {
		var minutes = Math.floor(millis / 60000);
		var seconds = ((millis % 60000) / 1000).toFixed(0);
		return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
	}


	render() {

		const {tracks, loading} = this.props.music;
		let recommendedData;

		if(tracks == null || loading == true) {

			recommendedData = <ClipLoader
		    	css={override}
			    sizeUnit={"px"}
			    size={150}
			    color={'#123abc'}
			    loading={loading}
		    />

		} else { 

				if(tracks.length > 0) {

						recommendedData = tracks.slice(0, 10).map(track => (
							<div key={track.id} className="list-group" style={listStyle}>
								<a href={"/song/" + track.id} className="list-group-item list-group-item-action flex-column align-items-start">
								<div className="d-flex w-100 justify-content-between">
								<h5 className="mb-1"> <img src={track.album.images[0].url} style={style} alt="..." className="img-thumbnail float-left" />
								{ track.name }
								</h5>
								<small>{this.millisToMinAndSecs(track.duration_ms)}</small>
								</div>
								<p className="mb-1">{track.artists[0].name}</p>
								<small>{track.album.name}</small>
								</a>
							</div>
						))
				} else {

					recommendedData = <h3>No Tracks Found!</h3>
				}
			}

		return (

			<div>
				As per Your recommendations:
				{recommendedData}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	music: state.music
});

export default withRouter(connect(mapStateToProps, {getRecommendedTracks})(Recommended));
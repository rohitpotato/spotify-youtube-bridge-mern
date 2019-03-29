import React from 'react';
import Navbar from '../navbar';
import { ClipLoader, ScaleLoader } from 'react-spinners';
import { css } from '@emotion/core';
import Axios from 'axios';
import config from '../../config/config';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


class YTDownload extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			url: '',
			loading: false
		};
	}

	handleInput = (e) => {
		this.setState({ url: e.target.value });
	};

	download = (e) => {
		this.setState({loading: true});
		e.preventDefault();	
		Axios.get(`/music/download?URL=${this.state.url}`).then((res) => {
			this.setState({ loading: false });
			window.open(res.data);	
		})
	}

	render() {

		return (

			<div>
				<Navbar />
				 
				    <div className="container d-flex h-100 align-items-center">
				      <div className="mx-auto text-center">
				        <h2 className="text-white-50 mx-auto mt-0 mb-5">Youtube Downloader	</h2>
				        	<div>
							<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon3">Your Link:</span>
									</div>
									<input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" onChange={this.handleInput} />
								</div>
							</div>
							<br />
							<ScaleLoader
								css={override}
								sizeUnit={"px"}
								size={150}
								color={'#123abc'}
							loading={this.state.loading}/>
				        <a className="btn btn-info" target="_blank" href={`http://localhost:5000/music/download?URL=${this.state.url}`} download>Download Video</a>
				      </div>
				    </div>
	
			</div>
		);
	}
}

export default YTDownload;

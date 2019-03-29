import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import config from '../../config/config';

const baseUrl = 'http://localhost:5000';

class Login extends React.Component {

	constructor() {

		super();
	}

	render() {

		return (

			<div>
			   <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
			    <div className="container">
			      <a className="navbar-brand js-scroll-trigger" href="#page-top">My Git</a>
			      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
			        Menu
			        <i className="fas fa-bars" />
			      </button>
			      <div className="collapse navbar-collapse" id="navbarResponsive">
			        <ul className="navbar-nav ml-auto">
			          <li className="nav-item">
			            <a className="nav-link js-scroll-trigger" href="#about">About</a>
			          </li>
			          <li className="nav-item">
			            <a className="nav-link js-scroll-trigger" href="#projects">Projects</a>
			          </li>
			          <li className="nav-item">
			            <a className="nav-link js-scroll-trigger" href="#signup">Contact</a>
			          </li>
			        </ul>
			      </div>
			    </div>
			  </nav>

			  <header className="masthead">
			    <div className="container d-flex h-100 align-items-center">
			      <div className="mx-auto text-center">
			        <h1 className="mx-auto my-0 text-uppercase">Spotify Something</h1>
			        <h2 className="text-white-50 mx-auto mt-2 mb-5">Manage your music!</h2>
			        <a className="btn btn-primary js-scroll-trigger" href={`${config.baseUrl}/auth/spotify`} >Log in with Spotify</a>
			      </div>
			    </div>
			  </header>
			</div>

		);
	}

}

const mapStateToProps = state => ({
	auth: state.auth
});

export default Login;
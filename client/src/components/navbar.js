import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import config from '../config/config';

class Navbar extends React.Component {

	constructor() {

		super();

		this.state = {

			email: '',
			id: ''
		};
	}

	logout = (e) => {

		e.preventDefault();
		this.props.logout(this.props.history);
	}

	componentWillReceiveProps(nextProps) {

		if(nextProps != null && nextProps.auth.isAuthenticated) {

			this.setState({ 
							email: nextProps.auth.user.email, 
							id: nextProps.auth.user.id 
						});
		}
	}

	render() {

		return (

			<nav className="navbar navbar-inverse">
				<div className="container">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">Hi, {this.state.email}</a>
						<a className="navbar-brand" href="/music/download">Downloader</a>
						<a className="navbar-brand" href={`${config.baseUrl}/auth/logout`}>Logout</a>
					</div>
					<div id="navbar" className="collapse navbar-collapse">
						<ul className="nav navbar-nav">
							<li className="active"><a>Home</a></li>
							<li><a>About</a></li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Navbar));
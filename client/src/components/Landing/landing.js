import React from 'react';
import Navbar from '../navbar';
import SearchBar from '../Searchbar';
import {connect} from 'react-redux';
import Axios from 'axios';
import {verify} from '../../actions/authActions';


class Landing extends React.Component {

	constructor() {

		super();
	}

	componentDidMount() {

		this.props.verify(this.props.history);
	}	
	
	render() {	

		return (
			<div className="container">
				<Navbar />
				<SearchBar />
			</div>
		);
	}
}	

const mapStateToProps = state => ({

	auth: state.auth

});

export default connect(mapStateToProps, {verify})(Landing);
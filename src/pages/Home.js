import gitCat from '../images/githubcat.jpg';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AppContext } from '../App';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Home = () => {

	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const { setUser } = useContext(AppContext);

	const navigate = useNavigate();

	const searchUser = (e) => {
		e.preventDefault();
		setLoading(true);
		Axios.get(`https://api.github.com/users/${query}`).then(res => {
			setError(false);
			setUser(res.data);
			sessionStorage.setItem('githubUser', JSON.stringify(res.data)); // Stores the user to session storage
			setLoading(false);
			navigate('/user'); // Goes to the user page
		}).catch(err => {
			setLoading(false);
			setError(true); // Displays error message
		})
	}

	return (
		<div className="home-wrapper">
			<img src={gitCat} alt="github-cat" className="cat"/>
			<h2 className="title">Search your GitHub Profile</h2>
			<form action="" id="search-form" onSubmit={searchUser} >
				<input type="text" className="search" value={query} onChange={ (e) => setQuery(e.target.value) } />				
				<button className="search-btn">
					{loading ? <FontAwesomeIcon icon={ faSpinner } spin className='spinner' /> : 'Search'}
				</button>
			</form>	
			{ error && <p className="error-msg">Sorry, there was an error</p> }		
		</div>
	)
}

export default Home
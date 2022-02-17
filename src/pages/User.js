import './User.css';
import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import Axios from 'axios';
import Repo from '../components/Repo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const User = () => {

	const { user, setUser } = useContext(AppContext);
	const [repos, setRepos] = useState([ ]);

	useEffect(() => {
		if (user===null) {
			// Gets already stored user and repos fom session storage if it exists
			if (sessionStorage.getItem('githubUser')) {
				let storedUser = JSON.parse(sessionStorage.getItem('githubUser'));
				setUser(storedUser);
				let storedRepos = JSON.parse(sessionStorage.getItem('userRepos'));
				setRepos(storedRepos);
			}
		} else {
			Axios.get(user.repos_url).then(res => {
				setRepos(res.data);
				sessionStorage.setItem('userRepos', JSON.stringify(res.data));
			});
		}
	}, [ ])

	// formats the date to a more readable format
	const formatDate = (date) => {
		const newDate = new Date(date);
		return newDate.toDateString();
	}

	return (
		<div className="user-wrapper">
			<div className="banner">
				<div className="banner-inner">
					{ user && (
						<>
							<img src={ user.avatar_url } alt="profile-pic" className="profile-image"/>
							<div className="user-info">
								<h2 className="user-name">{ user.name }</h2>
								<p className="user-login">{ user.login }</p>
								<p className="user-joined"> <strong>Joined</strong> { formatDate(user.created_at) }</p>
								<div className="user-contact">
									{ user.email && <p className="user-email"> <FontAwesomeIcon icon={ faEnvelope } className="contact-icon" /> { user.email } </p> }
									{ user.twitter_username && <p className="user-twitter"> <FontAwesomeIcon icon={ faTwitter } className="contact-icon" /> { user.twitter_username } </p> }
									{ user.location && <p className="user-location"> <FontAwesomeIcon icon={ faMapMarkerAlt } className="contact-icon" /> { user.location } </p> }
								</div>
								{ user.bio && <p className="user-bio">{ user.bio }</p> }
								<a href={ user.html_url } target="_blank" rel="noreferrer" className="github-link"> <FontAwesomeIcon icon={ faGithub } /> Visit on GitHub</a>
							</div>
						</> )}
				</div>
				
			</div>
			<div className="body">
				<div className="body-inner">
					{ user && (
						<>
							<div className="detail-tablets">
								<div className="detail-tab"><strong>{ user.public_repos }</strong> repos</div>
								<div className="detail-tab"><strong>{ user.followers }</strong> followers</div>
								<div className="detail-tab"><strong>{ user.following }</strong> following</div>
							</div>
							<h2 className="repos-title">Repositories</h2>
							<div className="repos-container">
								{ repos.map(repo => <Repo key={ repo.id } repo={repo} />) }
							</div>
						</>
					)}
				</div>				
			</div>
		</div>
	)
}

export default User
import './Repo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faHdd, faCodeBranch, faStar } from '@fortawesome/free-solid-svg-icons';

const Repo = ({ repo }) => {

	// For shortening the repo name
	const shorten = (string) => {
		if (string.length > 12) {
			return string.slice(0, 13) + '...';
		} else {
			return string;
		}
	}

	// Converts the repo size to MB if necessary
	const formatSize = (sizeinKB) => {
		if (sizeinKB > 1024) {
			return (Math.floor((sizeinKB/1024)*100))/100 + 'MB';
		} else {
			return sizeinKB + 'KB';
		}
	}

	return (
		<div className="repo">
			<div className="repo-top">
				<div className="repo-name">
					<FontAwesomeIcon icon={faHdd} className="repo-icon" />
					<h2>{ shorten(repo.name) }</h2>
				</div>
				<a href={ repo.html_url } target="_blank" rel="noreferrer" className="github-repo-link"><FontAwesomeIcon icon={ faGithub } /></a>				
			</div>			
			<p className="desc"> { repo.description } </p>
			<div className="repo-details">
				{ repo.language && <span className="repo-language"> { repo.language } </span> }				
				<span className="repo-forks"> <FontAwesomeIcon icon={ faCodeBranch } /> { repo.forks } </span>
				<span className="repo-stars"> <FontAwesomeIcon icon={ faStar } /> { repo.stargazers_count } </span>
				<span className="repo-size"> { formatSize(repo.size) } </span>
			</div>
		</div>
	)
}

export default Repo
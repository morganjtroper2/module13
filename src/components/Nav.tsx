import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li className="nav-item">
          <Link className="nav-link" to="/">Candidate Search</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/savedCandidates">Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
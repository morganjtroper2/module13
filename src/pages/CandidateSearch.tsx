import { useEffect, useState } from 'react';
import { searchGithubUsers } from '../api/API';
import { Candidate } from '../types/Candidate';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithubUsers();
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();

    const storedCandidates = localStorage.getItem('savedCandidates');
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  if (candidates.length === 0) return <p>Loading candidates...</p>;

  const currentCandidate = candidates[currentIndex];

  const handleSaveCandidate = () => {
    const selectedCandidate = candidates[currentIndex];
    const updatedCandidates = [...savedCandidates, selectedCandidate];
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    handleNextCandidate();
  };

  const handleNextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('No more candidates available');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Candidate Search</h1>
      <img src={currentCandidate.avatar_url} alt="Candidate Avatar" style={styles.avatar} />
      <h2>{currentCandidate.name || 'No Name Provided'}</h2>
      <p><strong>Username:</strong> {currentCandidate.login}</p>
      <p><strong>Location:</strong> {currentCandidate.location || 'Unknown'}</p>
      <p><strong>Company:</strong> {currentCandidate.company || 'Not Available'}</p>
      <p><strong>Email:</strong> {currentCandidate.email || 'Not Provided'}</p>
      <p><strong>Bio:</strong> {currentCandidate.bio || 'No bio available'}</p>
      <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
        View GitHub Profile
      </a>
      <br />
      <button onClick={handleSaveCandidate} style={styles.button}>+</button>
      <button onClick={handleNextCandidate} style={styles.button}>-</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    padding: '20px',
  },
  avatar: {
    borderRadius: '50%',
    border: '2px solid #646cff',
    width: '150px',
    height: '150px',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#646cff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
  },
};

export default CandidateSearch;
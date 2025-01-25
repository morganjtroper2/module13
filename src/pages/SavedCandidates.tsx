import { useEffect, useState } from 'react';
import { Candidate } from '../types/Candidate';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  const handleSortByName = () => {
    const sorted = [...savedCandidates].sort((a, b) =>
      (a.name || '').localeCompare(b.name || '')
    );
    setSavedCandidates(sorted);
  };

  const handleFilterByCompany = (company: string) => {
    setFilterText(company);
    const filtered = savedCandidates.filter(candidate =>
      candidate.company?.toLowerCase().includes(company.toLowerCase())
    );
    setSavedCandidates(filtered);
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      <div>
        <button onClick={handleSortByName}>Sort by Name</button>
        <input
          type="text"
          placeholder="Filter by company"
          value={filterText}
          onChange={(e) => handleFilterByCompany(e.target.value)}
        />
      </div>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been saved yet.</p>
      ) : (
        <ul>
          {savedCandidates.map(candidate => (
            <li key={candidate.login}>
              <img src={candidate.avatar_url} alt={candidate.login} width={50} />
              <p>{candidate.name || candidate.login}</p>
              <p>Company: {candidate.company || 'N/A'}</p>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;
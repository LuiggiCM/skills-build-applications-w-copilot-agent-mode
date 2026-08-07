import { useEffect, useState } from 'react';
import { fetchJson, normalizeResponse } from '../lib/api';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchJson('/api/leaderboard/');
        setEntries(normalizeResponse(data));
      } catch (err) {
        setError(err.message ?? 'Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading leaderboard…</div>
      ) : (
        <div>
          {entries.length === 0 ? (
            <p>No leaderboard entries found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Type</th>
                    <th>Entity</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry._id ?? entry.id ?? JSON.stringify(entry)}>
                      <td>{entry.rank ?? '—'}</td>
                      <td>{entry.userId ? 'User' : entry.teamId ? 'Team' : 'Unknown'}</td>
                      <td>{entry.userId?.name ?? entry.teamId?.name ?? 'Unknown'}</td>
                      <td>{entry.score ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Leaderboard;

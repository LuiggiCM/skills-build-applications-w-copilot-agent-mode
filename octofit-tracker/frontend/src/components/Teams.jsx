import { useEffect, useState } from 'react';
import { fetchJson, normalizeResponse } from '../lib/api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchJson('/api/teams/');
        setTeams(normalizeResponse(data));
      } catch (err) {
        setError(err.message ?? 'Failed to load teams');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading teams…</div>
      ) : (
        <div>
          {teams.length === 0 ? (
            <p>No teams found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Members</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team._id ?? team.id ?? JSON.stringify(team)}>
                      <td>{team.name ?? 'Unnamed Team'}</td>
                      <td>{team.description ?? 'No description'}</td>
                      <td>{Array.isArray(team.members) ? team.members.length : '—'}</td>
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

export default Teams;

import { useEffect, useState } from 'react';
import { fetchJson, normalizeResponse } from '../lib/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchJson('/api/users/');
        setUsers(normalizeResponse(data));
      } catch (err) {
        setError(err.message ?? 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading users…</div>
      ) : (
        <div>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id ?? user.id ?? JSON.stringify(user)}>
                      <td>{user.name ?? 'Unknown'}</td>
                      <td>{user.email ?? 'Unknown'}</td>
                      <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</td>
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

export default Users;

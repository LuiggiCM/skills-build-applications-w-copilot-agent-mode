import { useEffect, useState } from 'react';
import { fetchJson, normalizeResponse } from '../lib/api';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchJson('/activities/');
        setActivities(normalizeResponse(data));
      } catch (err) {
        setError(err.message ?? 'Failed to load activities');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading activities…</div>
      ) : (
        <div>
          {activities.length === 0 ? (
            <p>No activities found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>User</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity._id ?? activity.id ?? JSON.stringify(activity)}>
                      <td>{activity.type ?? 'Unknown'}</td>
                      <td>{activity.duration ?? 'N/A'}</td>
                      <td>{activity.userId?.name ?? activity.userId?.email ?? 'Unknown'}</td>
                      <td>{activity.date ? new Date(activity.date).toLocaleString() : '—'}</td>
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

export default Activities;

import { useEffect, useState } from 'react';
import { fetchJson, normalizeResponse } from '../lib/api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await fetchJson('/workouts/');
        setWorkouts(normalizeResponse(data));
      } catch (err) {
        setError(err.message ?? 'Failed to load workouts');
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading workouts…</div>
      ) : (
        <div>
          {workouts.length === 0 ? (
            <p>No workouts found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Duration</th>
                    <th>User</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout) => (
                    <tr key={workout._id ?? workout.id ?? JSON.stringify(workout)}>
                      <td>{workout.name ?? 'Unnamed Workout'}</td>
                      <td>{workout.duration ?? 'N/A'}</td>
                      <td>{workout.userId?.name ?? workout.userId?.email ?? 'Unknown'}</td>
                      <td>{workout.date ? new Date(workout.date).toLocaleString() : '—'}</td>
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

export default Workouts;

import { useEffect, useState } from 'react';
import api from '../api';

type User = {
  id: string;
  name: string;
  email: string;
  status: string;
  last_login: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const load = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
      setSelected([]);
    } catch (e: any) {
      if (e.response?.status === 401 || e.response?.status === 403) {
        localStorage.removeItem('token');
        window.location.replace('/login');
      }
    }
  };

  useEffect(() => {
    load();
  }, []);
  const action = async (url: string) => {
    try {
      await api.post(url, { ids: selected });
      load();
    } catch (e: any) {
      if (e.response?.status === 401 || e.response?.status === 403) {
        localStorage.removeItem('token');
        window.location.replace('/login');
      }
    }
  };

  if (users === null) {
    return null;
  }

  return (
    <div className="container mt-4">
      <h3>User Management</h3>

      <div className="btn-toolbar mb-2">
        <button className="btn btn-danger me-2"
          disabled={!selected.length}
          onClick={() => action('/users/block')}>
          Block
        </button>

        <button className="btn btn-outline-success me-2"
          disabled={!selected.length}
          onClick={() => action('/users/unblock')}>
          Unblock
        </button>

        <button className="btn btn-outline-danger me-2"
          disabled={!selected.length}
          onClick={() => action('/users/delete')}>
          Delete
        </button>

        <button className="btn btn-outline-secondary"
          onClick={() => api.post('/users/delete-unverified').then(load)}>
          Delete unverified
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selected.length === users.length && users.length > 0}
                onChange={e =>
                  setSelected(e.target.checked ? users.map(u => u.id) : [])
                }
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Last login</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(u.id)}
                  onChange={e =>
                    setSelected(
                      e.target.checked
                        ? [...selected, u.id]
                        : selected.filter(id => id !== u.id)
                    )
                  }
                />
              </td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.last_login || '-'}</td>
              <td>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

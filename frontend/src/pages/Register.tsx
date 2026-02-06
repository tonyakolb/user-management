import { useState } from 'react';
import api from '../api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    await api.post('/auth/register', { name, email, password });
    window.location.href = '/login';
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3>Register</h3>

      <input className="form-control mb-2"
        placeholder="Name"
        onChange={e => setName(e.target.value)}
      />

      <input className="form-control mb-2"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input className="form-control mb-3"
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button className="btn btn-success w-100" onClick={submit}>
        Register
      </button>
    </div>
  );
}

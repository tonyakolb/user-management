import { useState } from 'react';
import api from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    window.location.href = '/users';
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3>Login</h3>

      <input className="form-control mb-2"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input className="form-control mb-3"
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button className="btn btn-primary w-100" onClick={submit}>
        Login
      </button>
    </div>
  );
}

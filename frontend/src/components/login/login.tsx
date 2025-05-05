import { useState } from 'react';
import './login.css';
import url from '../../url';
import Tittle from '../tittle/tittle';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
    
        console.log('Email:', email);
        console.log('Password:', password);
    
        try {
            const response = await fetch(url + '/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.status === 200) {
              const data = await response.json();
              console.log('Login successful:', data);
            } else {
              console.log('Login failed');
            }
        } catch (error) {
          console.log('Error during login:', error);
        }
    };

    return (
      <>
        <Tittle page="Login"/>
        <div className="login-container">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </>
      );
}

export default Login;
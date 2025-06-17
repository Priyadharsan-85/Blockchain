import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage("All fields are mandatory");
      return;
    }
    // Simulate successful login
    alert("Logged in successfully");
    window.location.href = '/billmanagement'; // Redirect to Bill Management page
    onLogin(); // Call the onLogin function passed as a prop
  };

  return (
    <div style={styles.container}>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3 style={styles.title}>Login Here</h3>
        
        <label style={styles.label}>Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button}>Log In</button>
        {message && <p style={styles.message}>{message}</p>}
        <div className="social" style={styles.social}>
          <div style={styles.socialButton}><i className="fab fa-google"></i> Google</div>
          <div style={styles.socialButton}><i className="fab fa-facebook"></i> Facebook</div>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
    color: '#333',
    textAlign: 'center',
  },
  form: {
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderRadius: '10px',
    padding: '50px 35px',
    boxShadow: '0 0 40px rgba(8,7,16,0.6)',
  },
  title: {
    fontSize: '32px',
    fontWeight: '500',
  },
  label: {
    display: 'block',
    marginTop: '30px',
    fontSize: '16px',
    fontWeight: '500',
  },
  input: {
    display: 'block',
    height: '50px',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: '3px',
    padding: '0 10px',
    marginTop: '8px',
    fontSize: '14px',
    fontWeight: '300',
  },
  button: {
    marginTop: '50px',
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#080710',
    padding: '15px 0',
    fontSize: '18px',
    fontWeight: '600',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    color: 'red',
  },
  social: {
    marginTop: '30px',
    display: 'flex',
  },
  socialButton: {
    background: 'rgba(255,255,255,0.27)',
    borderRadius: '3px',
    padding: '5px 10px',
    color: '#eaf0fb',
    textAlign: 'center',
    margin: '0 5px',
  },
};

export default LoginPage;

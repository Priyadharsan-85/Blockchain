import React from 'react';

function LandingPage({ login }) {
  const landingPageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8', // Light background color
    color: '#333', // Dark text color
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '2.5em',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif', // Use a modern font
  };

  const descriptionStyle = {
    fontSize: '1.2em',
    marginBottom: '30px',
  };

  const buttonStyle = {
    padding: '15px 30px',
    fontSize: '1.5em',
    color: 'white',
    backgroundColor: '#007bff', // Bootstrap primary color
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3', // Darker shade on hover
  };

  return (
    <div style={landingPageStyle}>
      <h1 style={titleStyle}>Welcome to the Decentralized Bill Splitter</h1>
      <p style={descriptionStyle}>Please sign in to use the app</p>
      <button 
        style={buttonStyle} 
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
        onClick={login}
      >
        Sign In
      </button>
    </div>
  );
}

export default LandingPage;
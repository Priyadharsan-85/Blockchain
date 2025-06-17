import React, { useState } from 'react';
import "./BillManagement.css";
function BillManagement({ handleCreateBill, handlePayBill, message }) {
  const [totalAmount, setTotalAmount] = useState('');
  const [participants, setParticipants] = useState('');
  const [user, setUser] = useState('');
  const [status, setStatus] = useState('');
  const [billCreated, setBillCreated] = useState(false);
  const [paymentMade, setPaymentMade] = useState(false);

  const handleSubmitBill = async () => {
    if (!totalAmount || !participants) {
      alert("Please enter both total amount and participants.");
      return;
    }

    const amount = Number(totalAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Total amount must be a positive number.");
      return;
    }

    handleCreateBill(amount, participants.split(',').map(p => p.trim()));
    setTotalAmount('');
    setParticipants('');
    setBillCreated(true); // Mark bill as created
  };

  const handleSubmitPayment = () => {
    if (!user) {
      alert("Please enter your name.");
      return;
    }

    handlePayBill(user);
    setUser('');
    setPaymentMade(true); // Mark payment as made
  };

  const checkStatus = () => {
    if (billCreated && paymentMade) {
      setStatus("Status checked");
    } else {
      setStatus("Status unclear");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Bill Management</h2>
      <div style={styles.box}>
        <h4>Create a Bill</h4>
        <input
          type="number"
          placeholder="Total Amount"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Participants (comma separated)"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSubmitBill} style={styles.button}>Create Bill</button>
      </div>
      <div style={styles.box}>
        <h4>Pay Bill</h4>
        <input
          type="text"
          placeholder="Your Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSubmitPayment} style={styles.button}>Pay Bill</button>
      </div>
      <div style={styles.box}>
        <h4>Check Status</h4>
        <button onClick={checkStatus} style={styles.button}>Check Status</button>
        {status && <p>{status}</p>}
      </div>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '20px',
  },
  box: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    width: '90%',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  message: {
    marginTop: '10px',
    color: 'red',
  },
  message: {
    marginTop: '10px',
    color: 'red',
    backgroundColor: 'black', // Set background color to black
  },
};

export default BillManagement;


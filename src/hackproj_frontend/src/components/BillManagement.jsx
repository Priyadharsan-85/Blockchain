import React, { useState } from 'react';

function BillManagement({message, backActor }) { 
  const [totalAmount, setTotalAmount] = useState('');
  const [participants, setParticipants] = useState('');
  const [user, setUser] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [walletBalance, setWalletBalance] = useState(0); // Wallet balance state
  const [receiver, setReceiver] = useState(''); // Receiver's address
  const [billMessage, setBillMessage] = useState(''); // Message for bill creation
  const [paymentMessage, setPaymentMessage] = useState(''); // Message for payment
  const [statusMessage, setStatusMessage] = useState(''); // Message for status updates

  const handleSubmitBill = () => {
    if (!totalAmount || !participants) {
      setBillMessage("Please enter both total amount and participants.");
      return;
    }

    const amount = Number(totalAmount);
    if (isNaN(amount) || amount <= 0) {
      setBillMessage("Total amount must be a positive number.");
      return;
    }

    let billResp = backActor.create_bill(amount, participants.split(',').map(p => p.trim()));
    console.log(billResp);

    
    setTotalAmount('');
    setParticipants('');
    setBillMessage("Bill created successfully!"); // Success message
  };

  const handleSubmitPayment = () => {
    if (!user || !paymentAmount || !receiver) {
      setPaymentMessage("Please enter your name, payment amount, and the receiver's address.");
      return;
    }
    let paymentResp = backActor.pay_bill(user, Number(paymentAmount), receiver);
    console.log(paymentResp);

    const amount = Number(paymentAmount);
    if (amount > walletBalance) {
      setPaymentMessage("Insufficient wallet balance. Please top up your wallet.");
      return;
    }

    
    setWalletBalance(walletBalance - amount); // Deduct from wallet
    setUser('');
    setPaymentAmount(''); // Clear payment amount
    setReceiver(''); // Clear receiver input
    setPaymentMessage("Payment successful!"); // Success message
  };

  const handleTopUp = () => {
    const topUpAmount = prompt("How much do you want to top up?");
    const amount = Number(topUpAmount);
    if (isNaN(amount) || amount <= 0) {
      setBillMessage("Please enter a valid amount.");
      return;
    }
    setWalletBalance(walletBalance + amount); // Add to wallet balance
    setBillMessage(`Wallet topped up! New balance: ${walletBalance + amount}`); // Success message
  };

  const checkStatus = () => {
    if (walletBalance > 0) {
      setStatusMessage("Wallet balance is sufficient.");
    } else {
      setStatusMessage("Wallet balance is empty.");
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
        {billMessage && (
          <p style={{ color: billMessage.includes("Error") ? 'red' : 'green' }}>{billMessage}</p>
        )}
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
        <input
          type="number"
          placeholder="Payment Amount"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Receiver's Address"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSubmitPayment} style={styles.button}>Pay Bill</button>
        {paymentMessage && (
          <p style={{ color: paymentMessage.includes("Error") ? 'red' : 'green' }}>{paymentMessage}</p>
        )}
      </div>
      <div style={styles.box}>
        <h4>Check Status</h4>
        <button onClick={checkStatus} style={styles.button}>Check Status</button>
        {statusMessage && (
          <p style={{ color: statusMessage.includes("Error") ? 'red' : 'green' }}>{statusMessage}</p>
        )}
      </div>
      <div style={styles.box}>
        <h4>Wallet</h4>
        <p>Current Balance: {walletBalance} tokens</p>
        <button onClick={handleTopUp} style={styles.button}>Top Up Wallet</button>
      </div>
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
};

export default BillManagement;
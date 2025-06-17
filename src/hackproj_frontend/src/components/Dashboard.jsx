import React from 'react';

function Dashboard({ totalAmount, setTotalAmount, participants, setParticipants, user, setUser, status, handleCreateBill, handlePayBill, handleCheckStatus, message }) {
  return (
    <div style={{ padding: "50px", maxWidth: "500px", margin: "auto", paddingTop:"100px"}}>
      <h2>Decentralized Bill Splitter</h2>

      <div>
        <h4>Create Bill</h4>
        <input
          type="number"
          placeholder="Total Amount"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Participants (comma separated)"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />
        <button onClick={handleCreateBill}>Create Bill</button>
      </div>

      <div>
        <h4>Pay Bill</h4>
        <input
          type="text"
          placeholder="Your Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <button onClick={handlePayBill}>Pay</button>
      </div>

      <div>
        <h4>Check Status</h4>
        <button onClick={handleCheckStatus}>Check</button>
        <p>{status}</p>
      </div>

      {message && <p><strong>{message}</strong></p>}
    </div>
  );
}

export default Dashboard;
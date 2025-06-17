import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../declarations/hackproj_backend";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import BillManagement from "./components/BillManagement";
import Navbar from "./components/navbar";
// import { useState } from "react";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [backActor, setBackActor] = useState(null);

  // const nav = useNavi?gate();

  const checkAuth = () => {
    return isAuthenticated;
  };

  async function login() {
    
    try {
      const authClient = await AuthClient.create();

      await authClient.login({
        identityProvider: process.env.DFX_NETWORK === "ic" ? "https://identity.ic0.app" : "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943",
        onSuccess: () => {
          let backendActor = createActor(process.env.CANISTER_ID_HACKPROJ_BACKEND, {
            actorOptions: {
              identity: authClient.getIdentity(),
            }
          });
          setBackActor(backendActor);
          setIsAuthenticated(true); // Update authentication state
        },
        onError: (error) => {
          console.log(error);
        },
        onNoIdentityFound: () => {
          console.log("No identity found");
        },
      });

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Router>
      <Navbar login={login}/>
      <Routes>
        
        <Route path="/" element={checkAuth() ? <BillManagement backActor={backActor}  /> : <LandingPage login={login} />} />
        <Route path="/login" element={checkAuth() ? <LandingPage login={login} /> : <Navigate to="/billmanagement" /> } />
      </Routes>
    </Router>
  );
}

export default App;
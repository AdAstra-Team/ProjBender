import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation, Dashboard, DesksPage, TaskPage, TasksPage, TaskCreatePage, ProjectsPage, CalendarPage } from './Pages';
import { Profile, TaskCard, TaskCardList, TaskCardWithNodata, SignOut } from './Components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, clearAuth } from './Features/Auth/authSlice';
import { useKeycloak } from "@react-keycloak/web";
import { getTokenFromCookies } from "./Services/KeyCloak";



function App() {
  
  const { keycloak } = useKeycloak();
  const dispatch = useDispatch();
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  useEffect(() => {
    if (!keycloak.authenticated) {
      token = getTokenFromCookies();
      if (token != ""){
        keycloak.token = token;
        keycloak.authenticated = true;
      }

      dispatch(clearAuth());
    } 
    else {
      const token = keycloak.token;
      const user = keycloak.tokenParsed;
      document.cookie = `keycloakToken=${token}; path=/; max-age=${keycloak.tokenParsed.exp - keycloak.tokenParsed.iat}; secure`;
      
      dispatch(setAuth({ token, user }));
      console.log("User authenticated and token is set in cookies");
    }
    setKeycloakInitialized(true);
  }, [keycloak]);

  if (!keycloakInitialized) {
    return <div>Loading...Loading...Loading...Loading...Loading...Loading...Loading...Loading...Loading...Loading...Loading...Loading...Loading...Loading...Loading...Loading...</div>;
  }

  return (    
    <div className="App">
      <Router>
        <Navigation/>
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/boards" element={<DesksPage />} />
              <Route path="/tasks" element={<TaskCardList />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/CreateTask" element={<TaskCreatePage />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/JustSimpleTaskDemo" element={<TaskCardWithNodata />} />
              <Route path="/SignOut" element={<SignOut/>} />
              {/* <Route path="/Task{id}" element={<TaskCard />} /> */}
          </Routes>
      </Router>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation, Dashboard, DesksPage, TaskPage, TasksPage, TaskCreatePage, ProjectsPage, CalendarPage } from './Pages';
import { Profile, TaskCard, TaskCardList, TaskCardWithNodata, SignOut } from './Components';
import React, { useEffect, useState } from 'react';
import keycloak from './Services/KeyCloak';
import { useDispatch } from 'react-redux';
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import { setAuth, clearAuth } from './Features/Auth/authSlice';



function App() {
  const dispatch = useDispatch();
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  useEffect(() => {
    if (!keycloak.authenticated) {

      // Perform login or other actions, but do not re-initialize Keycloak
        const token = keycloak.token;
        const user = keycloak.tokenParsed;
        
        dispatch(setAuth({ token, user }));
      } else {
        dispatch(clearAuth());
      }
      setKeycloakInitialized(true);
    }, [keycloak]);

  if (!keycloakInitialized || keycloak == null) {
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

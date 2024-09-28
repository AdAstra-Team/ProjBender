import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation, Dashboard, DesksPage, TaskPage, TasksPage, TaskCreatePage, ProjectsPage, CalendarPage } from './Pages';
import { TaskCard, TaskCardList, TaskCardWithNodata } from './Components';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import keycloak from './Services/KeyCloak';
import { setAuth, clearAuth } from './Features/Auth/authSlice';


function App() {
  const dispatch = useDispatch();
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
      if (authenticated) {
        const token = keycloak.token;
        const user = keycloak.tokenParsed;
        
        dispatch(setAuth({ token, user }));
      } else {
        dispatch(clearAuth());
      }
      setKeycloakInitialized(true);
    });
  }, [dispatch]);

  if (!keycloakInitialized) {
    return <div>Loading...</div>;
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
                <Route path="/JustSimpleTaskDemo" element={<TaskCardWithNodata />} />
                {/* <Route path="/Task{id}" element={<TaskCard />} /> */}
            </Routes>
        </Router>
    </div>
  );
}

export default App;

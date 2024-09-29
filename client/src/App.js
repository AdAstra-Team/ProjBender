import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, redirect } from 'react-router-dom';
import { Navigation, Dashboard, DesksPage, TaskPage, TasksPage, TaskCreatePage, ProjectsPage, CalendarPage } from './Pages';
import { Profile, TaskCard, TaskCardList, TaskCardWithNodata, SignOut, Login } from './Components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, clearAuth } from './Features/Auth/authSlice';
// import { useKeycloak } from "@react-keycloak/web";
import { getTokenFromCookies } from "./Services/KeyCloak";
import { Navigate } from 'react-router-dom';



function App() {
  
  // const { keycloak } = useKeycloak();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const auth = useSelector((state) => state.auth);
  const state = useSelector((state) => state);

  return (    
    <div className="App">
      <Router>
        <Navigation/>
              {!auth.isAuthenticated ?
                <Navigate to="/Login" />:
                ""
              }
            <Routes>
              <Route path="/Login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/boards" element={<DesksPage />} />
              {/* <Route path="/tasks" element={<TaskCardList />} /> */}
              <Route path="/tasks" element={<TaskPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/CreateTask" element={<TaskCreatePage />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/JustSimpleTaskDemo" element={<TaskCardWithNodata />} />
              <Route path="/SignOut" element={<SignOut/>} />
              <Route path="/Login" element={<Login/>} />
              {/* <Route path="/Task{id}" element={<TaskCard />} /> */}
          </Routes>
      </Router>
    </div>
  );
}

export default App;

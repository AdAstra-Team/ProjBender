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
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  // useEffect(() => {
  //   if (!keycloak.authenticated) {
  //     var token = getTokenFromCookies();
  //     if (token != "" && token != null){
  //       keycloak.token = token;
  //       keycloak.authenticated = true;
  //     }

  //     dispatch(clearAuth());
  //   } 
  //   else {
  //     const token = keycloak.token;
  //     const user = keycloak.tokenParsed;
  //     if (user != null | user != ""){
  //       document.cookie = `keycloakToken=${token}; path=/; max-age=${user.exp - user.iat}; secure`;
  //     }
      
  //     dispatch(setAuth({ token, user }));
  //     console.log("User authenticated and token is set in cookies");
  //   }
  //   setKeycloakInitialized(true);
  // }, [keycloak]);

  if (!isAuthenticated || isAuthenticated == null || isAuthenticated == undefined) 
  {
    return (
      <Router>
          <Routes>
              <Route path="/Login" element={<Login/>} />
          </Routes>
          <Navigate to="/login" />
      </Router>
    );
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
              <Route path="/Login" element={<Login/>} />
              {/* <Route path="/Task{id}" element={<TaskCard />} /> */}
          </Routes>
      </Router>
    </div>
  );
}

export default App;

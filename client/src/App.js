import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation, Dashboard, DesksPage, TasksPage, TaskCreatePage, ProjectsPage } from './Pages';


function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* </header> */}

      <Router>
        <Navigation/>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/boards" element={<DesksPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/calendar" element={<TasksPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/CreateTask" element={<TaskCreatePage />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation, Dashboard, DesksPage, TaskPage, TasksPage, TaskCreatePage, ProjectsPage, CalendarPage } from './Pages';
import { TaskCard, TaskCardList, TaskCardWithNodata } from './Components';
import { Provider } from 'react-redux';
import { store } from './app/Store';


function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* </header> */}

      <Provider store={store}>
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
        </Provider>
    </div>
  );
}

export default App;

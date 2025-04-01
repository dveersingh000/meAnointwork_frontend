import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ViewDetails from './pages/ViewDetails';
import ChangePassword from './pages/ChangePassword';
import StartWork from './pages/StartWork';
import NotFound from './pages/NotFound';
import TaskEditor from './pages/TaskEditor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/start-work/:id" element={<TaskEditor />} />
          <Route path="view-details" element={<ViewDetails />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="start-work" element={<StartWork />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

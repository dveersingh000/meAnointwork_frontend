import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ViewDetails from './pages/ViewDetails';
import ChangePassword from './pages/ChangePassword';
import StartWork from './pages/StartWork';
import NotFound from './pages/NotFound';
import TaskEditor from './pages/TaskEditor';

// Admin panel pages
import AdminLayout from './admin/AdminLayout.';
import AdminDashboard from './admin/pages/AdminDashboard.';
import AdminUsers from './admin/pages/AdminUsers.';
import CreateUser from './admin/pages/CreateUser';
import AdminPayments from './admin/pages/AdminPayments';
import AdminWorkAssignments from './admin/pages/AdminWorkAssignments';
import AdminTasks from './admin/pages/AdminTasks';
import AdminSettings from './admin/pages/AdminSettings';

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

         {/* Admin Panel */}
         <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="/admin/create-user" element={<CreateUser />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="work-assignments" element={<AdminWorkAssignments />} />
          <Route path="tasks" element={<AdminTasks />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { AppLayout } from './components/layout/AppLayout';
import { AuthPage } from './pages/AuthPage';
import { HomeFeed } from './pages/HomeFeed';
import { Specialists } from './pages/Specialists';
import { Education } from './pages/Education';
import { AIAssistant } from './pages/AIAssistant';
import { Fellowships } from './pages/Fellowships';
import { Appointments } from './pages/Appointments';
import { Settings } from './pages/Settings';
import { CounselorLayout } from './components/layout/CounselorLayout';
import { CounselorDashboard } from './pages/counselor/CounselorDashboard';
import { CasesPool } from './pages/counselor/CasesPool';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {user?.role === 'counselor' ? (
          <Route path="/" element={<CounselorLayout />}>
            <Route index element={<Navigate to="/counselor" replace />} />
            <Route path="counselor" element={<CounselorDashboard />} />
            <Route path="counselor/pool" element={<CasesPool />} />
            <Route path="*" element={<Navigate to="/counselor" replace />} />
          </Route>
        ) : (
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomeFeed />} />
            <Route path="specialists" element={<Specialists />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="settings" element={<Settings />} />
            <Route path="education" element={<Education />} />
            <Route path="ai" element={<AIAssistant />} />
            <Route path="fellowships" element={<Fellowships />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

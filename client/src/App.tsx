import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AnalyzePage } from './pages/AnalyzePage';
import { LearnPage } from './pages/LearnPage';
import { LearnDetailPage } from './pages/LearnDetailPage';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { HistoryDetailPage } from './pages/HistoryDetailPage';
import { AboutPage } from './pages/AboutPage';
import { SettingsPage } from './pages/SettingsPage';

import { DashboardLayout } from './components/layout/DashboardLayout';
import { PremiumBackground } from './components/ui/PremiumBackground';
import { LanguageProvider } from './i18n';

const AppDashboardLayout = () => (
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
);

function App() {
  return (
    <LanguageProvider>
      <Router>
        <PremiumBackground />
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<HomePage />} />

          {/* Dashboard / App Pages */}
          <Route element={<AppDashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/:id" element={<LearnDetailPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/history/:id" element={<HistoryDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AnalyzePage } from './pages/AnalyzePage';
import { LearnPage } from './pages/LearnPage';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { HistoryDetailPage } from './pages/HistoryDetailPage';
import { Header, Footer } from './components/layout';
import { DashboardLayout } from './components/layout/DashboardLayout';

const PublicLayout = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
    <Header />
    <main className="flex-grow flex flex-col">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const AppDashboardLayout = () => (
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Dashboard / App Pages */}
        <Route element={<AppDashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/:id" element={<HistoryDetailPage />} />
          <Route path="/about" element={<div className="flex flex-col items-center justify-center p-20 text-center"><div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4"><span className="text-2xl">ℹ️</span></div><h2 className="text-xl font-bold text-gray-900 mb-2">About InvestorShield AI</h2><p className="text-gray-500">Smarter Analysis. Safer Investments.</p></div>} />
          <Route path="/settings" element={<div className="flex flex-col items-center justify-center p-20 text-center"><div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4"><span className="text-2xl">⚙️</span></div><h2 className="text-xl font-bold text-gray-900 mb-2">Settings coming soon</h2><p className="text-gray-500">Manage your preferences.</p></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

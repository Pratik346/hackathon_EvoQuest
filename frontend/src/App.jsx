import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { GameProvider } from "./context/GameContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PageLayout from "./components/layout/PageLayout";
import LoadingSpinner from "./components/common/LoadingSpinner";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const QuestsPage = lazy(() => import("./pages/QuestsPage"));
const CharacterPage = lazy(() => import("./pages/CharacterPage"));
const AchievementsPage = lazy(() => import("./pages/AchievementsPage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const InventoryPage = lazy(() => import("./pages/InventoryPage"));
const ActivityPage = lazy(() => import("./pages/ActivityPage"));
const AIAdvisorPage = lazy(() => import("./pages/AIAdvisorPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GameProvider>
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route
                element={
                  <ProtectedRoute>
                    <PageLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/quests" element={<QuestsPage />} />
                <Route path="/character" element={<CharacterPage />} />
                <Route path="/achievements" element={<AchievementsPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/activity" element={<ActivityPage />} />
                <Route path="/ai-advisor" element={<AIAdvisorPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </GameProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
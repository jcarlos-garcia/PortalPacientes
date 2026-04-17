import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import { useMsal, useIsAuthenticated } from "@azure/msal-react";

// páginas
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import ProfilePage from "./pages/ProfilePage";
import QuestionnairesPage from "./pages/QuestionnairesPage";
import NutritionQuestionnaire from "./pages/questionnaires/NutritionQuestionnaire";
import PhysicalActivityQuestionnaire from "./pages/questionnaires/PhysicalActivityQuestionnaire";
import TobaccoQuestionnaire from "./pages/questionnaires/TobaccoQuestionnaire";
import AlcoholQuestionnaire  from "./pages/questionnaires/AlcoholQuestionnaire";
import SleepQuestionnaire from "./pages/questionnaires/SleepQuestionnaire";
import FamilyHistoryQuestionnaire from "./pages/questionnaires/FamilyHistoryQuestionnaire";
import StressQuestionnaire from "./pages/questionnaires/StressQuestionnaire";
import GeneralHealthQuestionnaire from "./pages/questionnaires/GeneralHealthQuestionnaire";
import ChatbotPage from "./pages/ChatbotPage";

function ProtectedRoute({ children }) {
  const { inProgress, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  if (inProgress !== "none") {
    return <div>Autenticando...</div>;
  }

  const isLogged = isAuthenticated && accounts?.length > 0;

  if (!isLogged) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  // const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  // useEffect(() => {
  //   instance.handleRedirectPromise()
  //     .then((response) => {
  //       let accountToUse = response?.account || instance.getActiveAccount();

  //       if (!accountToUse) {
  //         const allAccounts = instance.getAllAccounts();
  //         if (allAccounts.length > 0) {
  //           accountToUse = allAccounts[0];
  //         }
  //       }

  //       if (accountToUse) {
  //         instance.setActiveAccount(accountToUse);
  //       }

  //       if (accountToUse && location.pathname === "/") {
  //         navigate("/dashboard/profile", { replace: true });
  //       }
  //     })
  //     .catch((err) => console.error("Redirect login error:", err));
  // }, [instance, location.pathname, navigate]);

  useEffect(() => {
    if (isAuthenticated && location.pathname === "/") {
      navigate("/dashboard/profile", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          !isAuthenticated ? (
            <LoginPage />
          ) : (
            <Navigate to="/dashboard/profile" replace />
          )
        }
      />

      {/* Rutas internas de las páginas */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="questionnaires" element={<QuestionnairesPage />} />
        <Route path="questionnaires/nutrition" element={<NutritionQuestionnaire />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/dashboard/questionnaires" element={<QuestionnairesPage />} />
        <Route path="/dashboard/questionnaires/nutrition" element={<NutritionQuestionnaire />} />
        <Route path="/dashboard/questionnaires/physical-activity" element={<PhysicalActivityQuestionnaire />} />
        <Route path="/dashboard/questionnaires/tobacco" element={<TobaccoQuestionnaire />} />
        <Route path="/dashboard/questionnaires/alcohol" element={<AlcoholQuestionnaire />} />
        <Route path="/dashboard/questionnaires/sleep" element={<SleepQuestionnaire />} />
        <Route path="/dashboard/questionnaires/family-history" element={<FamilyHistoryQuestionnaire />} />
        <Route path="/dashboard/questionnaires/stress" element={<StressQuestionnaire />} />
        <Route path="/dashboard/questionnaires/general-health" element={<GeneralHealthQuestionnaire />} />
        <Route path="/dashboard/chatbot" element={<ChatbotPage />} />
        <Route path="chatbot" element={<ChatbotPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
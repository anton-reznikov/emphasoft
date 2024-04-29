import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/shared/Header/Header";
import Footer from "./components/shared/Footer/Footer";

import LoginPage from "./pages/public/LoginPage";
import HomePage from "./pages/public/HomePage";
import UsersPage from "./pages/protected/UsersPage";
import ProtectedRoute from "./components/shared/ProtectedRoute/ProtectedRoute";

import EditUserPage from "./pages/protected/EditUserPage";
import CreateUserPage from "./pages/protected/CreateUserPage";
import NotFound from "./pages/public/NotFound";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className="wrapper">
              <Header />
              <Outlet />
              <Footer />
            </div>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="users" element={<Outlet />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path=":userId/edit"
              element={
                <ProtectedRoute>
                  <EditUserPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <CreateUserPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

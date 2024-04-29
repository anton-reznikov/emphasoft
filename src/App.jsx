import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/shared/Header/Header";
import Footer from "./components/shared/Footer/Footer";

import LoginPage from "./pages/public/LoginPage";
import HomePage from "./pages/public/HomePage";
import UsersPage from "./pages/protected/UsersPage";

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
            <Route index element={<UsersPage />} />
            <Route path=":userId/edit" element={<EditUserPage />} />

            <Route path="create" element={<CreateUserPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

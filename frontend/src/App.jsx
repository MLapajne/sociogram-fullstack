import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import UserForm from "./pages/UserForm";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { formUrl, reset } from "./features/urls/formUrlsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import CheckForm from "./pages/CheckForm";
import { fetchSociograms } from "./features/urls/formPeopleSlice";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.formPeople);

  useEffect(() => {
    dispatch(reset());
    dispatch(fetchSociograms());
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/tableform" element={<CheckForm />} />

        {formData &&
          formData.sociograms &&
          formData.sociograms.map((sociogram) =>
            sociogram.users.map((usr) => (
              <Route
                key={usr.id}
                path={`/user_form/${usr.id}-${sociogram.id}`}
                element={<CheckForm mainUser={usr} formData={sociogram}  />}
              />
            ))
          )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

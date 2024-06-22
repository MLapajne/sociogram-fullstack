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
  const urls = useAppSelector((state) => state.urls);

  useEffect(() => {
    dispatch(formUrl());
  }, []);

  return (
    <BrowserRouter>
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
        <Route path="/user_form/:random_value" element={<UserForm />} />
        {console.log(urls)}
        {urls &&
          urls.formUrls.map((url) => (
            <Route
              key={url}
              path={`/user_form/${url}`}
              element={<UserForm />}
            />
          ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

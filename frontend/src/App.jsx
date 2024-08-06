import React, { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import CheckForm from "./pages/CheckForm";
import { fetchSociograms } from "./features/urls/formPeopleSlice";
import { SubmitDataContext } from "./context/SubmitDataContext";
import { LanguageDataContext } from "./context/LanguageDataContext";
import { reset } from "./features/urls/formPeopleSlice";
import ThankYou from "./pages/ThankYou";

function App() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.formPeople);

  const { languageData, setLanguageData } = useContext(LanguageDataContext);
  const { dataContext, setDataContext } = useContext(SubmitDataContext);

  const language =
    formData.sociograms && formData.sociograms.length > 0
      ? formData.sociograms[0].language
      : "en";

  useEffect(() => {
    dispatch(reset());
    dispatch(fetchSociograms());
    setLanguageData(language);
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/thank-you" element={<ThankYou />} />
        {formData &&
          formData.sociograms &&
          formData.sociograms.map((sociogram) =>
            sociogram.users
              .filter((usr) => !dataContext.includes(usr.id))
              .map((usr) => (
                <Route
                  key={usr.id}
                  path={`/user_form/${usr.id}-${sociogram.id}`}
                  element={<CheckForm mainUser={usr} formData={sociogram} />}
                />
              ))
          )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

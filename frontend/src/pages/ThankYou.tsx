import React, { useContext, useEffect, useState } from "react";
import { getTranslations } from "@/helpers/translations";
import { LanguageDataContext } from "@/context/LanguageDataContext";

const ThankYou: React.FC = () => {
  const { languageData, setLanguageData } = useContext(LanguageDataContext);
  const [translations, setTranslations] = useState(
    getTranslations(languageData)
  );

  useEffect(() => {
    const newTranslations = getTranslations(languageData);
    setTranslations(newTranslations);
  }, [languageData]);
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <p>{translations.successMessage}</p>
    </div>
  );
};

export default ThankYou;

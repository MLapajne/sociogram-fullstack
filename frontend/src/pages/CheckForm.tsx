import React, { useContext, useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import questionsComponent from "@/components/questionsAndAnswers";
import { getTranslations } from "../helpers/translations";
import { LanguageDataContext } from "@/context/LanguageDataContext";

interface UserPageProps {
  mainUser: any; // Assuming 'any' type for simplicity, consider specifying a more detailed type or interface
  formData: any;
}

export default function UserConfirmationPage({
  mainUser,
  formData,
}: UserPageProps) {
  const dispatch = useAppDispatch();
  //const projectState = useAppSelector((state) => state.formPeople);
  //const formUlsState = useAppSelector((state) => state.formUrls);
  const { languageData, setLanguageData } = useContext(LanguageDataContext);

  const [translations, setTranslations] = useState(
    getTranslations(languageData)
  );

  useEffect(() => {
    const newTranslations = getTranslations(languageData);
    setTranslations(newTranslations);
  }, [languageData]);

  return (
    <div className="md:grid  md:grid-cols-6 gap-4">
      <div className="container mx-auto col-start-2 col-span-4">
        <h1 className="flex text-xl font-semibold mb-2 justify-center pb-6">
          {translations.welcomeText}{" "}
          {mainUser.firstName + " " + mainUser.lastName}
        </h1>
        <p className="mb-10">{translations.answerText}</p>
        {formData &&
          (questionsComponent({
            sociogramId: formData.id,
            posQuestions: formData.posQuestions,
            negQuestions: formData.negQuestions,
            users: formData.users,
            mainUser: mainUser,
          }) as any)}
      </div>
    </div>
  );
}

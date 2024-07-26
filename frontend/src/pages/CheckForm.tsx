import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming Button component exists
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toast } from "react-toastify";
import { postFormData, reset } from "../features/formPost/formPostSlice";
import questionsComponent from "@/components/questionsAndAnswers";

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
  const [selectedPeople, setSelectedPeople] = useState([]);

  const [people, setPeople] = useState([]);

  const sendDataHandler = () => {
    //dispatch(postFormData());
  };

  const handleAccept = () => {
    // Handle accept action
    console.log("User accepted");
  };

  const handleReject = () => {
    // Handle reject action
    console.log("User rejected");
  };
  /*
  const people = {
    1: "Alice",
    2: "Bob",
    3: "Charlie",
    4: "David",
  };
*/
  /*
  useEffect(() => {
    if (formUlsState.isSuccess && !formUlsState.isLoading) {
      dispatch(reset());
      dispatch(fetchSociograms());
    }
    if (formUlsState.isError && !formUlsState.isLoading) {
      toast.error(formUlsState.message);
    }
  }, [formUlsState.isLoading, formUlsState.isSuccess, formUlsState.isError]);
*/
  return (
    <div className="md:grid  md:grid-cols-6 gap-4">
      <div className="container mx-auto col-start-2 col-span-4">
        <h1 className="flex text-xl font-semibold mb-2 justify-center pb-6">
          Welcome to Our Service! {mainUser.firstName + " " + mainUser.lastName}
        </h1>
        <p className="mb-10">
          Please read the following information carefully before proceeding.
        </p>
        {formData &&
          (questionsComponent({
            id: formData.id,
            posQuestions: formData.posQuestions,
            negQuestions: formData.negQuestions,
            users: formData.users,
            mainUser: mainUser,
          }) as any)}
        <Button
          onClick={sendDataHandler}
          //disabled={developers.length >= users.length - 1}
        >
          Add developer
        </Button>
      </div>
    </div>
  );
}

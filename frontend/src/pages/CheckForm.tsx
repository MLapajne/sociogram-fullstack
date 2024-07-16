import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming Button component exists
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toast } from "react-toastify";
import { fetchSociograms, reset } from "../features/urls/formPeopleSlice";

interface UserPageProps {
  formData: any;
}

export default function UserConfirmationPage({ formData }: UserPageProps) {
  const dispatch = useAppDispatch();
  //const projectState = useAppSelector((state) => state.formPeople);
  //const formUlsState = useAppSelector((state) => state.formUrls);
  const [selectedPeople, setSelectedPeople] = useState([]);

  const [people, setPeople] = useState([]);

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
          Welcome to Our Service!
        </h1>
        <p className="mb-10">
          Please read the following information carefully before proceeding.
        </p>
        <div className="p-4 bg-gray-100">
          <p className="mb-4">Select the people you want to sit with:</p>
          <div className="">
            {formData &&
              formData.users.length > 0 &&
              formData.users.map((user: any, index: any, array: any) => (
                <div key={user.id}>
                  <div
                    className={`flex items-center space-x-2 ${
                      index !== array.length - 1 ? "mb-6" : ""
                    }`}
                  >
                    <Checkbox id={`person-${user.id}`} />
                    <Label htmlFor={`person-${user.id}`}>
                      {user.first_name}
                    </Label>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Button } from "@/components/ui/button"; // Assuming Button component exists

interface UserConfirmationPageProps {
  userName: string;
}

export default function UserConfirmationPage({
  userName,
}: UserConfirmationPageProps) {
  const handleAccept = () => {
    // Handle accept action
    console.log("User accepted");
  };

  const handleReject = () => {
    // Handle reject action
    console.log("User rejected");
  };

  return (
    <div className="md:grid  md:grid-cols-6 gap-4">
      <div className="container mx-auto col-start-2 col-span-4">
        <h1 className="flex text-xl font-semibold mb-2 justify-center pb-6">
          Welcome to Our Service!
        </h1>
        <p className="mb-4">
          Please read the following information carefully before proceeding.
        </p>
        <p className="mb-4">
          Disclaimer: This service is provided as-is, and by proceeding, you
          agree to our terms and conditions.
        </p>
        <div className="mb-4">
          <p>Are you {userName}?</p>
          <div className="flex gap-2 justify-center">
            <Button onClick={handleAccept} variant="default">
              Accept
            </Button>
            <Button onClick={handleReject} variant="secondary">
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

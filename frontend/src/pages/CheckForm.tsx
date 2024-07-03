import React from "react";
import { Button } from "@/components/ui/button"; // Assuming Button component exists
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

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

  const people = {
    1: "Alice",
    2: "Bob",
    3: "Charlie",
  };

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
            {Object.entries(people).map(([id, name], index, array) => (
              <div>
                <div
                  key={id}
                  className={`flex items-center space-x-2 ${
                    index !== array.length - 1 ? "mb-6" : ""
                  }`}
                >
                  <Checkbox id={`person-${id}`} />
                  <Label htmlFor={`person-${id}`}>{name}</Label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { FormUsers } from "@/classes/formData";

interface UserPageProps {
  questions: string[];
  mainUser: any;
  users: FormUsers[];
  form: any;
  questionType: string;
}

const CustomFormRender = ({
  questions,
  users,
  mainUser,
  form,
  questionType,
}: UserPageProps) => {
  return (
    <>
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <FormItem key={index}>
            <div className="mb-4">
              <FormLabel className="text-base">{question}</FormLabel>
            </div>
            {users.length > 0 &&
              users.map((user, userIndex, array) =>
                user.id !== mainUser.id ? (
                  <FormField
                    key={`${index}-${user.id}-${questionType}`}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <div
                          key={`${index}-${user.id}-${questionType}`}
                          className={`flex items-center space-x-2 ${
                            userIndex !== array.length - 1 ? "mb-6" : ""
                          }`}
                        >
                          <Checkbox
                            checked={field.value?.includes(
                              `${index}-${user.id}-${questionType}`
                            )}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...field.value,
                                    `${index}-${user.id}-${questionType}`,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) =>
                                        value !==
                                        `${index}-${user.id}-${questionType}`
                                    )
                                  );
                            }}
                          />
                          <Label className="items-start">
                            {user.firstName + " " + user.lastName}
                          </Label>
                        </div>
                      );
                    }}
                  />
                ) : null
              )}
            <FormMessage />
          </FormItem>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default CustomFormRender;

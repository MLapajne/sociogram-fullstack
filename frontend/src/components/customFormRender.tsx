import React, { useState } from "react";
import { useFormContext, Controller, Noop, RefCallBack } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { FormUsers } from "@/classes/formData";

interface UserPageProps {
  questions: string[];
  mainUser: any;
  users: FormUsers[];
  form: any;
  selectedUsers: string[];
  questionType: string;
  handleCheckedChange: (
    checked: string | boolean,
    index: number,
    user: FormUsers,
    field: any,
    questionType: string
  ) => void;
}

const CustomFormRender = ({
  questions,
  users,
  mainUser,
  form,
  selectedUsers,
  questionType,
  handleCheckedChange,
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
              users.map((user, userIndex, array) => {
                const userKey = `${index}-${user.id}-${questionType}`;
                const isSelected = selectedUsers.includes(userKey);

                const isAnySelectedForUser = selectedUsers.some((key) =>
                  key.includes(`-${user.id}-`)
                );

                return (
                  <FormField
                    key={`${index}-${user.id}-${questionType}`}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <div
                          className={`flex items-center space-x-2 ${
                            userIndex !== array.length - 1 ? "mb-6" : ""
                          }`}
                        >
                          {(isSelected ||
                            (!isAnySelectedForUser &&
                              mainUser.id !== user.id)) && (
                            <>
                              <Checkbox
                                checked={field.value?.includes(userKey)}
                                onCheckedChange={(checked) => {
                                  handleCheckedChange(
                                    checked,
                                    index,
                                    user,
                                    field,
                                    questionType
                                  );
                                }}
                              />

                              <Label className="items-start">
                                {user.firstName + " " + user.lastName}
                              </Label>
                            </>
                          )}
                        </div>
                      );
                    }}
                  />
                );
              })}
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

import React, { useState } from "react";
import { FormPostData, FormUsers, QuestionAndAnswer } from "@/classes/formData";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import CustomFormRender from "./customFormRender";
import ConfirmationDialog from "./ConfirmationDialog";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { postFormData, reset } from "../features/formPost/formPostSlice";

interface PosQuestionProps {
  sociogramId: string;
  negQuestions: string[];
  posQuestions: string[];
  users: FormUsers[];
  mainUser: FormUsers;
}

const FormSchema = z.object({
  items: z.array(z.string()).refine(
    (value) => {
      type Counter = { [key: string]: number };
      const counter: Counter = {};
      for (const item of value) {
        const [questionIndex, , questionType] = item.split("-");
        const groupKey = `${questionIndex}-${questionType}`;
        if (!counter[groupKey]) {
          counter[groupKey] = 0;
        }
        counter[groupKey] += 1;
      }
      console.log(counter);
      for (const key in counter) {
        console.log(counter[key]);
        if (counter[key] !== 1 || Object.keys(counter).length !== 6) {
          return false;
        }
      }

      return true;
    },
    {
      message: "You have to select exact 1 user for each question",
    }
  ),
});

const questionsComponent: React.FC<PosQuestionProps> = ({
  sociogramId,
  negQuestions,
  posQuestions,
  users,
  mainUser,
}) => {
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [finalPostData, setFinalPostData] = useState({} as FormPostData);

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleCheckedChange = (
    checked: string | boolean,
    index: number,
    user: FormUsers,
    field: any,
    questionType: string
  ) => {
    const userKey = `${index}-${user.id}-${questionType}`;
    if (checked) {
      setSelectedUsers([...selectedUsers, userKey]);
      field.onChange([...field.value, userKey]);
    } else {
      setSelectedUsers(selectedUsers.filter((key) => key !== userKey));
      field.onChange(field.value?.filter((value: string) => value !== userKey));
    }
  };

  const handleConfirm = () => {
    setIsDialogOpen(false);
    // Add your confirmation logic here
    if (finalPostData) dispatch(postFormData(finalPostData));
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: { items: [] },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    //event.preventDefault();
    setIsDialogOpen(true);

    let posQuestions: string[] = [];
    let negQuestions: string[] = [];

    for (const item of data.items) {
      const [questionIndex, userId, questionType] = item.split("-");

      if (questionType === "pos") {
        if (!posQuestions.includes(userId)) {
          posQuestions.push(userId);
        }
      } else {
        if (!negQuestions.includes(userId)) {
          negQuestions.push(userId);
        }
      }
    }

    let finalData: FormPostData = {
      sociogramId: sociogramId,
      firstName: mainUser.firstName,
      lastName: mainUser.lastName,
      gender: mainUser.gender,
      //users: users,
      posQuestions: posQuestions,
      negQuestions: negQuestions,
    };
    setFinalPostData(finalData);
    //console.log(finalData);
    toast(() => (
      <div>
        <h4>You submitted the following values:</h4>
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    ));
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <>
                {CustomFormRender({
                  questions: posQuestions,
                  users: users,
                  mainUser: mainUser,
                  form: form,
                  questionType: "pos",
                  selectedUsers: selectedUsers,
                  handleCheckedChange: handleCheckedChange,
                })}
                {CustomFormRender({
                  questions: negQuestions,
                  users: users,
                  mainUser: mainUser,
                  form: form,
                  questionType: "neg",
                  selectedUsers: selectedUsers,
                  handleCheckedChange: handleCheckedChange,
                })}
              </>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};

export default questionsComponent;

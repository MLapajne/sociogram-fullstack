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
  id: string;
  negQuestions: string[];
  posQuestions: string[];
  users: FormUsers[];
  mainUser: FormUsers;
}

const questionsComponent: React.FC<PosQuestionProps> = ({
  id,
  negQuestions,
  posQuestions,
  users,
  mainUser,
}) => {
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [finalPostData, setFinalPostData] = useState({} as FormPostData);

  const handleConfirm = () => {
    setIsDialogOpen(false);
    // Add your confirmation logic here
    if (finalPostData) dispatch(postFormData(finalPostData));
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const FormSchema = z.object({
    items: z.array(z.string()).refine(
      (value) => {
        type Counter = { [key: string]: number };
        const counter: Counter = {};
        for (const item of value) {
          const [questionIndex, userId, questionType] = item.split("-");
          if (!counter[`${questionIndex}-${questionType}`]) {
            counter[`${questionIndex}-${questionType}`] = 0;
          }
          counter[`${questionIndex}-${questionType}`]++;
        }
        let checkCounterValues = true;
        for (const key in counter) {
          if (counter[key] < 3) {
            checkCounterValues = false;
          }
        }
        if (checkCounterValues) {
          return true;
        } else {
          return false;
        }
      },
      {
        message: "You have to select more than 3 items.",
      }
    ),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { items: [] },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    //event.preventDefault();
    setIsDialogOpen(true);

    let questionsAndAnswers: QuestionAndAnswer[] = [];

    for (const item of data.items) {
      const [questionIndex, userId, questionType] = item.split("-");
      let currentQuestion = "";
      if (questionType === "pos") {
        currentQuestion = posQuestions[parseInt(questionIndex)];
      } else {
        currentQuestion = negQuestions[parseInt(questionIndex)];
      }
      let currentUserFirstName =
        users.find((user) => user.id === userId)?.firstName || "";
      let currentUserLastName =
        users.find((user) => user.id === userId)?.lastName || "";
      let fullName = `${currentUserFirstName} ${currentUserLastName}`.trim();
      let questionObj = questionsAndAnswers.find(
        (q) => q.question === currentQuestion
      );

      if (questionObj) {
        // If the question exists and the user is not already listed, add the user
        if (!questionObj.answers.includes(fullName)) {
          questionObj.answers.push(fullName);
        }
      } else {
        questionsAndAnswers.push({
          answers: [fullName], // Use fullName which includes both first and last names
          questionType: questionType,
          question: currentQuestion,
        });
      }
    }

    let finalData: FormPostData = {
      id: id,
      firstName: mainUser.firstName,
      lastName: mainUser.lastName,
      questionsAndAnswers: questionsAndAnswers,
    };
    setFinalPostData(finalData);
    console.log(finalData);
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
                })}
                {CustomFormRender({
                  questions: negQuestions,
                  users: users,
                  mainUser: mainUser,
                  form: form,
                  questionType: "neg",
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

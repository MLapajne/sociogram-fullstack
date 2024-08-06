import React, { useContext, useEffect, useState } from "react";
import { FormPostData, FormUsers } from "@/classes/formData";
import { Form, FormField } from "./ui/form";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormRender from "./customFormRender";
import ConfirmationDialog from "./ConfirmationDialog";
import { useAppDispatch } from "../app/hooks";
import { postFormData } from "../features/formPost/formPostSlice";
import { SubmitDataContext } from "../context/SubmitDataContext";
import { getTranslations } from "../helpers/translations";
import { LanguageDataContext } from "@/context/LanguageDataContext";
import { useNavigate } from "react-router-dom";

interface PosQuestionProps {
  sociogramId: string;
  negQuestions: string[];
  posQuestions: string[];
  users: FormUsers[];
  mainUser: FormUsers;
}

const questionsComponent: React.FC<PosQuestionProps> = ({
  sociogramId,
  negQuestions,
  posQuestions,
  users,
  mainUser,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDisclaimerDialogOpen, setIsDisclaimerDialogOpen] = useState(true);
  const [finalPostData, setFinalPostData] = useState({} as FormPostData);

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { dataContext, setDataContext } = useContext(SubmitDataContext);
  const { languageData, setLanguageData } = useContext(LanguageDataContext);

  const [translations, setTranslations] = useState(
    getTranslations(languageData)
  );

  useEffect(() => {
    const newTranslations = getTranslations(languageData);
    setTranslations(newTranslations);
  }, [languageData]);

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

        for (const key in counter) {
          if (
            counter[key] === 1 &&
            Object.keys(counter).length ===
              posQuestions.length + negQuestions.length
          ) {
            return true;
          }
        }

        return false;
      },
      {
        message: "You have to select exact 1 user for each question",
      }
    ),
  });

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
    if (finalPostData) {
      dispatch(postFormData(finalPostData));
      navigate("/thank-you");
    }
  };
  const handleAccept = () => {
    setIsDisclaimerDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "all",
    defaultValues: { items: [] },
  });

  useEffect(() => {
    form.trigger(); // Manually trigger validation on initial render
  }, [form]);

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

    setDataContext((prevContext: any[]) => [...prevContext, mainUser]);
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

          <Button type="submit">{translations.submitButtonText}</Button>
        </form>
      </Form>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={translations.title}
        description={translations.description}
        confirmText={translations.confirmText}
        cancelText={translations.cancelText}
      />
      <ConfirmationDialog
        isOpen={isDisclaimerDialogOpen}
        onConfirm={handleAccept}
        onCancel={() => {}}
        title={translations.disclaimerTitle}
        description={translations.disclaimerDescription}
        confirmText={translations.disclaimerConfirmText}
        cancelText={translations.disclaimerCancelText}
      />
    </>
  );
};

export default questionsComponent;

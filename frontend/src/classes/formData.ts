export interface QuestionAndAnswer {
  question: string;
  answers: string[];
  questionType: string;
}

export interface FormPostData {
  id: string;
  firstName: string;
  lastName: string;
  //createdAt: string; // Consider using Date type if you plan to work with date objects
  questionsAndAnswers: QuestionAndAnswer[];
}

export interface FormUsers {
  id: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
}

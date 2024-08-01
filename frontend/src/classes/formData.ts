export interface QuestionAndAnswer {
  question: string;
  answers: string[];
  questionType: string;
}

export interface FormPostData {
  sociogramId: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  //users: FormUsers[];
  //createdAt: string; // Consider using Date type if you plan to work with date objects
  posQuestions: string[];
  negQuestions: string[];
}

export interface FormUsers {
  id: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
}

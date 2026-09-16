export interface QuestionItem {
  id: string;
  number: number;
  pillar: string;
  pillarEn: string;
  title: string;
  question: string;
  subtitle: string;
  placeholder: string;
  iconName: string;
  quickOptions: string[];
}

export interface AnswersState {
  targetUsers: string;
  coreFeatures: string;
  dataEntities: string;
  uiStyle: string;
  permissions: string;
  userFlow: string;
  targetDevices: string;
  integrations: string;
  systemStates: string;
  completionCriteria: string;
  [key: string]: string;
}

export interface AppTemplate {
  id: string;
  name: string;
  badge: string;
  icon: string;
  description: string;
  appName: string;
  answers: AnswersState;
}

export interface PillarStatus {
  name: string;
  icon: string;
  isFilled: boolean;
  questionKey: string;
}

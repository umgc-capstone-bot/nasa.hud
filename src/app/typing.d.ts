export type ProcedureStepElement =
  | IStepElementCheckbox
  | IStepElementText
  | IStepElementDuration
  | IStepElementTitle
  | IStepElementWarning
  | IStepElementCaution
  | IStepElementImage
  | IStepElementParent;

export interface IStepElementDuration {
  elementType: 'duration';
  durationUnit: string;
  durationLength: number;
}

export interface IStepElementWarning {
  elementType: 'warning';
  warnings: string[];
}

export interface IStepElementCaution {
  elementType: 'caution';
  cautions: string[];
}

export interface IStepElementTitle {
  elementType: 'title';
  stepTitle: string;
}

export interface IStepElementText {
  elementType: 'instructions';
  stepInstructions: string;
}

export interface IStepElementCheckbox {
  elementType: 'checkbox';
  taskList: string[];
}

export interface IStepElementParent {
  elementType: 'parentStep';
  subSteps: ProcedureStepElement[];
}

export interface IStepElementImage {
  elementType: 'image';
  imageLinks: Array<{ path: string }>;
}
export interface IParsedProcedureStep {
  // a step that only contains a string value, i.e. "TBD"
  isSimpleStep: boolean;
  isSimoStep: boolean;
  stepTitle: string;
  stepElements: ProcedureStepElement[];
}

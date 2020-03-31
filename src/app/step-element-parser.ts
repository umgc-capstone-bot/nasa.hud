import {
  ProcedureStepElement,
  IStepElementTitle,
  IStepElementText,
  IStepElementCheckbox,
  IStepElementDuration,
  IStepElementWarning,
  IStepElementCaution,
  IStepElementParent,
  IStepElementImage
} from './typing';

export class StepElementParser {
  identifiedElements: ProcedureStepElement[] = [];

  constructor(private step: any) {
    this.beginChecks();
  }

  private beginChecks(): void {
    this.checkHasTitle()
      .checkHasInstruction()
      .checkHasCheckbox()
      .checkHasCaution()
      .checkHasWarning()
      .checkHasDuration()
      .checkHasImage()
      .checkHasSubSteps();
  }

  private checkHasTitle(): this {
    if (!this.step.title) {
      return this;
    }
    const element = {} as IStepElementTitle;
    element.elementType = 'title';
    element.stepTitle = this.step.title;
    this.identifiedElements.push(element);
    return this;
  }

  private checkHasInstruction(): this {
    if (!this.step.text && !this.step.step) {
      return this;
    }
    const element = {} as IStepElementText;
    element.elementType = 'instructions';
    element.stepInstructions = this.step.text || this.step.step;
    this.identifiedElements.push(element);
    return this;
  }

  private checkHasCheckbox(): this {
    if (!this.step.checkboxes) {
      return this;
    }
    const element = {} as IStepElementCheckbox;
    element.elementType = 'checkbox';
    element.taskList = Array.isArray(this.step.checkboxes)
      ? this.step.checkboxes
      : [this.step.checkboxes];
    this.identifiedElements.push(element);
    return this;
  }

  private checkHasDuration(): this {
    if (!this.step.duration) {
      return this;
    }
    const element = {} as IStepElementDuration;
    element.elementType = 'duration';
    // this will only work if there is one duration property
    element.durationUnit = Object.keys(this.step.duration)[0];
    element.durationLength =
      element.durationUnit && this.step.duration[element.durationUnit];
    this.identifiedElements.push(element);
    return this;
  }

  private checkHasWarning(): this {
    if (!this.step.warning) {
      return this;
    }
    const element = {} as IStepElementWarning;
    element.elementType = 'warning';
    element.warnings = Array.isArray(this.step.warning)
      ? this.step.warning
      : [this.step.warning];

    this.identifiedElements.push(element);
    return this;
  }

  private checkHasCaution(): this {
    if (!this.step.caution) {
      return this;
    }
    const element = {} as IStepElementCaution;
    element.elementType = 'caution';
    element.cautions = Array.isArray(this.step.warning)
      ? this.step.caution
      : [this.step.caution];

    this.identifiedElements.push(element);
    return this;
  }

  private checkHasSubSteps(): this {
    if (!this.step.substeps) {
      return this;
    }
    const element = {} as IStepElementParent;
    element.elementType = 'parentStep';
    element.subSteps = [];

    for (const step of this.step.substeps) {
      const subStepElementParser = new StepElementParser(step);
      element.subSteps.push(...subStepElementParser.identifiedElements);
    }

    this.identifiedElements.push(element);
    return this;
  }

  private checkHasImage(): this {
    if (!this.step.images) {
      return this;
    }

    const element = {} as IStepElementImage;
    element.elementType = 'image';
    element.imageLinks = Array.isArray(this.step.images)
      ? this.step.images
      : [this.step.images];

    this.identifiedElements.push(element);
    return this;
  }
}

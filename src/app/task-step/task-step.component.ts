import { Component, OnInit, Input } from '@angular/core';
import {
  IParsedProcedureStep,
  ProcedureStepElement,
  IStepElementTitle,
  IStepElementText,
  IStepElementCheckbox,
  IStepElementCaution,
  IStepElementWarning
} from '../typing';

@Component({
  selector: 'app-procedure-task-step',
  templateUrl: './task-step.component.html',
  styleUrls: ['./task-step.component.scss']
})
export class ProcedureTaskComponent implements OnInit {
  @Input() step: IParsedProcedureStep;
  stepHasTitle = false;
  stepHasTaskList = false;
  stepTaskList: string[] = [];
  stepDangerList: Array<{ isCautionTag: boolean; tag: string }> = [];
  stepElements = [] as ProcedureStepElement[];
  stepInstructions: string[] = [];
  stepTitle = '';

  constructor() {}

  ngOnInit(): void {
    this.stepElements = this.step.stepElements;
    console.log(this.step);
    this.setupDangerItems();
    this.setupTitle();
    this.setupTaskList();
    this.setupInstructions();
  }

  private setupDangerItems(): void {
    const elementsContainingDangerItems = this.stepElements.filter(
      element =>
        element.elementType === 'warning' || element.elementType === 'caution'
    ) as Array<IStepElementCaution | IStepElementWarning>;

    if (!elementsContainingDangerItems.length) {
      return;
    }

    elementsContainingDangerItems.forEach(element => {
      if (element.elementType === 'caution') {
        element.cautions.forEach(caution => {
          const cTag = { isCautionTag: true, tag: caution };
          this.stepDangerList.push(cTag);
        });
      } else {
        element.warnings.forEach(warning => {
          const cTag = { isCautionTag: false, tag: warning };
          this.stepDangerList.push(cTag);
        });
      }
    });
  }

  private setupInstructions(): void {
    const elementsContainingInstructions = this.stepElements.filter(
      element => element.elementType === 'instructions'
    ) as IStepElementText[];

    if (!elementsContainingInstructions.length) {
      return;
    }

    this.stepInstructions = elementsContainingInstructions.map(
      element => element.stepInstructions
    );
  }

  private setupTaskList(): void {
    const elementsContainingCheckboxs = this.stepElements.find(
      element => element.elementType === 'checkbox'
    ) as IStepElementCheckbox;

    if (!elementsContainingCheckboxs) {
      return;
    }

    this.stepTaskList = [...elementsContainingCheckboxs.taskList];
  }

  private setupTitle(): void {
    const elementContainingATitle = this.stepElements.find(
      element => element.elementType === 'title'
    ) as IStepElementTitle;

    if (!elementContainingATitle) {
      return;
    }

    this.stepTitle = elementContainingATitle.stepTitle;
    this.stepHasTitle = true;
  }
}

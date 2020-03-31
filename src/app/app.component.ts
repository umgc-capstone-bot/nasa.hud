import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskRepoService } from './task-repo.service';
import { MatStepper } from '@angular/material/stepper';
import { IParsedProcedureStep } from './typing';
import { StepElementParser } from './step-element-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;

  title = 'nasa-hud-angular';
  currentSelectedProcedure = '';
  parsedProcedureSteps: IParsedProcedureStep[];

  constructor(private taskService: TaskRepoService) {}

  ngOnInit() {
    this.taskService.init();
    this.setupProcedureAndRoleChangeWatcher();
  }

  parseSteps(stepsForSpecifiedRole: any[], role: string): void {
    this.parsedProcedureSteps = [];
    stepsForSpecifiedRole.forEach(step => {
      console.log(step);
      const parsedProcedureStep = {} as IParsedProcedureStep;

      const isSimoStep = (parsedProcedureStep.isSimoStep = !!step.simo);

      // attempt to unravel the nested steps, first remove simo level
      const stepWithoutSimoPropertyKey = isSimoStep ? step.simo : step;

      let stepsWithSpecifiedRolePropertyKey = stepWithoutSimoPropertyKey[role];

      // need this check for instances where the property key contains multiple
      // roles i.e. IV + crewA + crewB
      if (!stepsWithSpecifiedRolePropertyKey) {
        const objectKeys = Object.keys(stepWithoutSimoPropertyKey);
        for (const key of objectKeys) {
          if (!key.includes(role)) {
            continue;
          }
          stepsWithSpecifiedRolePropertyKey = stepWithoutSimoPropertyKey[key];
          break;
        }
      }

      // if at this point we are unable to find steps with the given role
      // assume there are no step for this role and exit
      if (!stepsWithSpecifiedRolePropertyKey) {
        return;
      }

      parsedProcedureStep.stepElements = [];

      stepsWithSpecifiedRolePropertyKey.forEach(elementsInStep => {
        // for steps that are just string like: 'TBD'
        if (typeof elementsInStep === 'string') {
          parsedProcedureStep.stepTitle = elementsInStep;
          parsedProcedureStep.isSimpleStep = true;
          this.parsedProcedureSteps.push(parsedProcedureStep);
          return;
        }

        const parser = new StepElementParser(elementsInStep);
        parsedProcedureStep.stepElements.push(...parser.identifiedElements);
        this.parsedProcedureSteps.push(parsedProcedureStep);
      });
    });
    console.log(this.parsedProcedureSteps);
  }

  setupProcedureAndRoleChangeWatcher(): void {
    this.taskService.currentSelectedProcedure$.subscribe(
      selectedProcedureAndRole => {
        const selectedProcedureFileYml = selectedProcedureAndRole[0];
        const selectedRole = selectedProcedureAndRole[1];
        const stepsForSpecifiedRole = selectedProcedureFileYml?.procedureYml.steps.filter(
          step => {
            const stringVersion = JSON.stringify(step);
            return stringVersion.includes(selectedRole);
          }
        );
        // get out if there are no steps for a given role
        if (!stepsForSpecifiedRole) {
          return;
        }
        console.log(stepsForSpecifiedRole);
        this.parseSteps(stepsForSpecifiedRole, selectedRole);
      }
    );
  }
}

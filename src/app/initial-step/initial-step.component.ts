import { Component, OnInit } from '@angular/core';
import { TaskRepoService, IProcedureItem } from '../task-repo.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-initial-step',
  templateUrl: './initial-step.component.html',
  styleUrls: ['./initial-step.component.scss']
})
export class InitialStepComponent implements OnInit {
  procedures: IProcedureItem[] = [];
  procedureSelection = new FormControl();
  roleSelection = new FormControl();
  rolesForSelectedProcdure: string[] = [];
  selectedProcedure: IProcedureItem;
  selectedRole: string;

  constructor(private taskRepo: TaskRepoService) {}

  ngOnInit(): void {
    this.taskRepo.procedures$.subscribe(procedures => {
      this.procedures = procedures;
    });
    this.setupProcedureSelectionWatcher();
    this.setupRoleSelectionWatcher();
  }

  setupProcedureSelectionWatcher(): void {
    this.procedureSelection.valueChanges.subscribe(
      (selectedProcedureName: string) => {
        const selectedProcedure = this.procedures.find(
          proc => proc.procedureName === selectedProcedureName
        );
        this.selectedProcedure = selectedProcedure;
        this.rolesForSelectedProcdure = selectedProcedure.procedureYml.roles.map(
          r => r.name
        );
      }
    );
  }

  setupRoleSelectionWatcher(): void {
    this.roleSelection.valueChanges.subscribe((selectedRole: string) => {
      this.selectedRole = selectedRole;
      this.taskRepo.currentSelectedProcedure$.next([
        this.selectedProcedure,
        selectedRole
      ]);
    });
  }

  ngOnDestroy(): void {}
}

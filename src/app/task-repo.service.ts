import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve } from '@angular/router';
import YAML from 'yaml';
import { Observable, BehaviorSubject } from 'rxjs';

interface IYamlFile {
  title: string;
  roles: any[];
  steps: any[];
}
export interface IProcedureItem {
  procedureName: string;
  procedureYml: IYamlFile;
}
export interface IProcedureList {
  procedureFileNames: string[];
}
@Injectable({ providedIn: 'root' })
export class TaskRepoService {
  procedures$: BehaviorSubject<IProcedureItem[]>;
  currentSelectedProcedure$: BehaviorSubject<[IProcedureItem, string]>;

  constructor(private http: HttpClient) {
    this.currentSelectedProcedure$ = new BehaviorSubject([] as any);
    this.procedures$ = new BehaviorSubject([]);
  }

  async init(): Promise<any> {
    const procedures: IProcedureItem[] = [];

    const procedureList = await this.http
      .get<IProcedureList>('assets/procedureList.json')
      .toPromise();

    for (const procedureFileName of procedureList.procedureFileNames) {
      const procedureFile = await this.http
        .get(`assets/procedures/${procedureFileName}.yml`, {
          responseType: 'text'
        })
        .toPromise();

      const parsedYml = YAML.parse(procedureFile as any) as IYamlFile;

      procedures.push({
        procedureName: parsedYml.title,
        procedureYml: parsedYml
      });
    }
    console.log(procedures);
    this.procedures$.next(procedures);
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IGuardJson } from 'src/app/interfaces/iguard-json';
import { ISiteJson } from 'src/app/interfaces/isite-json';
import { IWatch } from 'src/app/interfaces/iwatch';
import { DalService } from 'src/app/services/dal.service';
import { Globals } from 'src/app/services/globals';
import { addDays, dateToString, hrToTimeString } from 'src/app/utils/utils';
import { environment } from 'src/environments/environment';
import { ISetttings } from '../../interfaces/isetttings';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, ISetttings {
  beginDateStr: string = '';
  nDays: number = 0;
  endDateStr: string = '';
  dirty: boolean = false;
  iSites: ISiteJson[] = [];
  iGuards: IGuardJson[] = [];
  iWatches: IWatch[] = [];
  selectedFile!: string;
  get valid(): boolean {
    return (
      this.nDays > 0 &&
      this.beginDateStr.length >= 10 &&
      this.iSites.length > 0 &&
      this.iGuards.length > 0
    );
  }

  constructor(readonly dal: DalService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dal.init();
    this.nDays = Globals.nDays;
    this.beginDateStr = dateToString(Globals.beginDate);
    this.endDateStr = dateToString(addDays(Globals.beginDate, this.nDays));
    this.iSites = Globals.iSites;
    this.iGuards = Globals.iGuards;
    this.selectedFile = environment.settingsFileName;
  }

  async onFileUpload(event: any) {
    //debugger;
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.selectedFile = file;
      reader.readAsText(file);

      reader.onloadend = () => {
        const strOut = reader.result?.toString() || '';
        const obj = JSON.parse(strOut) as ISetttings;
        // debugger;

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  async saveSettings() {
    //, filename: string = environment.settingsFileName) {
    const intrf: ISetttings = { ...(this as ISetttings) };
    const text: string = JSON.stringify(intrf);
    const encoded: string = encodeURIComponent(text);

    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encoded);
    a.setAttribute('download', environment.settingsFileName);
    a.click();
  }
}

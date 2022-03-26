import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
export class SettingsComponent implements OnInit, OnDestroy {
  intrf!: ISetttings;

  iWatches: IWatch[] = [];
  settingsFile!: string;
  get valid(): boolean {
    return (
      this.intrf.nDays > 0 &&
      this.intrf.beginDateStr.length >= 10 &&
      this.intrf.iSites.length > 0 &&
      this.intrf.iGuards.length > 0
    );
  }

  constructor(readonly dal: DalService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dal.init();
    let _beginDateStr = dateToString(Globals.beginDate);
    let _endDateStr = dateToString(addDays(Globals.beginDate, Globals.nDays));
    this.go();

    const intrf = {
      nDays: Globals.nDays,
      beginDateStr: _beginDateStr,
      endDateStr: _endDateStr,
      dirty: false,
      iSites: Globals.iSites,
      iGuards: Globals.iGuards,
      iWatchJsons: Globals.iWatchJsons,
      settingsFile: environment.settingsFileName,
    } as ISetttings;
    this.attachSettings(intrf);
  }
  go()
  {

    const map = new Map<string,any>();
    map.set('aaa', { n: 1, str: 'aaa' });
    map.set('bbb', { n: 2, str: 'bbb' });
    map.set('ccc', { n: 3, str: 'ccc' });
    let jsonObject:any = {};
    map.forEach((value, key) => {
      jsonObject[key] = value;
    });
    console.log('go()',JSON.stringify(jsonObject));  

  }
  attachSettings(intrf: ISetttings) {
    this.intrf = { ...intrf };
  }
  fileSettingsRead(event: any) {
    //debugger;
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.intrf.settingsFile = file;
      console.log('file', file);
      reader.readAsText(file);

      reader.onloadend = () => {
        const strOut = reader.result?.toString() || '';
        const settings: ISetttings = JSON.parse(strOut) as ISetttings;

        localStorage.setItem('AppComponent.arrWatchCsv', strOut);
        this.attachSettings(settings);
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }
  async fileSettingsSave(event: any) {
    //, filename: string = environment.settingsFileName) {

    try {
      const text: string = JSON.stringify(this.intrf, null, 2);
      const encoded: string = encodeURIComponent(text);

      var a = document.createElement('a');
      a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encoded);
      a.setAttribute('download', environment.settingsFileName);
      a.click();
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    Globals.nDays = this.intrf.nDays;
  }

  beginDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const begDate = new Date(target.value);
    const endDate = addDays(begDate, this.intrf.nDays);
    this.intrf.beginDateStr = dateToString(begDate);
    this.intrf.endDateStr = dateToString(endDate);
    this.intrf.dirty = true;
   
  }
  nDaysChange(event: Event) {
    const begDate = new Date(this.intrf.beginDateStr);

    const endDate = addDays(begDate, this.intrf.nDays);
    this.intrf.endDateStr = dateToString(endDate);
    this.intrf.dirty = true;
 
  }
}

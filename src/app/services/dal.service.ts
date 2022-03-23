import { Injectable } from '@angular/core';
import { MOKGuardsJSon } from 'src/data/json/guards.data';
import { MokSitesJSon } from 'src/data/json/sites.data';
import { IGuardJson } from '../interfaces/iguard-json';
import { ISiteJson } from '../interfaces/isite-json';
import { addDays, dateToString, getMidnight } from '../utils/utils';
import { FrameBuilder } from '../base/FrameBuilder';
import { environment } from 'src/environments/environment';
import { IWatchJson } from '../interfaces/iwatch';
import { Globals } from './globals';

const prefix: string = environment.prefixLocalStore;

@Injectable({
  providedIn: 'root',
})
export class DalService {
  static isInit: boolean = false;
  public get beginDate(): Date {
    return Globals.beginDate;
  }
  public get nDays(): number {
    return Globals.nDays;
  }
  private _endDate!: Date;
  get endDate(): Date {
    return this._endDate;
  }

  private _fb!: FrameBuilder;
  get fb() {
    return this._fb;
  }

  constructor() {}
  init() {
    if (!DalService.isInit) {
      try {
        this.toInit();
        DalService.isInit = true;
      } catch (error) {
        console.log(`${error}`);
      }
    }
  }
  private toInit() {
    Globals.init();
    this._endDate = addDays(this.beginDate, this.nDays);
    this.retriveSites();
    this.retrieveGuards();
  }
  private retrieveGuards() {
    const iGuardStr = localStorage?.getItem(prefix + '_iGuards');
    if (iGuardStr) {
      let jsonObj: any = JSON.parse(iGuardStr); // string to generic object first
      Globals.iGuards = <IGuardJson[]>jsonObj;
    } else {
      Globals.iGuards = MOKGuardsJSon;
      localStorage?.setItem(
        prefix + '_iGuards',
        JSON.stringify(Globals.iGuards)
      );
    }
  }
  private retriveSites() {
    const iSiteStr = localStorage?.getItem(prefix + '_iSites');
    if (iSiteStr) {
      let jsonObj: any = JSON.parse(iSiteStr); // string to generic object first
      Globals.iSites = <ISiteJson[]>jsonObj;
    } else {
      Globals.iSites = MokSitesJSon;
      localStorage?.setItem(prefix + '_iSites', JSON.stringify(Globals.iSites));
    }

    // throw new Error('Method not implemented.');
  }
  async retrieveFrameWatches(
    firstMIdStr: string,
    nDays: number,
    useFile: string = ''
  ): Promise<IWatchJson[]> {
    let retrived: IWatchJson[] = [];
    // Try retrueve from localStorage
    // TBD Try retrieve from file
    let dateM1 = dateToString(addDays(new Date(firstMIdStr), -1));
    let dateLast = dateToString(addDays(new Date(firstMIdStr), nDays));

    retrived = retrived.filter(
      (w) => w.midnight >= dateM1 && w.midnight < dateLast
    );
    return retrived;
  }
  async generateFrame(
    firstMIdStr: string,
    nDays: number
  ): Promise<FrameBuilder | undefined> {
    try {
      this.toInit();
      const date = getMidnight(new Date(firstMIdStr));
      Globals.beginDate = date;
      Globals.nDays = nDays;
      const fb = this._fb;

      //??? get IWatches from DB
      this._fb = new FrameBuilder(date, nDays);

      return this._fb;
    } catch (error) {
      debugger;
      console.error(error);
      return undefined;
    }
  }
}

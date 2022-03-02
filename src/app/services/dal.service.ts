import { Injectable } from '@angular/core';
import { MOKGuardsJSon } from 'src/data/json/guards.data';
import { MokSitesJSon } from 'src/data/json/sites.data';
import { IGuardJson } from '../interfaces/iguard-json';
import { ISiteJson } from '../interfaces/isite-json';
import { addDays, dateToString, midnight } from '../utils/utils';
const prefix: string = 'AMokedIminGlobals';

class CGlobals {
  //beginDate: Date = midnight(new Date());

  static nDays: number = 7;
  readonly isLocal: boolean = !!localStorage;
  init() {
    if (localStorage) {
      let beginDate = this.beginDate;
      this.initNDays();
    }
  }
  initNDays() {
    let _nDaysStr = localStorage.getItem(this.prefix + '_nDays');
    if (_nDaysStr) {
      CGlobals.nDays = +_nDaysStr | 0;
    }
  }
  //===========NDAYS===============================

  private static _nDays: number = 7;
  public get nDays(): number {
    return CGlobals._nDays;
  }
  public set nDays(n: number) {
    n = n | 0;
    localStorage?.setItem(this.prefix + '_beginDate', n.toFixed(0));
    CGlobals._nDays = n | 0;
  }

  //===========BEGIN DATE =========================

  static _beginDate: Date = new Date(0);

  public get beginDate(): Date {
    if (CGlobals._beginDate.getTime() === 0 && localStorage) {
      let _beginDateStr = localStorage?.getItem(this.prefix + '_beginDate');
      if (_beginDateStr) {
        CGlobals._beginDate = midnight(new Date(_beginDateStr));
      }
    }
    return CGlobals._beginDate;
  }
  public set beginDate(date: Date) {
    localStorage?.setItem(
      this.prefix + '_beginDate',
      dateToString(date, false)
    );
    CGlobals._beginDate = date;
  }
}

export const Globals = new CGlobals();

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
  readonly mapSiteJson: Map<number, ISiteJson> = new Map<number, ISiteJson>();
  // readonly mapGuardJson: Map<number, IGuardJson> = new Map<
  getSite(siteId: number): ISiteJson {
    return (
      this.mapSiteJson.get(siteId) ||
      ({
        siteId: siteId,
        name: 'SITE ERROR',
        address: '',
        //  watchStrArr: [],
        watchPlan: [],
      } as ISiteJson)
    );
  }
  private iSites: ISiteJson[] = []; //MokSitesJSon;
  private iGuards: IGuardJson[] = []; //MOKGuardsJSon;
  public Direction: string = 'ltr';

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
  toInit() {
    Globals.init();
    this._endDate = addDays(this.beginDate, this.nDays);
    this.retriveSites();
    this.retrieveGuards();
  }
  retrieveGuards() {
    const iGuardStr = localStorage?.getItem(prefix + '_iGuards');
    if (iGuardStr) {
      let jsonObj: any = JSON.parse(iGuardStr); // string to generic object first
      this.iGuards = <IGuardJson[]>jsonObj;
    } else {
      this.iGuards = MOKGuardsJSon;
      localStorage?.setItem(prefix + '_iGuards', JSON.stringify(this.iGuards));
    }
  }
  retriveSites() {
    const iSiteStr = localStorage?.getItem(prefix + '_iSites');
    if (iSiteStr) {
      let jsonObj: any = JSON.parse(iSiteStr); // string to generic object first
      this.iSites = <ISiteJson[]>jsonObj;
    } else {
      this.iSites = MokSitesJSon;
      localStorage?.setItem(prefix + '_iSites', JSON.stringify(this.iSites));
    }
    // throw new Error('Method not implemented.');
  }
}

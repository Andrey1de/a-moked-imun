import { Injectable } from '@angular/core';
import { MOKGuardsJSon } from 'src/data/json/guards.data';
import { MokSitesJSon } from 'src/data/json/sites.data';
import { environment } from 'src/environments/environment';
import { IGuardJson } from '../interfaces/iguard-json';
import { ISiteJson } from '../interfaces/isite-json';
import { addDays, dateToString, getMidnight } from '../utils/utils';
import { FrameBuilder } from './FrameBuilder';
import { WatchCell } from './WatchCell';

const prefix: string = 'a-moked-imun-CGlobals';
class CGlobals {
  //beginDate: Date = midnight(new Date());
 

  init() {
    if (localStorage) {
        debugger;
      this.initBeginDate();
      this.initNDays();
    }
  }
  private initBeginDate() {
    let _beginDatStr: string =
      '' + localStorage?.getItem(prefix + '_beginDate');
    if (CGlobals._beginDateStr.length >= 10) {
      CGlobals._beginDate = new Date(_beginDatStr);
    }
  }
  private initNDays() {
    let _nDaysStr = localStorage.getItem(prefix + '_nDays');
    if (_nDaysStr) {
      CGlobals._nDays = +_nDaysStr | 0;
    }
  }
  //===========NDAYS===============================

  private static _nDays: number = 7;
  public get nDays(): number {
    let _nDaysStr = localStorage.getItem(prefix + '_nDays'); //|| CGlobals.nDays.toString();
    const n: number = +(_nDaysStr || '0');
    return n;
  }
  public set nDays(n: number) {
    n = n | 0;

    localStorage?.setItem(prefix + '_nDays', n.toFixed(0));
    CGlobals._nDays = n | 0;
  }

  //===========BEGIN DATE =========================

  static _beginDate: Date = new Date(0);
  static _beginDateStr: string = '';

  public get beginDateStr(): string {
   // let _beginDateStr = '' + localStorage?.getItem(prefix + '_beginDate');
    return CGlobals._beginDateStr;
  }

  public get beginDate(): Date {
    if (CGlobals._beginDate.getTime() === 0 && localStorage) {
      let _beginDateStr: string = '' || this.beginDateStr;
      if (CGlobals._beginDateStr.length >= 10) {
        CGlobals._beginDate = getMidnight(new Date(CGlobals._beginDateStr));
      }
    }
    return CGlobals._beginDate;
  }
  public set beginDate(date: Date) {
    date = getMidnight(date);
    CGlobals._beginDateStr = dateToString(date, false);
    localStorage?.setItem(prefix + '_beginDate', CGlobals._beginDateStr);
    CGlobals._beginDate = date;
  }
  get direction(): string {
    return environment.direction?.toLowerCase() || 'rtl';
  }
  get isHeb(): boolean {
    return this.direction == 'rtl';
  }
}
const globalMapSiteJson: Map<number, ISiteJson> = new Map<number, ISiteJson>();
const globalMapGuardJson: Map<number, IGuardJson> = new Map<
  number,
  IGuardJson
>();


export function globalAllSites(): ISiteJson[] {
  return [...globalMapSiteJson.values()];
}
export function globalAllGuards(): IGuardJson[] {
  return [...globalMapGuardJson.values()];
}
export function globalSite(siteId: number): ISiteJson {
  return (
    globalMapSiteJson.get(siteId) ||
    ({
      siteId: siteId,
      name: 'SITE ERROR',
      address: '',
      //  watchStrArr: [],
      watchPlan: [],
    } as ISiteJson)
  );
}
export function globalGuard(guardId: number): IGuardJson {
  return (
    globalMapGuardJson.get(guardId) ||
    ({
      //WTF ????
      guardId: guardId,
      manager: '--',
      name: 'GUARD ERROR',
      background: 'red',
      textColor: 'white',
    } as IGuardJson)
  );
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

  private iSites: ISiteJson[] = []; //MokSitesJSon;
  private iGuards: IGuardJson[] = []; //MOKGuardsJSon;
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
      this.iGuards = <IGuardJson[]>jsonObj;
    } else {
      this.iGuards = MOKGuardsJSon;
      localStorage?.setItem(prefix + '_iGuards', JSON.stringify(this.iGuards));
    }

    globalMapGuardJson.clear();
    this.iGuards.forEach((g) => globalMapGuardJson.set(g.guardId, g));
  }
  private retriveSites() {
    const iSiteStr = localStorage?.getItem(prefix + '_iSites');
    if (iSiteStr) {
      let jsonObj: any = JSON.parse(iSiteStr); // string to generic object first
      this.iSites = <ISiteJson[]>jsonObj;
    } else {
      this.iSites = MokSitesJSon;
      localStorage?.setItem(prefix + '_iSites', JSON.stringify(this.iSites));
    }
    globalMapSiteJson.clear();
    this.iSites.forEach((g) => globalMapSiteJson.set(g.siteId, g));

    // throw new Error('Method not implemented.');
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

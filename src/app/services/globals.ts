import { environment } from 'src/environments/environment';
import { IGuardJson } from '../interfaces/iguard-json';
import { ISiteJson } from '../interfaces/isite-json';
import { addDays, dateToString, getMidnight } from '../utils/utils';
import { WatchCell } from '../base/WatchCell';
const prefix: string = environment.prefixLocalStore;

export class CGlobals {
  //beginDate: Date = midnight(new Date());
  init(overritie: boolean = false) {
    //debugger;
    if (localStorage) {
      //  debugger;
      this.initBeginDate();
      this.initNDays();
    }
  }
  private initBeginDate() {
    CGlobals._beginDateStr = localStorage?.getItem(prefix + '_beginDate') || '';
    if (CGlobals._beginDateStr.length >= 10) {
      CGlobals._beginDate = new Date(CGlobals._beginDateStr);
    } else {
      let detBegin = getMidnight(new Date());
      let dayOw = detBegin.getDay();
      CGlobals._beginDateStr;
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
    const str = localStorage?.getItem(prefix + '_nDays') || '';
    if (str.length > 0) {
      CGlobals._nDays = +str;
    }
    return CGlobals._nDays;
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
      } else {
        // Set Next א' יום
        let _beginDate = getMidnight(new Date());
        let dow = _beginDate.getDay();
        let plusDays: number = (dow == 0) ? 1 : 7 - dow;
        this.beginDate = addDays(_beginDate, plusDays);
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
  //ISiteJson[]

  private _iSiteJson: ISiteJson[] = [];
  private _mapSiteJson: Map<number, ISiteJson> = new Map<number, ISiteJson>();
  public get iSites(): ISiteJson[] {
    return this._iSiteJson;
  }
  public set iSites(iSite: ISiteJson[]) {
    this._iSiteJson = iSite.sort((a, b) => a.siteId - b.siteId);
    this._mapSiteJson.clear();
    this._iSiteJson.forEach((i) => this._mapSiteJson.set(i.siteId, i));
  }
  public getISite(siteId: number): ISiteJson {
    return (
      this._mapSiteJson.get(siteId) ||
      ({
        siteId: siteId,
        name: 'SITE ERROR',
        address: '',
        //  watchStrArr: [],
        watchPlan: [],
      } as ISiteJson)
    );
  }
  //IGuardJson[]
  private _iGuardJson: IGuardJson[] = [];
  private _mapGuardJson: Map<number, IGuardJson> = new Map<
    number,
    IGuardJson
  >();

  public get iGuards(): IGuardJson[] {
    return this._iGuardJson;
  }
  public set iGuards(iGuard: IGuardJson[]) {
    this._iGuardJson = iGuard.sort((a, b) => a.guardId - b.guardId);
    this._mapGuardJson.clear();
    this._iGuardJson.forEach((i) => this._mapGuardJson.set(i.guardId, i));
  }

  public getIGuard(guardId: number): IGuardJson {
    return (
      this._mapGuardJson.get(guardId) ||
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

  //WatchCell[]
  private _watchCells: WatchCell[] = [];
  private _mapWatchCell: Map<number, WatchCell> = new Map<
    number, //idw
    WatchCell
  >();

  public get whatchCells(): WatchCell[] {
    return this._watchCells;
  }
  public set whatchCells(whatchCells: WatchCell[]) {
    this._watchCells = whatchCells.sort((a, b) => a.idw - b.idw);
    this._mapWatchCell.clear();
    this._mapWatchCell.forEach((i) => this._mapWatchCell.set(i.idw, i));
  }
  public getWatchCell(idw: number) {
    return this._mapWatchCell.get(idw);
  }
} // end of class

export const Globals = new CGlobals();

// const globalMapSiteJson: Map<number, ISiteJson> = new Map<number, ISiteJson>();
// const globalMapGuardJson: Map<number, IGuardJson> = new Map<
//   number,
//   IGuardJson
// >();

// export function globalAllSites(): ISiteJson[] {
//   return [...globalMapSiteJson.values()];
// }
// export function globalAllGuards(): IGuardJson[] {
//   return [...globalMapGuardJson.values()];
// }

// export function globalGuard(guardId: number): IGuardJson {
//   return (
//     globalMapGuardJson.get(guardId) ||
//     ({
//       //WTF ????
//       guardId: guardId,
//       manager: '--',
//       name: 'GUARD ERROR',
//       background: 'red',
//       textColor: 'white',
//     } as IGuardJson)
//   );
// }

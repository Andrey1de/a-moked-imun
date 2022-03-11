import { IDayAxis } from '../interfaces/iday-axis.model';
import { ISiteJson } from '../interfaces/isite-json';
import { IWatch } from '../interfaces/iwatch';
import {
  HEB_DAYS,
  msToIdw,
  midMsToN2022,
 
  MS_IN_DAY,
  idwParts,
  DayPart,
  dateToTimeString,
  dateToString,
} from '../utils/utils';
import { globalAllSites, Globals, globalSite } from './dal.service';
import { WatchRow } from './watch-row';
export class FrameBuilder {
  readonly axis!: IDayAxis[];
  readonly iSites: ISiteJson[] = [];
  readonly firstMidStr!: string;
  readonly firstDayMs: number;
  readonly firstDay2022!: number;
  readonly lasttDay2022!: number;
  readonly mapMorning: Map<number, WatchRow> = new Map<number, WatchRow>();
  readonly mapNoon: Map<number, WatchRow> = new Map<number, WatchRow>();
  readonly mapEvening: Map<number, WatchRow> = new Map<number, WatchRow>();
  readonly mapSites: Map<number, WatchRow>[] = [
    this.mapMorning,
    this.mapNoon,
    this.mapEvening,
  ];

  // siteId      idw

  //readonly mapWatchesDal: Map<number, IWatch> = new Map<number, IWatch>();

  constructor(readonly firstDate: Date, public nDays: number) {
    debugger;
    this.axis = new Array<IDayAxis>(7);
    this.firstMidStr = dateToString(firstDate);
    this.firstDate = new Date(this.firstMidStr);
    this.firstDayMs = this.firstDate.getTime();
    this.createAxis();
    this.iSites = globalAllSites();
    this.createAllTheFrame();
    // watchesDal.forEach((w) => this.mapWatchesDal.set(w.idw, w));
  }

  private createAxis() {
    let _midStr = this.firstMidStr;
    let _midDate = this.firstDate;
    let _midMs = this.firstDayMs;

    for (
      let nDay = 0;
      nDay < this.nDays;
      nDay++,
        _midMs += MS_IN_DAY,
        _midDate = new Date(_midMs),
        _midStr = dateToTimeString(_midDate)
    ) {
      let _dow = _midDate.getDay();

      let _dayName = `${HEB_DAYS[_dow]}' ${_midDate.getDate()}`;
      const axe: IDayAxis = {
        id: nDay,
        dow: _dow,
        day2022: midMsToN2022(_midMs),
        dayName: _dayName,
        midStr: _midStr,
        midMs: _midMs,
        midDate: _midDate,
      };
      this.axis[nDay] = axe;
    }
  }
  private createAllTheFrame() {
    for (const iSite of this.iSites) {
      this.createFrameSiteWatches(iSite);
    }
    return this.mapSites;
  }
  //ssssnnnnp = site-numday2022-partofday 200321 - 2site 2022-02-01 I duty

  private createFrameSiteWatches(iSiteJson: ISiteJson) {
    // let _mapSite = new Map<number, IWatch>();
    //  this.mapSites.set(iSite.siteId, _mapSite);
    const nDays = this.nDays;

    // watchPlan: number[];[7][[beg.end]]

    const watchPlan: number[][][] = iSiteJson.watchPlan;
    if (!Array.isArray(watchPlan) || watchPlan.length !== 7) {
      return this.mapSites;
    }

    // const siteId = iSite.siteId;

    for (let nDay = 0; nDay < nDays; nDay++) {
      //let dowNext = (dow + 1) % 7;
      const axe = this.axis[nDay];

      const planArr: number[][] = watchPlan[axe.dow];
      //Number of watches must been at least 2 !!!!

      planArr.forEach((pair, i) => {
        const [_begH, _endH] = pair;
        const _lengthH = (24 + _endH - _begH) % 24;

        const _siteId = iSiteJson.siteId;
        // const _begMS = midnight.getTime() + begH * MS_IN_HOUR;
        // dddd-p-sss(dayN,part,site)
        const _idhw = msToIdw(axe.midMs, _begH, _siteId);
        let iwatch = {
          idw: _idhw,
          siteId: _siteId, // "2";
          guardId: 0, // "101";
          midnight: axe.midStr,
          beginH: _begH, // new Date(beginS * 1000) from 2022-01-01
          lengthH: _lengthH,
          date: axe.midDate,
        } as IWatch;

        this.setWatch(iwatch, iSiteJson);
      });
    }
    // arr = arr.sort((a, b) => a.idw - b.idw);
    // arr.forEach((watch, index) => _mapSite.set(watch.idw, watch));
    // return _mapSite;
    return this.mapSites;
  }
  public setWatch(iw: IWatch, iSiteJson : ISiteJson): boolean {
      iSiteJson = iSiteJson || globalSite(iw.siteId);
    const { siteId, n2022, dayPart } = idwParts(iw.idw);
    let row: Map<number, WatchRow>; //= this.mapMorning;
    switch (dayPart) {
      case DayPart.Morning:
        row = this.mapMorning;
        break;
      case DayPart.Noon:
        row = this.mapNoon;
        break;
      case DayPart.Evening:
        row = this.mapEvening;
        break;

      default:
        return false;
    }

    let watchRow = row.get(siteId);
    if (!watchRow) {
      watchRow = new WatchRow(iSiteJson, dayPart, this.nDays, this.firstDate);
      watchRow.isFirst = true;
      row.set(siteId, watchRow);
    }
    watchRow.setWatch(iw);
    return true;
  }
}



  //   public mergeFrame(watchesDal: IWatch[]) {
  //     // const map: Map<number, IWatch> = new Map<number, IWatch>();
  //     watchesDal.forEach((iw) => this.setWatch(correctIWatch(iw)));
  //   }

  //   public setWatch(iWatch: IWatch) {
  //     const _siteId = iWatch.siteId;
  //     let map = this.mapSites.get(_siteId);
  //     if (!map) {
  //       map = new Map<number, IWatch>();
  //       this.mapSites.set(_siteId, map);
  //     }
  //     map.set(iWatch.idw, iWatch);
  //   }
  //   public getWatch(idw: number) {
  //     const _siteId = idw % 1000 | 0;
  //     return this.mapSites.get(_siteId)?.get(idw);
  //   }

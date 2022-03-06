import { IDayAxis } from '../interfaces/iday-axis.model';
import { ISiteJson } from '../interfaces/isite-json';
import { IWatch } from '../interfaces/iwatch';
import {
  dateToString,
  dateToTimeString,
  HEB_DAYS,
  msToIdw,
  midMsToN2022,
  MS_IN_DAY,
} from '../utils/utils';
import { globalAllSites, Globals } from './dal.service';

export class FrameBuilder {
  readonly axis!: IDayAxis[];
  readonly iSites: ISiteJson[];
  readonly firstDate: Date;
  readonly firstDayMs: number;
  readonly mapSites: Map<number, Map<number, IWatch>> = new Map<
    number,
    Map<number, IWatch>
  >();
  readonly mapWatchesDal: Map<number, IWatch> = 
    new Map<number, IWatch>();

  constructor(readonly firstMidStr: string,
    public nDays: number,
     watchesDal: IWatch[]
  ) {
    this.axis = new Array<IDayAxis>(7);
    this.firstDate = new Date(firstMidStr);
    this.firstDayMs = this.firstDate.getTime();
    this.createAxis();
    this.iSites = globalAllSites();
    this.createAllTheFrame();
    watchesDal.forEach((w) => this.mapWatchesDal.set(w.idw,w));
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
  private createAllTheFrame(): Map<number, Map<number, IWatch>> {
    for (let index = 0; index < this.iSites.length; index++) {
      const iSite = this.iSites[index];
      const map: Map<number, IWatch> = this.createFrameSiteWatches(iSite);
      this.mapSites.set(iSite.siteId, map);
    }
    return this.mapSites;
  }
  //ssssnnnnp = site-numday2022-partofday 200321 - 2site 2022-02-01 I duty

  private createFrameSiteWatches(iSite: ISiteJson): Map<number, IWatch> {
    let arr: IWatch[] = [];
    let midnight = this.firstDate;
    let _mapSite = new Map<number, IWatch>();
    this.mapSites.set(iSite.siteId, _mapSite);
    const nDays = this.nDays;

    // watchPlan: number[];[7][[beg.end]]

    const watchPlan: number[][][] = iSite.watchPlan;
    if (!Array.isArray(watchPlan) || watchPlan.length !== 7) {
      return _mapSite;
    }

    let midnightMs = midnight.getTime();
    const midnightStr = dateToString(midnight);

    // const siteId = iSite.siteId;

    for (let nDay = 0; nDay < nDays; nDay++) {
      //let dowNext = (dow + 1) % 7;
      const axe = this.axis[nDay];

      const planArr: number[][] = watchPlan[axe.dow];
      //Number of watches must been at least 2 !!!!

      planArr.forEach((pair, i) => {
        const [_begH, _endH] = pair;
        const _lengthH = (24 + _endH - _begH) % 24;

        const _siteId = iSite.siteId;
        // const _begMS = midnight.getTime() + begH * MS_IN_HOUR;
        // dddd-p-sss(dayN,part,site)
        const _idhw = msToIdw(axe.midMs, _begH, _siteId);
        let watch = {
          idw: _idhw,
          siteId: _siteId, // "2";
          guardId: 0, // "101";
          midnight: axe.midStr,
          beginH: _begH, // new Date(beginS * 1000) from 2022-01-01
          lengthH: _lengthH,
          date: new Date(midnight)
        } as IWatch;

        arr.push(watch);
      });
    }
    arr = arr.sort((a, b) => a.idw - b.idw);
    arr.forEach((watch) => _mapSite.set(watch.idw, watch));
    return _mapSite;
  }
}

import { ISiteJson } from "./isite-json";
import { dateToString, getMidnight, msToId as msToIdh, MS_IN_DAY, MS_IN_HOUR } from "../utils/utils";

export interface IWatch {
    idh5: number;
    siteId: number; // "2";
    guardId: number; // "101";
    midnight : string;
    begin: Date; // new Date(beginS * 1000) from 2022-01-01
    end?: Date;
    lengthH: number; // new Date(endS * 1000);
 };

export function createDaySiteWatches(
  midnight: Date,
  iSite: ISiteJson
): IWatch[] {
  let arr: IWatch[] = [];
  const nDays = 1;
  // watchPlan: number[];[7][[beg.end]]
 
  const watchPlan: number[][][] = iSite.watchPlan;
  if (!Array.isArray(watchPlan) || watchPlan.length !== 7) {
    return arr;
  }
  midnight = getMidnight(midnight);
  let midnightMs = midnight.getTime();
  const midnightStr = dateToString(midnight);

  // const siteId = iSite.siteId;

  for (
    let nDay = 0, dow = midnight.getDay();
    nDay < nDays;
    nDay++, dow = ++dow % 7, midnightMs += MS_IN_DAY
  ) {
    //let dowNext = (dow + 1) % 7;
    const planArr: number[][] = watchPlan[dow];
      //Number of watches must been at least 2 !!!!
 
        planArr.forEach((pair,i)=>{
            const [begH,endH]  = pair;
            const _lengthH = (24 + endH - begH) % 24;
            
           
            const _siteId = iSite.siteId;
            const _begMS = midnight.getTime() + begH * MS_IN_HOUR;
            const _idh5 = msToIdh(_begMS,_siteId);
            const watch = {
                idh5:_idh5,
                siteId: _siteId, // "2";
                guardId: 0, // "101";
                midnight : dateToString(midnight),
                begin: new Date(midnight.getTime() + begH * MS_IN_HOUR), // new Date(beginS * 1000) from 2022-01-01
                end: new Date(midnight.getTime() + (begH + _lengthH) * MS_IN_HOUR);
                lengthH: _lengthH
             } as IWatch;
            arr.push(watch);
      });
   }
  return arr;
}


import { ISiteJson } from "./isite-json";
import { BeginMs2022, dateToString, getDayPartH, getMidnight, msToId as msToIdh, MS_IN_DAY, MS_IN_HOUR } from "../utils/utils";
export interface IWatchJson {
  siteId: number; // "2";
  guardId: number; // "101";
  midnight: string;
  beginH: number; // new Date(beginS * 1000) from 2022-01-01
  lengthH: number; // new Date(endS * 1000);
}
export interface IWatch extends IWatchJson{
    idw: number;
    siteId: number; // "2";
    guardId: number; // "101";
    midnight : string;
    beginH: number; // new Date(beginS * 1000) from 2022-01-01
    lengthH: number; // new Date(endS * 1000);
    date:Date;
 };




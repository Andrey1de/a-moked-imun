import { IWatch } from "../interfaces/iwatch";

export const Begin2022 = new Date('2022-01-01 00:00');
export const BeginMs2022 = Begin2022.getTime();

export const MS_IN_H5 = 5 * 60 * 1000;
export const MS_IN_HOUR = 3600 * 1000;
export const MS_IN_DAY = MS_IN_HOUR * 24;
export const MS_IN_WEEK = MS_IN_DAY * 7;

export enum DayPart {
  Night = 0,
  Morning = 1,
  Noon = 2,
  Evening = 3,
}

export const HEB_DAYS = [
  "א\'",
  "ב\'",
  "ג\'",
  "ד\'",
  "ה\'",
  "ו\'",
  "שבת",
];
export function getMidnight(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
export function getDayPart(date: Date): DayPart {
  return getDayPartH(date.getHours());
}
export function getDayPartH(hr: number): number {
  return (hr / 6) | 0;
}
export function dateToN2022(date: Date) {
  return midMsToN2022(date.getTime());
}
export function midMsToN2022(midMs: number) {
  return ((midMs - BeginMs2022) / MS_IN_DAY) | 0;
}
export function msToIdw(midMs: number, begH: number, siteId: number): number {
  let ret = (siteId % 1000) + ((begH / 6) | 0) * 1000;
  ret += (((midMs - BeginMs2022) / MS_IN_DAY) | 0) * 10000;
  return ret;
}

export function idwParts(idw: number) {
  return {
      siteId:  ( idw % 1000 | 0),
      n2022 : (idw / 10000) | 0, 
      dayPart: ((idw / 1000) % 10|0)
    }
}
 export function correctIWatch(iw: IWatch) {
   if (!!iw.idw && !!iw.date) {
     return iw;
   }
   const _date = new Date(iw.midnight);
   const _idhw = msToIdw(_date.getTime(), iw.beginH, iw.siteId);
   return { ...iw, idw: _idhw, date: _date };
 }

// export function msToIdw(msMidnight :number, begH : number, siteId: number = 0): number {
//   let ret = <number>getDayPartH(begH)+
//   (((msMidnight - BeginMs2022) / MS_IN_DAY) | 0) * 10;
//   ret += (siteId % 1000) * 100000;
//   return ret;
// }
// export function h5ToMS(h5: number): number {
//     return  BeginMs2022  + (h5 / 1000) * MS_IN_H5;// h5 ((ms - BeginMs2022) / MS_IN_H5) | 0;
//   }
// export function h5ToDate(h5: number): {date:Date,siteId:number} {
//     const ms = BeginMs2022 + (h5 / 1000) * MS_IN_H5; ;// h5 ((ms - BeginMs2022) / MS_IN_H5) | 0;
//     return {date:new Date(ms),siteId:h5 % 1000};
// }
export function getHebMonthName(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { month: 'long' };
  return new Intl.DateTimeFormat('he-IL', options).format(date);
}

export function getEngMonthName(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { month: 'long' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}



export function dateToHours(date: Date): string {
  let min = date.getMinutes();
  let str: string =
    min == 0
      ? date.getHours().toString()
      : (date.getHours() + min / 60).toFixed(2);

  return str;
}


export function addDays(date: Date, nDays: number): Date {
  return new Date(date.getTime() + nDays * MS_IN_DAY);
}
export function addHours(date: Date, nHours: number): Date {
  return new Date(date.getTime() + nHours * MS_IN_HOUR);
}
export function dateToString(date: Date, isTime: boolean = false): string {
  let str = `${p2(date.getFullYear())}-${p2(date.getMonth() + 1)}-${p2(
    date.getDate()
  )}`;
  if (isTime) {
    //|| date.getHours() != 0 || date.getMinutes() != 0) {
    str += ` .${dateToTimeString(date)}`;
  }
  return str;
}
export function dateToTimeString(date: Date) {
  return `${p2(date.getHours())}:${p2(date.getMinutes())}`;
}
export function hrToTimeString(hr : number) {
  hr %= 24;
  const min = Math.round((hr * 60) % 60);
  hr = hr | 0; 
  let ret =  p2(hr);
  if (min !== 0) ret += ':' + p2(min);
  return `${hr}:${p2(min)}`;
}
function p2(p: number): string {
  const str: string = p.toString();
  return str.length < 2 ? '0' + str : str;
}

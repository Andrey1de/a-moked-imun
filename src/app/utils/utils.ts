export const Begin2022 = new Date('2022-01-01 00:00');
export const BeginMs2022 = Begin2022.getTime();

export const MS_IN_H5 = 5 * 60 * 1000;
export const MS_IN_HOUR = 3600 * 1000;
export const MS_IN_DAY = MS_IN_HOUR * 24;
export const MS_IN_WEEK = MS_IN_DAY * 7;

export enum DayPart {
  AllDay = 0,
  Morning = 1,
  Noon = 2,
  Night = 3,
}

export const HEB_DAYS = [
  'א' + "'",
  'ב' + "'",
  'ג' + "'",
  'ד' + "'",
  'ה' + "'",
  'ו' + "'",
  'שבת',
];
export function getMidnight(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() , date.getDate());
}
export function msToIdw(midMs: number, begH: number, siteId: number): number {
  let ret = <number>getDayPartH(begH);
  ret += (((midMs - BeginMs2022) / MS_IN_DAY) | 0) * 10;
  ret += (siteId % 1000) * 100000;
  return ret;
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
export function dateToHours(date: Date): string {
  let min = date.getMinutes();
  let str: string =
    min == 0
      ? date.getHours().toString()
      : (date.getHours() + min / 60).toFixed(2);

  return str;
}

export function getDayPart(date: Date): DayPart {
  return getDayPartH(hr);
}
export function getDayPartH(hr: number): DayPart {

  if (hr < 10) return DayPart.Morning; //SkyBlue
  if (hr < 17) return DayPart.Noon; //Sun;
  return DayPart.Night;
}

export function addDays(date: Date, nDays: number): Date {
  return new Date(date.getTime() + nDays * MS_IN_DAY);
}
export function addHours(date: Date, nHours: number): Date {
  return new Date(date.getTime() + nHours * MS_IN_HOUR);
}

function p2(p: number): string {
  const str: string = p.toString();
  return str.length < 2 ? '0' + str : str;
}

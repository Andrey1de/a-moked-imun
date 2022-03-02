

export interface IWatchJson{
    idh5: number;
    siteId: number;// "2";
    guardId: number;// "101";
    begin: Date; // new Date(beginS * 1000) from 2022-01-01
    end?: Date;
    lengthH: number;// new Date(endS * 1000);
  
};

export interface IWatchDB{
    siteId: number;// "2";
    guardId: number;// "101";
    begin5: number; // new Date(beginS * 1000) from 2022-01-01 by 5 min
    length5 : number;// by 5 min 8 => 
  
};
const BASE_DATE = new Date('2022-01-01');
const BASE_DATE_MS = BASE_DATE.getTime();
const MS_IN_MIN = 60 * 1000;
const MS_IN_QUANT = 5 * MS_IN_MIN;



export function watchJsonToDb(int:IWatchJson): IWatchDB {
    const to5 = (d:Date):number=>{
        const delT =  (d.getTime() - BASE_DATE_MS) / (MS_IN_MIN * 5);
        return delT | 0 ;
        };
    return {
      siteId: int.siteId, // "2";
      guardId: int.guardId, // "101";
      begin5: to5(int.begin), // new Date(beginS * 1000) from 2022-01-01 by 5 min
      length5: (int.lengthH * 12) | 0, // lengthH = length5 / 12
    } as IWatchDB;
}

export function watchDBToJson(int: IWatchDB): IWatchJson {
  const from5 = (n: number): number => {
    const ms = (n * MS_IN_QUANT) + BASE_DATE_MS;
    return ms
  };
  const msBegin = from5(int.begin5);
  return {
    siteId: int.siteId, // "2";
    guardId: int.guardId, // "101";
    begin: new Date(msBegin), // new Date(beginS * 1000) from 2022-01-01 by 5 min
    lengthH: int.length5 / 12, // lengthH = length5 / 12,
    end: new Date(msBegin + int.length5 *  MS_IN_QUANT)   
  } as IWatchJson;
}

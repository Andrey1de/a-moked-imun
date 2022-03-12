import { IWatch } from '../interfaces/iwatch';
import { BeginMs2022, DayPart, getDayPartH, getMidnight, midMsToN2022, MS_IN_DAY } from '../utils/utils';
import { WatchCell } from './watch-cell';

export class SiteWatchesRow {
  public watches: (WatchCell | undefined)[] = [];
 
  private _nSet = 0;
  public get active(): boolean {
    return this._nSet > 0;
  }

  constructor(
    readonly dayPart: DayPart,
    readonly siteId: number,
    readonly firstDay: number,
    public nDays: number = 7
  ) {
    this.watches = new Array(this.nDays).fill(undefined);
  }

  setWatch(iWatch: IWatch) {
    const _dayPart = getDayPartH(iWatch.beginH);
      if (_dayPart === this.dayPart) {
        const _midNightMs = new Date(iWatch.midnight).getTime();
        const nDay = midMsToN2022(_midNightMs) - this.firstDay;
        if (nDay >= 0 && nDay < this.nDays) {
            this.watches[nDay] = new WatchCell(iWatch);
            this._nSet++;
        }
    }
  }
}
// export class SiteWatchesRow3 {
//   readonly morning!: SiteWatchesRow;
//   readonly noon!: SiteWatchesRow;
//   readonly evening!: SiteWatchesRow;
//   readonly firstDay: number;
  
//   constructor(
//     readonly siteId: number,
//     readonly firstDate: Date,
//     public nDays: number = 7
//   ) {
//     const midMs = this.firstDate.getTime();
//     this.firstDay = midMsToN2022(midMs);
//     this.morning = new SiteWatchesRow(
//       DayPart.Morning,siteId, this.firstDay,this.nDays);

//     this.noon = new SiteWatchesRow(
//       DayPart.Noon,siteId,this.firstDay,this.nDays);

//     this.noon = new SiteWatchesRow(
//       DayPart.Evening,siteId,this.firstDay,this.nDays);
//   }
//   setWatch(iw: IWatch) {
//     const dayPart : DayPart = getDayPartH(iw.beginH);
//     switch (dayPart) {
//       case DayPart.Morning:
//         this.morning.setWatch(iw);
//         break;
//       case DayPart.Noon:
//         this.noon.setWatch(iw);
//         break;
//       case DayPart.Night://?????????????????
//       case DayPart.Evening:
//         this.evening.setWatch(iw);
//         break;

//       default:
//         break;
//     }
//   }
//   setWatches(...iwArr: IWatch[]) {
//     for (const iw of iwArr) {
//       this.setWatch(iw);
//     }
//   }
// }

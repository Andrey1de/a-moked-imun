import { IWatch } from '../interfaces/iwatch';
import { BeginMs2022, DayPart, MS_IN_DAY } from '../utils/utils';
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

  setWatch(iw: IWatch) {
    if (iw.idw % 10 === this.dayPart) {
      const nDay = ((iw.idw / 10) % 10000) - this.firstDay;
      if (nDay >= 0 && nDay < this.nDays) {
        this.watches[nDay] = new WatchCell(iw);
        this._nSet++;
      }
    }
  }
}
export class SiteWatchesRow3 {
  readonly morning!: SiteWatchesRow;
  readonly noon!: SiteWatchesRow;
  readonly night!: SiteWatchesRow;
  readonly firstDay: number;
  constructor(
    readonly siteId: number,
    readonly firstDate: Date,
    public nDays: number = 7
  ) {
    const midMs = this.firstDate.getTime();
    this.firstDay = (midMs - BeginMs2022) / MS_IN_DAY;
    this.morning = new SiteWatchesRow(
      DayPart.Morning,
      siteId,
      this.firstDay,
      this.nDays
    );

    this.noon = new SiteWatchesRow(
      DayPart.Noon,
      siteId,
      this.firstDay,
      this.nDays
    );

    this.noon = new SiteWatchesRow(
      DayPart.Night,
      siteId,
      this.firstDay,
      this.nDays
    );
  }
  setWatch(iw: IWatch) {
    switch (iw.idw % 10) {
      case DayPart.Morning:
        this.morning.setWatch(iw);
        break;
      case DayPart.Noon:
        this.noon.setWatch(iw);
        break;
      case DayPart.Night:
        this.night.setWatch(iw);
        break;

      default:
        break;
    }
  }
  setWatches(...iwArr: IWatch[]) {
    for (const iw of iwArr) {
      this.setWatch(iw);
    }
  }
}

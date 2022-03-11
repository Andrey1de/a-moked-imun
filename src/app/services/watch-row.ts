import { ISiteJson } from '../interfaces/isite-json';
import { IWatch } from '../interfaces/iwatch';
import { MS_IN_DAY, idwParts, BeginMs2022, DayPart } from '../utils/utils';
import { WatchCell } from './watch-cell';

export class WatchRow {
  private _watches!: WatchCell[];
  public isFirst: boolean = false;
  public isLast: boolean = false;
  public siteId!: number;

  readonly firstDay2022!: number;
  public get watches(): (WatchCell | undefined)[] {
    return this._watches;
  }
  constructor(
    readonly iSiteJson: ISiteJson,
    readonly dayPart: DayPart,
    readonly nDays: number,
    readonly firstDate: Date
  ) {
    this.siteId = this.iSiteJson.siteId;
    this.firstDay2022 =
      ((this.firstDate.getTime() - BeginMs2022) / MS_IN_DAY) | 0;

    this._watches = new Array<WatchCell>(this.nDays);
  }

  private _index(idw: number): number {
    const { siteId, n2022, dayPart } = idwParts(idw);
    const n = n2022 - this.firstDay2022;
    const ft =
      siteId == this.siteId &&
      dayPart == this.dayPart &&
      n >= 0 &&
      n < this.nDays;
    return ft ? n : -1;
  }

  setWatch(iw: IWatch): boolean {
    const n = this._index(iw.idw);
    if (n >= 0 && n < this.nDays) {
      this._watches[n] = new WatchCell(iw);
      return true;
    }
    return false;
  }

  getWatch(idw: number): WatchCell | undefined {
    const n = this._index(idw);
    if (n >= 0 && n < this.nDays) {
      return this._watches[n];
    }
    return undefined;
  }
}

import { environment } from 'src/environments/environment';
import { ISiteJson } from '../interfaces/isite-json';
import { IWatch } from '../interfaces/iwatch';
import { MS_IN_DAY, idwParts, BeginMs2022, DayPart } from '../utils/utils';
import { WatchCell } from '../base/WatchCell';
import { WatchHolder } from '../base/WatchHolder';
import { Globals } from '../services/globals';
export class DayPartRows {
  public get size() {
    return this.mapSiteWatcheRow.size;
  }
  public get rows() {
    const arr = [...this.mapSiteWatcheRow.values()];

    arr.forEach((w, idx) => {
      w.isFirst = idx === 0;
      w.isLast = idx === arr.length - 1;
    });

    return arr;
  }
  readonly name: string = '';
  readonly isHeb = environment.direction == 'rtl';
  readonly dayPartBack: string = '';

  readonly dayPartColor: string = 'white';

  readonly faClass: string = 'fas fa-dove';
  readonly mapSiteWatcheRow: Map<number, WatchRow> = new Map<
    number,
    WatchRow
  >();
  constructor(
    readonly dayPart: DayPart,
    readonly nDays: number,
    readonly firstDate: Date
  ) {
    switch (dayPart) {
      case DayPart.Morning:
        this.name = this.isHeb ? 'בוקר' : 'morning';
        this.faClass = 'fas fa-dove';
        this.dayPartBack = 'rgba(178, 252, 255, 0.5)';
        this.dayPartColor = 'rgba(0, 0, 255, 1.0)';
        break;
      case DayPart.Noon:
        this.name = this.isHeb ? 'צהריים' : 'noon';
        this.faClass = 'fas fa-sun';
        this.dayPartBack = 'rgba(178, 252, 255, 1.0)';
        this.dayPartColor = 'rgba(255, 253, 55, 1.0)';
        break;
      case DayPart.Evening:
        this.name = this.isHeb ? 'ערב' : 'night';
        this.faClass = 'fas fa-moon';
        this.dayPartBack = 'rgba(0, 0, 255, 1.0)';
        this.dayPartColor = 'rgba(255, 253, 55, 1.0)';
        break;

      default:
        break;
    }
  }

  //   private _value: string;
  //   public get(): string {
  //     return this._value;
  //   }
  public getRow(siteId: number): WatchRow | undefined {
    return this.mapSiteWatcheRow.get(siteId);
  }

  public setWatch(iw: IWatch): boolean {
    //iSiteJson = iSiteJson || Globals.iSites(iw.siteId);
    const { siteId, n2022, dayPart } = idwParts(iw.idw);
    if (dayPart != this.dayPart) return false;

    let watchRow = this.getRow(siteId);
    if (!watchRow) {
      watchRow = new WatchRow(siteId, dayPart, this.nDays, this.firstDate);
      watchRow.isFirst = true;
      this.mapSiteWatcheRow.set(siteId, watchRow);
    }
    watchRow.setWatch(iw);
    return true;
  }
}
export class WatchRow {
  readonly watches!: WatchCell[];
  public isFirst: boolean = false;
  public isLast: boolean = false;

  readonly firstDay2022!: number;
  readonly site!: ISiteJson;

  constructor(
    readonly siteId: number,
    readonly dayPart: DayPart,
    readonly nDays: number,
    readonly firstDate: Date
  ) {
    this.site = Globals.getISite(this.siteId);
    this.firstDay2022 =
      ((this.firstDate.getTime() - BeginMs2022) / MS_IN_DAY) | 0;

    this.watches = new Array<WatchCell>(this.nDays);
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

  setWatch(iWatch: IWatch): boolean {
    const n = this._index(iWatch.idw);
    if (n >= 0 && n < this.nDays) {
      const watch = new WatchCell(iWatch);
      WatchHolder.setCell(watch);

      this.watches[n] = watch;
      return true;
    }
    return false;
  }

  getWatch(idw: number): WatchCell | undefined {
    const n = this._index(idw);
    if (n >= 0 && n < this.nDays) {
      return this.watches[n];
    }
    return undefined;
  }
}

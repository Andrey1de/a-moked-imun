import { IGuardJson } from '../interfaces/iguard-json';
import { ISiteJson } from '../interfaces/isite-json';
import { IWatch } from '../interfaces/iwatch';
import { DayPart, getDayPartH } from '../utils/utils';
import { globalGuard, Globals, globalSite } from './dal.service';


export class WatchCell {
  readonly siteId!: number;
  readonly midnight!: string;
  readonly dayPart!: DayPart;
  private _guardId!: number; //this.int.guardId;
  isDirty: boolean = false;
  private _Guard: IGuardJson;
  readonly _Site: ISiteJson;
  readonly lengthH: number;
  readonly begStr: string = '';
  readonly endStr: string = '';

  guardName: string = '';
  guardBack: string = 'white';
  guardColor: string = 'black';
  guardAddress: string = '';
  public get guardId(): number {
    return this._guardId;
  }

  constructor(readonly iWatch: IWatch) {
    this.siteId = this.iWatch.siteId;
    this.guardId = this.iWatch.guardId;
    this.lengthH = iWatch.lengthH;
    this.dayPart = getDayPartH(iWatch.beginH);
    this._Site = globalSite(this.siteId);
    this._Guard = globalGuard(this.guardId);
  }
  public set guardId(grd: number) {
    //TBD emit event
    this.isDirty = true;
    this._guardId = grd;
    this._Guard = globalGuard(this._guardId);
    if (this._Guard) {
      this.guardName = this._Guard.name;
      this.guardBack = this._Guard.background;
      this.guardColor = this._Guard.textColor;
      this.guardAddress = this._Guard?.address || '';
    }
  }

  private _dirty: boolean = false;
  public get dirty(): boolean {
    return this._dirty;
  }
  // private set dirty(v : boolean) {
  //   this._dirty = v;
  // }
  // private _watches: Map<number, IWatch> = new Map<number, IWatch>();
  // public get watches(): IWatch[] {
  //   return [...this._watches.values()];
  // }
  // //Info dirty flag for
  // public setWatches(
  //   watches: IWatch[],
  //   dirty: boolean = true,
  //   toFilter: boolean = false
  // ) {
  //   if (toFilter) {
  //     watches = watches.filter(
  //       (w) => w.siteId == this.siteId && w.midnight == this.midnight
  //     );
  //   }
  //   this._dirty = dirty;
  //   this._watches = watches;
  // }
  // public addWatch(watch: IWatch): boolean {
  //   if (
  //     watch.siteId == this.siteId &&
  //     watch.midnight == this.midnight &&
  //     this._watches.find()
  //   ) {
  //     this._watches.push(watch);
  //     re;
  //   }
  // }
}




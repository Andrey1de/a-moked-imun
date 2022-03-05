import { IGuardJson } from '../interfaces/iguard-json';
import { ISiteJson } from '../interfaces/isite-json';
import { IWatch } from '../interfaces/iwatch';
import { DayPart } from '../utils/utils';
import { globalGuard, Globals, globalSite } from './dal.service';


export class WatchCell {
 
  readonly siteId!: number;
  readonly midnight!: string;
  readonly dayPart : DayPart;
  private _guardId!: number; //this.int.guardId;
  public get guardId(): number {
    return this._guardId;
  }
  isDirty: boolean = false;
  private _Guard: IGuardJson;
  readonly _Site: ISiteJson;

  constructor(readonly iWatch: IWatch) {
    this.siteId = this.iWatch.siteId;
    this.guardId = this.iWatch.guardId;
    this.dayPart = this.iWatch.idw % 10;
    this._Site = globalSite(this.siteId);
    this._Guard = globalGuard(this.guardId);
  }
  public set guardId(grd: number) {
    //TBD emit event
    this.isDirty = true;
    this._guardId = grd;
    this._Guard = globalGuard(this._guardId);
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




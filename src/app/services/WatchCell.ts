import { environment } from 'src/environments/environment';
import { IGuardJson } from '../interfaces/iguard-json';
import { ISiteJson } from '../interfaces/isite-json';
import { IWatch } from '../interfaces/iwatch';
import { 
    correctIWatch, 
    DayPart, 
    getDayPartH, 
    hrToTimeString } from '../utils/utils';
import { CWatchHolder } from './WatchHolder';

import { globalGuard, globalSite } from './dal.service';

export class WatchCell {
  readonly isHeb = environment.direction === 'rtl';
  readonly idw!:number;
  readonly siteId!: number;
  readonly midnight!: string;
  readonly dayPart!: DayPart;


 
  isDirty: boolean = false;
  private _Guard!: IGuardJson;
  readonly _Site: ISiteJson;

  beginH!:number;
  lengthH!: number;
  begStr: string = '';
  endStr: string = '';
  watchText: string = '';

  guardId!:number;
  guardName: string = '';
  siteName: string = '';
  guardBack: string = 'white';
  guardColor: string = 'black';
  guardAddress: string = '';
  watchToolTip: string = '';

  constructor(readonly iWatch: IWatch) {
    this.idw =this.iWatch.idw;
    this.iWatch = correctIWatch(this.iWatch);
    this.siteId = this.iWatch.siteId;
    this.midnight = this.iWatch.midnight;
    this.dayPart = getDayPartH(iWatch.beginH);
    this._Site = globalSite(this.siteId);
    this.siteName = this._Site.name;
    this.setBeginLengthH(this.iWatch.beginH, this.iWatch.lengthH);
    this.setGuardId(this.iWatch.guardId);
    this.isDirty = false;
  }
  public setBeginLengthH(beginH: number,lengthH:number){
    this.isDirty = true;
    this.beginH = beginH;
    this.lengthH = lengthH;
    this.begStr = hrToTimeString(beginH);
    this.endStr = hrToTimeString(beginH + lengthH);
  }

  public setGuardId(grd: number) {
    //TBD emit event
    this.isDirty = true;
    this.guardId = grd;
    this._Guard = globalGuard(this.guardId);

    this.guardName = this._Guard.name;
    this.guardBack = this._Guard.background;
    this.guardColor = this._Guard.textColor;
    this.guardAddress = this._Guard?.address || '';
    this.watchText = `${this.lengthH} ${this.guardName}`;

    this.watchToolTip = this.isHeb
      ? `${this.guardName} ${this.lengthH} שעות \n` + `ב ${this.siteName}`
      : `${this.lengthH} ${this.guardName} hrs\n` + `in ${this.siteName}`;
  }

   dirty: boolean = false;

//   isWatch(watch: WatchCell): boolean {
//     return !!watch;
//   }
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


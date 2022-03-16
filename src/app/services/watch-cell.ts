import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { environment } from 'src/environments/environment';
import { IGuardJson } from '../interfaces/iguard-json';
import { ISiteJson } from '../interfaces/isite-json';
import { IWatch } from '../interfaces/iwatch';
import { DayPart, getDayPartH, hrToTimeString } from '../utils/utils';
import { globalGuard, globalSite } from './dal.service';

export class WatchCell {
  readonly siteId!: number;
  readonly midnight!: string;
  readonly dayPart!: DayPart;
  private _guardId!: number; //this.int.guardId;
  isDirty: boolean = false;
  private _Guard!: IGuardJson;
  readonly _Site: ISiteJson;
  readonly lengthH: number;
  readonly begStr: string = '';
  readonly endStr: string = '';
  watchText: string = '';
  readonly isHeb = environment.direction === 'rtl';

  guardName: string = '';
  siteName: string = '';
  guardBack: string = 'white';
  guardColor: string = 'black';
  guardAddress: string = '';
  watchToolTip: string = '';
  public get guardId(): number {
    return this._guardId;
  }

  constructor(readonly iWatch: IWatch) {
    this.siteId = this.iWatch.siteId;
    this.lengthH = iWatch.lengthH;
    this.dayPart = getDayPartH(iWatch.beginH);
    this._Site = globalSite(this.siteId);
    this.siteName = this._Site.name;
    this.guardId = this.iWatch.guardId;
    this.begStr = hrToTimeString(iWatch.beginH);
    this.endStr = hrToTimeString(iWatch.beginH + iWatch.lengthH);
  }

  public set guardId(grd: number) {
    //TBD emit event
    this.isDirty = true;
    this._guardId = grd;
    this._Guard = globalGuard(this._guardId);

    this.guardName = this._Guard.name;
    this.guardBack = this._Guard.background;
    this.guardColor = this._Guard.textColor;
    this.guardAddress = this._Guard?.address || '';
    this.watchText = `${this.lengthH} ${this.guardName}`;

    this.watchToolTip = this.isHeb
      ? `${this.guardName} ${this.lengthH} שעות \n` +
        `ב ${this.siteName}`
      : `${this.lengthH} ${this.guardName} hrs\n` +
        `in ${this.siteName}`;
  }

  private _dirty: boolean = false;
  public get dirty(): boolean {
    return this._dirty;
  }

  isWatch(watch: WatchCell): boolean {
    return !!watch;
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

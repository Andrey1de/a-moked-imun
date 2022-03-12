import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IDayAxis } from 'src/app/interfaces/iday-axis.model';
import { DalService, Globals } from 'src/app/services/dal.service';
import { FrameBuilder } from 'src/app/services/FrameBuilder';
import { DayPartRows, WatchRow } from 'src/app/services/watch-row';
import { dateToString, DayPart, getEngMonthName, getHebMonthName, getMidnight } from 'src/app/utils/utils';
import { environment } from 'src/environments/environment';
const PART_ROW_PERC = 8;
const TITLE_ROW_PERC = 20;

@Component({
  selector: 'app-site-watches',
  templateUrl: './site-watches.component.html',
  styleUrls: ['./site-watches.component.scss'],
})
export class SiteWatchesComponent implements OnInit, OnDestroy {
  firstDate: Date = new Date('2022-03-02');
  nDays: number = 7;
  firstMidStr: string = '';

  private fb?: FrameBuilder;
  readonly leftTopTitle!: string;

  readonly dayPartWidth: number = PART_ROW_PERC;
  readonly titleWidth: number = TITLE_ROW_PERC;
  readonly colWidth!: number;
  public dayPartSites: DayPartRows[] = [];
  readonly isHeb = environment.direction === 'rtl';
  public fbString: string = '';
  get isFrame() {
    return !!this.fb;
  }

  public get dayAxis(): IDayAxis[] {
    return this.fb?.axis || [];
  }

  direction(): string {
    return environment.direction;
  }
  //     this.mapMorning, // 0

  constructor(readonly dal: DalService) {
   // this.nDays = Globals.nDays;
    // this.firstDate = getMidnight(Globals.beginDate);
     this.firstMidStr = dateToString(this.firstDate);
    this.colWidth = (100 - this.titleWidth - this.dayPartWidth) / this.nDays;
    const monthName = this.isHeb
      ? getHebMonthName(Globals.beginDate)
      : getEngMonthName(Globals.beginDate);

    this.leftTopTitle = monthName + ' ' + Globals.beginDate.getFullYear();
  }
  ngOnDestroy(): void {
     Globals.nDays = this.nDays ;
     Globals.beginDate = getMidnight(this.firstDate);
  
  }
  async ngOnInit() {
    // const fb = await this.dal.generateFrame(this.firstMidStr, this.nDays);
    // if (!!fb) {
    //   this.fb = fb;
    //   this.dayPartSites.push(this.fb.mapMorning);
    //   this.dayPartSites.push(this.fb.mapNoon);
    //   this.dayPartSites.push(this.fb.mapEvening);
    // }
  }
  async toGenerateFrame() {
    if (!this.isFrame) {
      this.fb = await this.dal.generateFrame(this.firstMidStr, this.nDays); //new FrameBuilder(new Date(this.firstMidStr), this.nDays, []);
      if (!!this.fb) {
        this.dayPartSites = [];
        this.dayPartSites.push(this.fb.mapMorning);
        this.dayPartSites.push(this.fb.mapNoon);
        this.dayPartSites.push(this.fb.mapEvening);

        const nMorn = this.fb?.mapMorning.size || -1;
        const nNoon = this.fb?.mapNoon.size || -1;
        const nEven = this.fb?.mapEvening.size || -1;
        this.fbString = `Morn:${nMorn}; Noon:${nNoon}; Even:${nEven}`;
      }
    }

    //debugger;
  }
}

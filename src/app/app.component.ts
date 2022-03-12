import { Component, OnInit } from '@angular/core';
import { IDayAxis } from './interfaces/iday-axis.model';
import { IWatch } from './interfaces/iwatch';
import { DalService, Globals } from './services/dal.service';
import { FrameBuilder } from './services/FrameBuilder';
import { dateToString } from './utils/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //public mapSites!: Map<number, Map<number, IWatch>>;
  //public fb?: FrameBuilder;
  // public axis!: IDayAxis[];
  //firstMidStr: string = '2022-02-27';
  // nDays: number = Globals.nDays;
  // isFrame: boolean = false;
  title = 'a-moked-imun';
  firstMidStr: string =  dateToString(Globals.beginDate);
  nDays: number = Globals.nDays;
//   get isFrame(): boolean {
//     return !!this.fb;
//   }
  fbString: string = '';
 // fb?: FrameBuilder;

  constructor(readonly dal: DalService) {
    // Globals.nDays = 7;
    // Globals.beginDate = new Date('2022-06-03');
  }

  async toGenerateFrame() {
    // if (!this.fb) {
    //   this.fb = await this.dal.generateFrame(this.firstMidStr, this.nDays); //new FrameBuilder(new Date(this.firstMidStr), this.nDays, []);
    //    const nMorn = this.fb?.mapMorning.size || -1;
    //   const nNoon = this.fb?.mapNoon.size || -1;
    //   const nEven = this.fb?.mapEvening.size || -1;
    //   if (this.isFrame) {
    //     this.fbString = `Morn:${nMorn}; Noon:${nNoon}; Even:${nEven}`;
    //   }
    // }

    //debugger;
  }
  ngOnInit(): void {
    // const fb = await this.dal.generateFrame(this.firstMidStr, this.nDays); //new FrameBuilder(new Date(this.firstMidStr), this.nDays, []);
    // this.isFrame = !!fb;
    // const nMorn = fb?.mapMorning.size || -1;
    // const nNoon = fb?.mapNoon.size || -1;
    // const nEven = fb?.mapEvening.size || -1;
    // if(this.isFrame){
    //     this.fbString = `Morn:${nMorn}; Noon:${nNoon}; Even:${nEven}`;
    // }
    //d
  }
}

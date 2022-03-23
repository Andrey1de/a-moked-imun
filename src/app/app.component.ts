import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
} from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { DalService } from './services/dal.service';
import { Globals } from './services/globals';
import { dateToString } from './utils/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  beginDateStr!: string;
  nDays!: number;

  //   get isFrame(): boolean {
  //     return !!this.fb;
  //   }
  //fbString: string = '';
  // fb?: FrameBuilder;

  constructor(readonly el: ElementRef, readonly dal: DalService) {
    //  this.direction =
    dal.init();
    this.beginDateStr = Globals.beginDateStr;
    this.nDays = Globals.nDays;
    console.log(
      'AppComponent()=>',
      'beginDate:',
      this.beginDateStr,
      'nDays:',
      this.nDays,
      'direction:',
      Globals.direction
    );

    // Globals.nDays = 7;
    // Globals.beginDate = new Date('2022-06-03');
  }
  ngOnInit(): void {
    this.el.nativeElement.style.direction = Globals.direction;
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
  }
}

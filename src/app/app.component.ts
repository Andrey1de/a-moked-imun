import { Component, OnInit } from '@angular/core';
import { IDayAxis } from './interfaces/iday-axis.model';
import { IWatch } from './interfaces/iwatch';
import { DalService, Globals } from './services/dal.service';
import { FrameBuilder } from './services/FrameBuilder';

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

  constructor(readonly dal: DalService) {
        Globals.nDays = 7;
        Globals.beginDate = new Date('2022-06-03');
        
  }
  ngOnInit(): void {}

}

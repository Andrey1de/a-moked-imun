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
  public mapSites!: Map<number, Map<number, IWatch>>;
  public axis!: IDayAxis[];
  firstMidStr: string = '2022-02-27';
  nDays: number = Globals.nDays;

  constructor(readonly dal: DalService) {}
  ngOnInit(): void {}

  generateFrame() {
    const iWatches = this.dal.retrieveWatches(this.firstMidStr, this.nDays);
    const fb = new FrameBuilder(this.firstMidStr, this.nDays, iWatches);
    this.mapSites = fb.mapSites;
    this.axis = fb.axis;
  }
}

import { Component, OnInit } from '@angular/core';
import { DalService } from 'src/app/services/dal.service';
import { Globals } from 'src/app/services/globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'a-moked-imun';
  isFrame: boolean = false;
  firstMidStr: string = '2022-02-27';
  nDays: number = Globals.nDays;
  fbString: string = '';
  constructor(readonly dal: DalService) {}

  ngOnInit(): void {}

  async toGenerateFrame() {
    const fb = await this.dal.generateFrame(this.firstMidStr, this.nDays); //new FrameBuilder(new Date(this.firstMidStr), this.nDays, []);
    this.isFrame = !!fb;
    const nMorn = fb?.mapMorning.size || -1;
    const nNoon = fb?.mapNoon.size || -1;
    const nEven = fb?.mapEvening.size || -1;
    if(this.isFrame){
        this.fbString = `Morn:${nMorn}; Noon:${nNoon}; Even:${nEven}`;
    }
    
  }
}

import { Component, OnInit } from '@angular/core';
import { DalService, Globals } from 'src/app/services/dal.service';

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
  constructor(readonly dal: DalService) {}

  ngOnInit(): void {}

  async toGenerateFrame() {
         const fb = await this.dal.generateFrame(this.firstMidStr, this.nDays); //new FrameBuilder(new Date(this.firstMidStr), this.nDays, []);
    this.isFrame = !!fb;
  }
}

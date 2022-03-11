import { Component, Input, OnInit } from '@angular/core';
import { DalService, Globals } from 'src/app/services/dal.service';
import { FrameBuilder } from 'src/app/services/FrameBuilder';
const TITLE_ROW_PERC = 20;
@Component({
  selector: 'app-site-watches',
  templateUrl: './site-watches.component.html',
  styleUrls: ['./site-watches.component.scss'],
})
export class SiteWatchesComponent implements OnInit {
    fb!: FrameBuilder;
    @Input() nDays: number = 7;
    @Input() firstDate: Date = new Date('2022-06-03');
    readonly col0Width: number = TITLE_ROW_PERC;
    readonly colWidth!: number;


    constructor(readonly dal: DalService) {
        this.nDays = Globals.nDays;
        this.firstDate = Globals.beginDate;
        this.col0Width = (100 - TITLE_ROW_PERC) / this.nDays;
    }

    ngOnInit(): void {
        this.fb = new FrameBuilder(this.firstDate, this.nDays);
 
    }
}
function Ipnut()
{
    throw new Error('Function not implemented.');
}


import { Component, OnInit } from '@angular/core';
import { DalService } from 'src/app/services/dal.service';

@Component({
  selector: 'app-site-watches',
  templateUrl: './site-watches.component.html',
  styleUrls: ['./site-watches.component.scss']
})
export  class SiteWatchesComponent implements OnInit {

  constructor(readonly dal: DalService) { }

  ngOnInit(): void {
  }

}

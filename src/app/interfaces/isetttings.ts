import { IGuardJson } from 'src/app/interfaces/iguard-json';
import { ISiteJson } from 'src/app/interfaces/isite-json';
import { IWatch } from 'src/app/interfaces/iwatch';

export interface ISetttings
{
  beginDateStr: string;
  nDays: number;
  endDateStr: string;
  dirty: boolean;
  iSites: ISiteJson[];
  iGuards: IGuardJson[];
  iWatches: IWatch[];
}

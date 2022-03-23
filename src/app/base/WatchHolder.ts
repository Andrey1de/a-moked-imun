import { WatchCell } from './WatchCell';

export class CWatchHolder
{
readonly Map: Map<number, WatchCell> = new Map<number, WatchCell>();
  getCell(idw: number)
  {
    return this.Map.get(idw);
  }
  setCell(watch: WatchCell)
  {
    return this.Map.set(watch.idw, watch);
  }
}
export const WatchHolder = new CWatchHolder();

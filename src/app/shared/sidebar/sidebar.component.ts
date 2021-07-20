import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent  {

  // history: string[] = [];

  getHistory():string[]{
    return this.gifsService.history;
  }

  constructor(private gifsService: GifsService) { }

  search(dataFind: string ){
    this.gifsService.searchGifs(dataFind);
  }

}

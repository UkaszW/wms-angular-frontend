import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/item/item.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Array<any>;

  constructor(private itemService: ItemService, private giphyService: GiphyService) {
  }

  ngOnInit() {
    this.itemService.getAll().subscribe(data => {
      this.items = data;
      for (const item of this.items) {
        this.giphyService.get(item.name).subscribe(url => item.giphyUrl = url);
      }
    });
  }

}

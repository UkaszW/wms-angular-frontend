import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../shared/item/item.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit, OnDestroy {

  item: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private itemService: ItemService,
              private giphyService: GiphyService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.itemService.get(id).subscribe((item: any) => {
          if (item) {
            this.item = item;
            this.item.href = item._links.self.href;
            this.giphyService.get(item.name).subscribe(url => item.giphyUrl = url);
          } else {
            console.log(`Item with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/item-list']);
  }

  save(form: NgForm) {
    this.itemService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.itemService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

}

import { Component, OnInit } from '@angular/core';
import { IShortPosts } from '../../models/short-posts.interface';
import { Observable, Subscription } from 'rxjs';
import { Paginate } from '@demo-user/shared/interfaces/paginate';
import { PostsService } from '../../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  items$!: Observable<Paginate<IShortPosts[]>>;

  //#region Limit
  collectionSize: number = 0;
  page = 1;
  limit = 10;
  //#endregion


  subscriptions$ = new Subscription();

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.loadList();
  }

  loadList() {
    this.items$ = this.postsService.getPagedAll(
      this.page,
      this.limit,
    );

    this.items$.subscribe((res) => {
      this.collectionSize = res.collectionSize;
      this.page = res.page;
    });
  }

  onPageChange(page: number) {
    this.page = page;
    this.loadList();
  }
}

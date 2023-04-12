import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IShortPosts } from "../../models/short-posts.interface";

@Component({
  selector: "app-posts-detail",
  templateUrl: "./posts-detail.component.html",
  styleUrls: ["./posts-detail.component.scss"],
})
export class PostsDetailComponent implements OnInit {
  posts!: IShortPosts;

  constructor(
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {
    this.posts = this.activatedRoute.snapshot.data["posts"];
  }

  ngOnInit(): void {}
}

import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'NewsProject';
  sources: any = [];
  categories: any = [];
  articles: any = [];
  articleData: any = [];
  articleId: number = 0;
  selectedNewsChannel: string = "Trending News!";
  query: String = '';
  totalItems: number = 0; // Initialize totalItems to 0

  pageSize: number = 5; // Set page size to 50 articles per page
  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  ngOnInit(): void {
    this.newsApi.initArticles().subscribe((res: any) => {
      console.log(res);
      this.articles = res;
      this.totalItems = this.articles.length; // Update totalItems
    });

    this.newsApi.initSources().subscribe((res: any) => {
      console.log(res);
      this.sources = res;
    });
    this.newsApi.initCategories().subscribe((res: any) => {
      console.log(res);
      this.categories = res;
    });
  }

  constructor(private observer: BreakpointObserver, private cd: ChangeDetectorRef, private newsApi: NewsService) {}

  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width:800px)'])
      .subscribe((res) => {
        if (res?.matches) {
          this.sideNav.mode = "over";
          this.sideNav.close();
        } else {
          this.sideNav.mode = 'side';
          this.sideNav.open();
        }
      });
    this.cd.detectChanges();
  }

  searchCategory(category: any) {
    this.newsApi.getArticlesByCategory(category.name)
      .subscribe((res: any) => {
        this.selectedNewsChannel = category.name;
        this.articles = res;
      });
  }

  articlesPerPage(pageIndex: number): void {
    // Load articles for the specified page index
    this.newsApi.initArticles(pageIndex).subscribe((res: any) => {
      this.articles = res;
    });
  }

  articleById(articleId: String) {
    this.newsApi.getArticleById(articleId).subscribe((res: any) => {
      this.articleData = res;
    })
  }

  searchArticles(query: String) {
    this.newsApi.searchArticles(query).subscribe((res: any) => {
      this.selectedNewsChannel = 'Search'
      this.articles = res;
    })
  }
}

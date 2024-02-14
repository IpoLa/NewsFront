import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  initSources() {
    return this.http.get(`${this.apiUrl}/articles/sources/`);
  }

  initCategories() {
    return this.http.get(`${this.apiUrl}/articles/categories/`);
  }

  initArticles(page?: number) {
    if (page !== undefined) {
      return this.http.get(`${this.apiUrl}/articles/?page=${page}`);
    } else {
      // If no page number is provided, fetch all articles
      return this.http.get(`${this.apiUrl}/articles/?page=1`);
    }
  }
  getArticlesByCategory(category: String) {
    return this.http.get(`${this.apiUrl}/articles/category/${category}/`);
  }

  getArticleById(id?: String) {
    return this.http.get(`${this.apiUrl}/articles/${id}`);
  }

  searchArticles(query: String) {
    return this.http.get(`${this.apiUrl}/articles/search/?query=${query}`);
  }
}

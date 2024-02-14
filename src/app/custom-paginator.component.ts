import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: 'custom-paginator.component.html',
  styleUrls: ['custom-paginator.component.css']
})
export class CustomPaginatorComponent {
  @Input() totalItems: number = 5;
  @Input() pageSize: number = 5;
  @Output() pageSelected = new EventEmitter<number>();

  selectedPageIndex: number = 1;

  get pages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.pageSize);
    const maxButtonsToShow = 4; // Maximum number of buttons to show
    const currentPage = this.selectedPageIndex;
  
    // Calculate the start and end page numbers based on the current page
    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(pageCount, startPage + maxButtonsToShow - 1);
  
    // Adjust startPage and endPage if they exceed boundaries
    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }
  
    // Generate an array of page numbers within the range of startPage to endPage
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
  

  onPageIndexChange(pageIndex: number): void {
    this.selectedPageIndex = pageIndex;
    this.pageSelected.emit(pageIndex);
  }

  onNextPage(): void {
    if (this.selectedPageIndex < this.pages.length) {
      this.selectedPageIndex++;
      this.pageSelected.emit(this.selectedPageIndex);
    }
  }

  onPrevPage(): void {
    if (this.selectedPageIndex > 1) {
      this.selectedPageIndex--;
      this.pageSelected.emit(this.selectedPageIndex);
    }
  }
}

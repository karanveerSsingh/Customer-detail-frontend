// import { CommonModule } from '@angular/common';
// import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
// import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { INVOICE_TABLE_DATA } from '../../utils/demoData';
// import { CommonTooltip } from "../common-tooltip/common-tooltip";

// export interface InVoiceData {
//   inVoiceNo: string;
//   customerName: string;
//   accEnquiryNo: string;
//   fiscalYear: string;
//   dealerParentName: string;
//   dealerCode: string;
//   locationDescriptionCode: string;
//   action: string;
// }
// @Component({
//   selector: 'app-common-table',
//   imports: [MatTableModule, CommonModule, MatPaginatorModule, CommonTooltip],
//   templateUrl: './common-table.html',
//   styleUrls: ['./common-table.scss'],

// })
// export class CommonTable implements AfterViewInit {
//   displayedColumns: string[] = [
//     'inVoiceNo',
//     'customerName',
//     'accEnquiryNo',
//     'fiscalYear',
//     'dealerParentName',
//     'dealerCode',
//     'locationDescriptionCode',
//     'action',
//   ];
//   inVoiceData = new MatTableDataSource<InVoiceData>(INVOICE_TABLE_DATA);
//   totalLength = 0;
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @Input() invoiceDownloadIcon: string = 'assets/images/invoice-download.svg';
//   @Input() invoiceShareIcon: string = 'assets/images/invoice-share.svg';
//   currentPage = 0;
//   pageSize = 10;

//   get pagedData() {
//     const start = this.currentPage * this.pageSize;
//     return this.inVoiceData.data.slice(start, start + this.pageSize);
//   }

//   ngAfterViewInit() {
//     this.inVoiceData.paginator = this.paginator;
//   }

//   onPageChange(event: PageEvent) {
//     this.currentPage = event.pageIndex;
//     this.pageSize = event.pageSize;
//   }
// }
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
// import { LimitWordsPipe } from '@app/pipes/date-pipe/limit-words-pipe.pipe';
import { TableDefinition } from '../../types/common-table-types';
import { LimitWordsPipe } from '../../pipes/date-pipe/limit-words-pipe.pipe';
// import { TableDefinition } from '@app/types/common-table-types';

@Component({
  selector: 'app-common-table',
  imports: [
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    LimitWordsPipe,
    MatSortModule,
    MatTooltipModule,
  ],
  standalone: true,
templateUrl: './common-table.html',
  styleUrls: ['./common-table.scss'],
})
export class CommonTable<T> implements AfterViewInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('tableWrapper') tableWrapperRef!: ElementRef;
  @ViewChild(MatSort) sortDirective!: MatSort;
  readonly listLength = input<number>(0);
  readonly listSize = input<number>(10);
  listPageIndex = input<number>(0);
  readonly columnDirectives = input<{ [key: string]: string } | undefined>({});
  readonly footerDirectives = input<{ [key: string]: string } | undefined>({});
  readonly footerData = input<{ [key: string]: string | number }>({});
  readonly showFooter = input<boolean>(false);
  readonly serverPagination = input<boolean>(true);
  readonly mainHeader = input<string[]>();
  readonly showSecondayHeader = input<boolean>(false);
  readonly secondaryHeader = input<{ displayValue: string; key: string; colspan: number }[]>([]);
  upperHeader = signal<{ displayValue: string; key: string; colspan: number }[]>([]);
  readonly tableDefinitionInput = input<TableDefinition[]>([]);
  readonly dataSourceData = input<T[]>([]);
  readonly page = output<PageEvent>();
  readonly rowClick = output<T>();
  readonly cellClick = output<T>();
  readonly sort = output<{ active: string; direction: string }>();

  readonly secondaryHeaderEffect = effect(() => {
    const data = this.secondaryHeader();
    this.upperHeader.set(data);
    this.secondaryDisplayedColumns = data.map(item => item.key);
  });

  readonly tableDefinitionEffect = effect(() => {
    const value = this.tableDefinitionInput();
    this.tableDefinition = value;
    this.displayedColumns = value.map(item => item.key);
  });
  readonly dataSourceEffect = effect(() => {
    const value = this.dataSourceData();
    this.dataSource.data = (value || []) as Record<string, unknown>[];
    this.mobileVIewDataSource = this.dataSource.data.slice(0, this.listSize());
  });
  mobileVIewDataSource: Record<string, unknown>[] = [];
  listPageSizeOptions: number[] = [5, 10, 25, 100];
  secondaryDisplayedColumns: string[] = [];
  displayedColumns: string[] = [];
  tableDefinition: TableDefinition[] = [];
  dataSource = new MatTableDataSource<Record<string, unknown>>([]);
  expandedRowIndices = new Set<number>();

  lastSortState: { active: string; direction: 'asc' | 'desc' } | null = null;

  ngAfterViewInit() {
    this.pagination();
  }

  pagination() {
    this.paginator.length = this.listLength();
    if (!this.serverPagination()) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sortDirective;
  }

  pageEventTriggered(event: PageEvent) {
    this.page.emit(event);
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.mobileVIewDataSource = this.dataSource.data.slice(startIndex, endIndex);
    setTimeout(() => {
      if (this.tableWrapperRef?.nativeElement) {
        this.tableWrapperRef.nativeElement.scrollLeft = 0;
      }
    }, 100);
  }

  onRowClick(row: T) {
    this.rowClick.emit(row);
  }

  onLinkClick(row: Record<string, unknown>, link = false, event?: Event, tooltip?: MatTooltip) {
    if (link) {
      this.cellClick.emit(row as T);
    }
    if (event) {
      event.stopPropagation();
    }
    if (tooltip) {
      tooltip.toggle();
    }
  }

  getDirective(column: string): string | null {
    const directives = this.columnDirectives();
    return directives?.[column] ?? null;
  }

  getFooterDirective(column: string): string | null {
    const directives = this.footerDirectives();
    return directives?.[column] ?? null;
  }

  isLast(definition: TableDefinition): boolean {
    return this.tableDefinition.indexOf(definition) === this.tableDefinition.length - 1;
  }

  getTooltip(row: unknown, definition: TableDefinition): string | null {
    if (!definition.tooltip) {
      return null;
    }

    if (typeof definition.tooltip === 'function') {
      return definition.tooltip(row);
    }

    if (definition.render) {
      return definition.render(row);
    }

    return String((row as Record<string, unknown>)[definition.dataKey] ?? '');
  }

  getCellValue(row: unknown, definition: TableDefinition): string {
    if (definition.render) {
      return definition.useLimitPipe
        ? this.limitWords(definition.render(row), definition.wordLimit || 20)
        : definition.render(row);
    }
    const value = (row as Record<string, unknown>)[definition.dataKey];
    return definition.useLimitPipe
      ? this.limitWords(String(value ?? ''), definition.wordLimit || 20)
      : String(value ?? '');
  }

  limitWords(value: string, limit: number): string {
    if (!value) {
      return '';
    }
    const words = value.split(' ');
    return words.length > limit ? `${words.slice(0, limit).join(' ')}...` : value;
  }

  truncateHtml(value: string, limit: number): string {
    if (!value) {
      return '';
    }

    const div = document.createElement('div');
    div.innerHTML = value;
    const text = div.textContent || div.innerText || '';

    if (text.length <= limit) {
      return value;
    }

    const truncatedText = `${text.slice(0, limit)}...`;

    const match = value.match(/^<span.*?class="(.*?)".*?>.*<\/span>$/);
    if (match) {
      const className = match[1];
      return `<span class="${className}">${truncatedText}</span>`;
    }

    return truncatedText;
  }

  toggleExpand(idx: number) {
    if (this.expandedRowIndices.has(idx)) {
      this.expandedRowIndices.delete(idx);
    } else {
      this.expandedRowIndices.add(idx);
    }
  }
  getSummaryValue(row: unknown): string {
    const nameValue = (row as { [key: string]: unknown })['name'];
    const dataKeyValue = (row as { [key: string]: unknown })[this.tableDefinition[0].dataKey];
    return String(nameValue ?? dataKeyValue ?? '');
  }

  onSortChange(event: Sort) {
    let newDirection: 'asc' | 'desc' = 'asc';

    if (this.lastSortState?.active === event.active) {
      newDirection = this.lastSortState.direction === 'asc' ? 'desc' : 'asc';
    }

    this.lastSortState = {
      active: event.active,
      direction: newDirection,
    };

    if (this.sortDirective) {
      this.sortDirective.active = event.active;
      this.sortDirective.direction = newDirection;
    }

    this.sort.emit({
      active: event.active,
      direction: newDirection,
    });
  }
}

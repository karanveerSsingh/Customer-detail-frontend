// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-custome-table',
//   imports: [],
//   templateUrl: './custome-table.html',
//   styleUrl: './custome-table.scss',
// })
// export class CustomeTable {

// }
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

import { AfterViewInit, Component, input, Input, output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { INVOICE_TABLE_DATA } from '../../utils/demoData';
import { CommonTooltip } from '../common-tooltip/common-tooltip';

export interface InVoiceData {
  inVoiceNo: string;
  customerName: string;
  accEnquiryNo: string;
  fiscalYear: string;
  dealerParentName: string;
  dealerCode: string;
  locationDescriptionCode: string;
  action: string;
}
@Component({
  selector: 'app-custome-table',
  imports: [MatTableModule, CommonModule, MatPaginatorModule, CommonTooltip, MatSortModule],
  templateUrl: './custome-table.html',
  styleUrls: ['./custome-table.scss'],
})
export class CustomeTable implements AfterViewInit {
  displayedColumns: string[] = [
    'inVoiceNo',
    'customerName',
    'accEnquiryNo',
    'fiscalYear',
    'dealerParentName',
    'dealerCode',
    'locationDescriptionCode',
    'action',
  ];
  inVoiceData = new MatTableDataSource<InVoiceData>(INVOICE_TABLE_DATA);
  totalLength = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sortDirective!: MatSort;
  @Input() invoiceDownloadIcon: string = 'assets/images/invoice-download.svg';
  @Input() invoiceShareIcon: string = 'assets/images/invoice-share.svg';
  readonly sort = output<{ active: string; direction: string }>();
  readonly listLength = input<number>(0);

  lastSortState: { active: string; direction: 'asc' | 'desc' } | null = null;

  currentPage = 0;
  pageSize = 10;

  get pagedData() {
    const start = this.currentPage * this.pageSize;
    return this.inVoiceData.data.slice(start, start + this.pageSize);
  }

  pagination() {
    this.paginator.length = this.listLength();
  }
  ngAfterViewInit() {
    this.pagination();
    this.inVoiceData.paginator = this.paginator;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}

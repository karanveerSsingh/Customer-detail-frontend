// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { StudentService } from '../../services/student';

// @Component({
//   selector: 'app-student',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './student.html',
//   styleUrls: ['./student.scss'],
// })
// export class StudentComponent implements OnInit {
//   students: any[] = [];
//   searchTerm: string = '';
//   newStudent = {
//     customerName: '',
//     customerPhone: '',
//     vehicleName: '',
//     vehicleNumber: '',
//     vehicleChassis: '',
//     vehicleEngineNumber: '',
//     bankName: '',
//     totalFee: 0,
//     paidAmount: 0,
//   };
//   editId: string | null = null;
//   selectedStudentId: string | null = null;
//   paymentAmount: number = 0;

//   constructor(private service: StudentService) {}

//   ngOnInit() {
//     this.loadStudents();
//   }

//   loadStudents() {
//     this.service.getAll().subscribe((data) => (this.students = data));
//   }

//   save() {
//     if (this.editId) {
//       this.service.update(this.editId, this.newStudent).subscribe(() => {
//         this.cancel();
//         this.loadStudents();
//       });
//     } else {
//       this.service.add(this.newStudent).subscribe(() => {
//         this.newStudent = {
//           customerName: '',
//           customerPhone: '',
//           vehicleName: '',
//           vehicleNumber: '',
//           vehicleChassis: '',
//           vehicleEngineNumber: '',
//           bankName: '',
//           totalFee: 0,
//           paidAmount: 0,
//         };
//         this.loadStudents();
//       });
//     }
//   }

//   edit(s: any) {
//     this.newStudent = { ...s };
//     this.editId = s._id;
//   }

//   delete(id: string) {
//     this.service.delete(id).subscribe(() => this.loadStudents());
//   }

//   cancel() {
//     this.editId = null;
//     this.newStudent = {
//       customerName: '',
//       customerPhone: '',
//       vehicleName: '',
//       vehicleNumber: '',
//       vehicleChassis: '',
//       vehicleEngineNumber: '',
//       bankName: '',
//       totalFee: 0,
//       paidAmount: 0,
//     };
//   }

//   search() {
//     const key = this.searchTerm.trim();
//     if (key === '') {
//       this.loadStudents();
//     } else {
//       this.service.search(key).subscribe((res) => {
//         this.students = res;
//       });
//     }
//   }

//   clearSearch() {
//     this.searchTerm = '';
//     this.loadStudents();
//   }

//   // Payment related methods
//   selectForPayment(studentId: string) {
//     this.selectedStudentId = studentId;
//     this.paymentAmount = 0;
//   }

//   addPayment() {
//     if (this.selectedStudentId && this.paymentAmount > 0) {
//       this.service.addPayment(this.selectedStudentId, this.paymentAmount).subscribe(() => {
//         this.cancelPayment();
//         this.loadStudents();
//       });
//     }
//   }

//   cancelPayment() {
//     this.selectedStudentId = null;
//     this.paymentAmount = 0;
//   }

//   // Utility methods for calculations and display
//   getDueAmount(student: any): number {
//     const totalFee = student.totalFee || 0;
//     const paidAmount = student.paidAmount || 0;
//     return Math.max(0, totalFee - paidAmount);
//   }

//   getProgressPercentage(student: any): number {
//     const totalFee = student.totalFee || 0;
//     const paidAmount = student.paidAmount || 0;
//     if (totalFee === 0) return 0;
//     return Math.min(100, Math.round((paidAmount / totalFee) * 100));
//   }
// }

import { CommonModule } from '@angular/common';
import { inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CUSTOMER_DATA } from '../../utils/demoData';
import { StudentService } from '../../services/student';
import { FormsModule } from '@angular/forms';
import { CommonTooltip } from '../../common-components/common-tooltip/common-tooltip';
import { MatIconModule } from '@angular/material/icon';
import { AutoPikerInput } from '../../common-components/auto-piker-input/auto-piker-input';
import { CommonInputComponent } from '../../common-components/common-input/common-input';
import { DialogAddPayment } from '../dialog-add-payment/dialog-add-payment';
import { DialogAddUser } from '../dialog-add-user/dialog-add-user';

export interface CustomerData {
  customerName: string;
  customerPhone: string;
  vehicleName: string;
  vehicleNumber: string;
  vehicleChassis: string;
  vehicleEngineNumber: string;
  bankName: string;
  totalFee: number;
  paidAmount: number;
}

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    CommonTooltip,
    MatIconModule,
    AutoPikerInput,
    CommonInputComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './student.html',
  styleUrls: ['./student.scss'],
})
export class StudentComponent implements OnInit, AfterViewInit {
  students: any[] = [];
  expandedRowIndices = new Set<number>();
  searchTerm: string = '';
  editId: string | null = null;
  selectedStudentId: string | null = null;
  paymentAmount: number = 0;
  readonly dialog = inject(MatDialog);
  readonly paymentAmountSignal = signal(0);

  constructor(private service: StudentService) {}
  newStudent = {
    customerName: '',
    customerPhone: '',
    vehicleName: '',
    vehicleNumber: '',
    vehicleChassis: '',
    vehicleEngineNumber: '',
    bankName: '',
    totalFee: 0,
    paidAmount: 0,
    dueAmount: 0,
    progress: 0,
  };
  displayedColumns: string[] = [
    'customerName',
    'customerPhone',
    'vehicleName',
    'vehicleNumber',
    'vehicleChassis',
    'vehicleEngineNumber',
    'bankName',
    'totalFee',
    'paidAmount',
    'dueAmount',
    'progress',
    'action',
  ];
  customerData = new MatTableDataSource<CustomerData>(CUSTOMER_DATA);
  totalLength = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentPage = 0;
  pageSize = 10;
  monthlyCustomerCount: number = 0;
  lastMonthCustomerCount: number = 0;
  monthlyGrowthPercent: number = 0;

  ngOnInit() {
    this.loadStudents();
  }

    toggleExpand(idx: number) {
    if (this.expandedRowIndices.has(idx)) {
      this.expandedRowIndices.delete(idx);
    } else {
      this.expandedRowIndices.add(idx);
    }
  }

  loadStudents() {
    this.service.getAll().subscribe((data) => {
      this.students = data;
      this.customerData.data = data; // Update mat-table data source
      this.calculateMonthlyCounts();
    });
  }

  calculateMonthlyCounts() {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

  this.monthlyCustomerCount = this.students.filter(s => {
    const created = new Date(s.createdAt);
    return created.getMonth() === thisMonth && created.getFullYear() === thisYear;
  }).length;

  this.lastMonthCustomerCount = this.students.filter(s => {
    const created = new Date(s.createdAt);
    return created.getMonth() === lastMonth && created.getFullYear() === lastMonthYear;
  }).length;

  if (this.lastMonthCustomerCount > 0) {
    this.monthlyGrowthPercent = ((this.monthlyCustomerCount - this.lastMonthCustomerCount) / this.lastMonthCustomerCount) * 100;
  } else {
    this.monthlyGrowthPercent = this.monthlyCustomerCount > 0 ? 100 : 0;
  }
}

  save() {
    if (this.editId) {
      this.service.update(this.editId, this.newStudent).subscribe(() => {
        this.cancel();
        this.loadStudents();
      });
    } else {
      this.service.add(this.newStudent).subscribe(() => {
        this.resetForm();
        this.loadStudents(); // This will update customerData automatically
      });
    }
  }

  edit(s: any) {
    this.newStudent = { ...s };
    this.editId = s._id;
    this.openAddUserDialog();
  }

  delete(id: string) {
    this.service.delete(id).subscribe(() => this.loadStudents());
  }

  resetForm() {
    this.newStudent = {
      customerName: '',
      customerPhone: '',
      vehicleName: '',
      vehicleNumber: '',
      vehicleChassis: '',
      vehicleEngineNumber: '',
      bankName: '',
      totalFee: 0,
      paidAmount: 0,
      dueAmount: 0,
      progress: 0,
    };
  }
  cancel() {
    this.editId = null;
    this.resetForm();
  }

  search() {
    const key = this.searchTerm.trim();
    if (key === '') {
      this.loadStudents();
    } else {
      this.service.search(key).subscribe((res) => {
        this.students = res;
        this.customerData.data = res; // Update mat-table data
      });
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.loadStudents();
  }

  // Payment related methods
  selectForPayment(studentId: string) {
    // Student ka data find karo
    const student = this.students.find((s) => s._id === studentId);

    const dialogRef = this.dialog.open(DialogAddPayment, {
      width: '500px',
      // height: '500px',
      data: student, // Pura student object pass karo
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result && result.amount > 0) {
        // Dialog se amount le kar payment add karo
        this.paymentAmount = result.amount;
        this.selectedStudentId = studentId;
        this.addPayment();
      }
    });
  }

  addPayment() {
    if (this.selectedStudentId && this.paymentAmount > 0) {
      this.service.addPayment(this.selectedStudentId, this.paymentAmount).subscribe(() => {
        this.cancelPayment();
        this.loadStudents();
      });
    }
  }

  cancelPayment() {
    this.selectedStudentId = null;
    this.paymentAmount = 0;
  }

  // Utility methods for calculations and display
  getDueAmount(student: any): number {
    const totalFee = student.totalFee || 0;
    const paidAmount = student.paidAmount || 0;
    return Math.max(0, totalFee - paidAmount);
  }

  getTotalDue(): number {
    return this.students.reduce((total, student) => {
      return total + this.getDueAmount(student);
    }, 0);
  }

  getProgressPercentage(student: any): number {
    const totalFee = student.totalFee || 0;
    const paidAmount = student.paidAmount || 0;
    if (totalFee === 0) return 0;
    return Math.min(100, Math.round((paidAmount / totalFee) * 100));
  }

  get pagedData() {
    const start = this.currentPage * this.pageSize;
    return this.students.slice(start, start + this.pageSize);
  }

  ngAfterViewInit() {
    this.customerData.paginator = this.paginator;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  // openAddUserDialog() {
  //   const dialogRef = this.dialog.open(DialogAddUser, {
  //     panelClass: 'dialog-class',
  //     data: {
  //       newStudent: this.newStudent,
  //       editId: this.editId,
  //       isEdit: !!this.editId,
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       // Dialog से data वापस मिलने पर
  //       if (result.action === 'save') {
  //         this.newStudent = result.studentData;
  //         this.save();
  //       }
  //       this.loadStudents();
  //     }
  //   });
  // }
  openAddUserDialog() {
    const dialogRef = this.dialog.open(DialogAddUser, {
      panelClass: 'dialog-class',
      data: {
        newStudent: this.newStudent,
        editId: this.editId,
        isEdit: !!this.editId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.action === 'save') {
        // सिर्फ save के case में data update करें
        this.newStudent = result.studentData;
        this.save();
      }

      // हमेशा form reset करें - चाहे save हो, cancel हो, या outside click हो
      this.cancel();
      this.loadStudents();
    });
  }
}

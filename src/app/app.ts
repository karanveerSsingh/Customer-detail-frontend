import { Component, signal } from '@angular/core';
import { StudentComponent } from './components/student/student';
import { Register } from './components/register/register';
import { RouterOutlet } from '@angular/router';
import { Login } from './components/login/login';
@Component({
  selector: 'app-root',
  imports: [ RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('students-frontend');
}

// import { Component, inject, signal, TemplateRef, ViewChild } from '@angular/core';
// import { StudentComponent } from './components/student/student';
// import { CommonTable } from './common-components/common-table/common-table';
// import { StudentService } from './services/student';
// import { TableDefinition } from './types/common-table-types';

// @Component({
//   selector: 'app-root',
//   imports: [StudentComponent, CommonTable],
//   templateUrl: './app.html',
//   styleUrl: './app.scss',
// })
// export class App {
//   studentService = inject(StudentService);
//   @ViewChild('actionTemplate') actionTemplate!: TemplateRef<unknown>;

//   protected readonly title = signal('students-frontend');
//   dataSource: any[] = [];

//   tableDefinition: TableDefinition[] = [
//     {
//       key: 'customerName',
//       dataKey: 'customerName',
//       displayValue: 'Customer Name',
//     },
//     {
//       key: 'customerPhone',
//       dataKey: 'customerPhone',
//       displayValue: 'Customer Phone',
//     },
//     {
//       key: 'vehicleName',
//       dataKey: 'vehicleName',
//       displayValue: 'Vehicle Name',
//     },
//     {
//       key: 'vehicleNumber',
//       dataKey: 'vehicleNumber',
//       displayValue: 'Vehicle Number',
//     },
//     {
//       key: 'vehicleChassis',
//       dataKey: 'vehicleChassis',
//       displayValue: 'Vehicle Chassis',
//     },
//     {
//       key: 'vehicleEngineNumber',
//       dataKey: 'vehicleEngineNumber',
//       displayValue: 'Vehicle Engine Number',
//     },
//     {
//       key: 'bankName',
//       dataKey: 'bankName',
//       displayValue: 'Bank Name',
//     },
//     {
//       key: 'totalFee',
//       dataKey: 'totalFee',
//       displayValue: 'Total Fee',
//       render: (row: any) => `₹${row.totalFee || 0}`,
//     },
//     {
//       key: 'paidAmount',
//       dataKey: 'paidAmount',
//       displayValue: 'Paid Amount',
//       render: (row: any) => `₹${row.paidAmount || 0}`,
//     },
//     {
//       key: 'dueAmount',
//       dataKey: 'dueAmount',
//       displayValue: 'Due Amount',
//       render: (row: any) => `₹${this.getDueAmount(row)}`,
//     },
//     {
//       key: 'progress',
//       dataKey: 'progress',
//       displayValue: 'Progress',
//       render: (row: any) => {
//         const percentage = this.getProgressPercentage(row);
//         return `
//           <div class="progress-container">
//             <div class="progress-bar" style="width: ${percentage}%">
//               ${percentage}%
//             </div>
//           </div>
//         `;
//       },
//     },
//     {
//       key: 'action',
//       dataKey: 'action',
//       displayValue: 'Action',
//       // cellTemplate: this.actionTemplate,
//     },
//   ];

//   ngOnInit() {
//     this.loadStudents();
//   }

//     ngAfterViewInit() {
//     // Assign the template after view is initialized
//     const actionCol = this.tableDefinition.find(col => col.key === 'action');
//     if (actionCol) {
//       actionCol.cellTemplate = this.actionTemplate;
//     }
//   }

//   loadStudents() {
//     this.studentService.getAll().subscribe((data) => {
//       this.dataSource = data;
//     });
//   }

//   // Utility methods for calculations
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

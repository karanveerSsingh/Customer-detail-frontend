import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-dialog-history',
  templateUrl: './dialog-history.html',
  styleUrl: './dialog-history.scss',
  standalone: true,
  imports: [CommonModule],
})
export class DialogHistory implements OnInit {
  paymentHistory: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { studentId: string },
    private studentService: StudentService
  ) {}

  ngOnInit() {
    if (this.data?.studentId) {
      this.studentService.getPaymentHistory(this.data.studentId).subscribe((history) => {
        this.paymentHistory = history;
      });
    }
  }
}

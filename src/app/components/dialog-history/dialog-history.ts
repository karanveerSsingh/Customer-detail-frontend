import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student';
import { MatIcon } from "@angular/material/icon";


@Component({
  selector: 'app-dialog-history',
  templateUrl: './dialog-history.html',
  styleUrl: './dialog-history.scss',
  standalone: true,
  imports: [CommonModule, MatIcon],
})
export class DialogHistory implements OnInit {
    readonly dialogRef = inject(MatDialogRef<DialogHistory>);
  paymentHistory: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { studentId: string },
    private studentService: StudentService
  ) {}

    onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.data?.studentId) {
      this.studentService.getPaymentHistory(this.data.studentId).subscribe((history) => {
        this.paymentHistory = history;
      });
    }
  }
}
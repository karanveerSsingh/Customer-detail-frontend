import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIcon],
  templateUrl: './dialog-add-user.html',
  styleUrls: ['./dialog-add-user.scss'],
})
export class DialogAddUser {
  newStudent: any;
  editId: string | null = null;
  isEdit: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogAddUser>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Data को initialize करना
    this.newStudent = data.newStudent
      ? { ...data.newStudent }
      : {
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

    this.editId = data.editId || null;
    this.isEdit = data.isEdit || false;
  }

  onSave() {
    this.dialogRef.close({
      action: 'save',
      studentData: this.newStudent,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

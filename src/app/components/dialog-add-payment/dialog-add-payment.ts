// import { Component, inject, model } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import {
//   MAT_DIALOG_DATA,
//   MatDialogActions,
//   MatDialogClose,
//   MatDialogContent,
//   MatDialogRef,
//   MatDialogTitle,
// } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIcon } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { CustomerData } from '../student/student';

// @Component({
//   selector: 'app-dialog-add-payment',
//   imports: [
//     MatIcon,
//     MatFormFieldModule,
//     MatInputModule,
//     FormsModule,
//     MatButtonModule,
//     MatDialogTitle,
//     MatDialogContent,
//     MatDialogActions,
//     MatDialogClose,
//   ],
//   templateUrl: './dialog-add-payment.html',
//   styleUrl: './dialog-add-payment.scss',
// })
// export class DialogAddPayment {
//   readonly dialogRef = inject(MatDialogRef<DialogAddPayment>);
//   readonly data = inject<CustomerData>(MAT_DIALOG_DATA);
//   readonly customerName = model(this.data.customerName);

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CustomerData } from '../student/student';

@Component({
  selector: 'app-dialog-add-payment',
  imports: [
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './dialog-add-payment.html',
  styleUrl: './dialog-add-payment.scss',
})
export class DialogAddPayment {
  readonly dialogRef = inject(MatDialogRef<DialogAddPayment>);
  readonly data = inject(MAT_DIALOG_DATA); // Ye any type hona chahiye
  paymentAmount: number = 0;

  get customerName(): string {
    return this.data?.customerName || 'Unknown Customer';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddPayment(): void {
    if (this.paymentAmount > 0) {
      this.dialogRef.close({ amount: this.paymentAmount });
    }
  }
}

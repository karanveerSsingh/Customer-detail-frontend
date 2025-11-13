// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AuthService } from '../../service/auth-service';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-login',
//   imports: [
//     FormsModule,
//     MatFormFieldModule,
//     MatIconModule,
//     MatInputModule,
//     CommonModule,
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//   ],
//   templateUrl: './login.html',
//   styleUrls: ['./login.scss'],
// })
// export class Login {
//   // email = '';
//   // password = '';
//   loginForm!: FormGroup;

//   constructor(private fb: FormBuilder, private auth: AuthService) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//     });
//   }

//   // onLogin() {
//   //   this.auth.login({ email: this.email, password: this.password }).subscribe((res) => {
//   //     // console.log(res);
//   //     alert('Login successful');
//   //   });
//   // }
//   onLogin() {
//     if (this.loginForm.invalid) {
//       alert('Please enter a valid email and password.');
//       return;
//     }

//     const { email, password } = this.loginForm.value;

//     this.auth.login({ email: email!, password: password! }).subscribe({
//       next: (res) => {
//         console.log('Response:', res);
//       },
//       error: (err) => {
//         console.error('Login error:', err);
//       },
//     });
//   }
// }

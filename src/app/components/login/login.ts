import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  email = '';
  password = '';
  loginForm!: FormGroup;

//   constructor(private fb: FormBuilder, private auth: AuthService) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//     });
//   }
  constructor(private router: Router) {}


  // onLogin() {
  //   this.auth.login({ email: this.email, password: this.password }).subscribe((res) => {
  //     // console.log(res);
  //     alert('Login successful');
  //   });
  // }
 onLogin() {
    // Yahan aap apna credential check logic lagayein
    if (this.email === '123456' && this.password === '123456') {
      this.router.navigate(['/student']);
    } else {
      alert('Invalid credentials');
    }
  }
}

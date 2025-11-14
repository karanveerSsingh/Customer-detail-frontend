import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  name = '';
  email = '';
  password = '';

  constructor(private router: Router) {}

//   onSubmit() {
//     // Yahan aap apna credential check logic lagayein
//     if (this.email === 'test@example.com' && this.password === '123456') {
//       this.router.navigate(['/student']);
//     } else {
//       alert('Invalid credentials');
//     }
//   }
}

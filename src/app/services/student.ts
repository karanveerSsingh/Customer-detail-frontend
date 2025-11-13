// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map, Observable } from 'rxjs';
// import { environment } from '../../environments/environment';

// @Injectable({ providedIn: 'root' })
// export class StudentService {
//   private apiUrl = environment.baseApiPath;
//   // private apiUrl = 'http://localhost:3000/api/customers'; 
//   // private apiUrl = 'http://192.168.1.27:3000/api/customers'; 

//   constructor(private http: HttpClient) {}

//   // getAll(): Observable<any[]> {
//   //   return this.http.get<any[]>(this.apiUrl);
//   // }
//   getAll(): Observable<any[]> {
//     return this.http.get<{ data: any[] }>(this.apiUrl).pipe(map((res) => res.data));
//   }

//   add(student: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, student);
//   }

//   update(id: string, student: any): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/${id}`, student);
//   }

//   delete(id: string): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/${id}`);
//   }

//   search(keyword: string): Observable<any[]> {
//     return this.http
//       .get<{ data: any[] }>(`${this.apiUrl}/search/${keyword}`)
//       .pipe(map((res) => res.data));
//   }

//   addPayment(id: string, amount: number): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/${id}/pay`, { amount });
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private apiUrl = 'http://localhost:3000/api/customers';
  // private apiUrl = 'http://192.168.1.27:3000/api/customers';

  constructor(private http: HttpClient) {}

  // .. Get all customers (unwrap `data`)
  getAll(): Observable<any[]> {
    return this.http.get<{ data: any[] }>(this.apiUrl).pipe(
      map(res => res.data)
    );
  }

  // .. Add customer
  add(student: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, student);
  }

  // .. Update customer
  update(id: string, student: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, student);
  }

  // .. Delete customer
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // .. Search customers (unwrap `data`)
  search(keyword: string): Observable<any[]> {
    return this.http.get<{ data: any[] }>(`${this.apiUrl}/search/${keyword}`).pipe(
      map(res => res.data)
    );
  }

  // .. Add payment
  addPayment(id: string, amount: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/pay`, { amount });
  }

    getMonthlyCustomerCount(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count/monthly`).pipe(
      map(res => res.count)
    );
  }
}

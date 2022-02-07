import { APIResponseVM } from './../ViewModels/apiresponse-vm';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenricApiHandlerService {

  httpOption;

  constructor(private httpClient: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  private setHeaders(key: string, value: string) {
    this.httpOption.headers.set(key, value)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Err. ocured try again'));
  }

  getAll(APIRoute: string): Observable<APIResponseVM> {
    return this.httpClient.get<APIResponseVM>(`${environment.APIURL}/${APIRoute}`)
  }

  // getById(id: number): Observable<APIResponseVM> {

  // }

  // post(newObj: any): Observable<APIResponseVM> {

  // }

  // put(id: number, newObj: any): Observable<APIResponseVM> {

  // }

  // delete(id: any): Observable<APIResponseVM> {

  // }

}

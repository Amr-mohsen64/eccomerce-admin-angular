//api daynamic
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IProduct } from './../Models/iproduct';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  httpOption;

  constructor(private httpClient: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
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

  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.APIURL}/products`);
  }

  getProductByCatId(catId: number): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.APIURL}/products?categoryID=${catId}`);
  }

  getProductById(productId: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${environment.APIURL}/products/${productId}`);
  }


  // add
  addProduct(newProduct: IProduct): Observable<IProduct> {
    return this.httpClient
      .post<IProduct>(`${environment.APIURL}/products`, JSON.stringify(newProduct), this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  //update
  updateProduct(productId: number, updateProd: IProduct) {
    return this.httpClient
      .put<IProduct>(
        `${environment.APIURL}/products/${productId}`,
        JSON.stringify(updateProd),
        this.httpOption
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  //delete
  deletProduct(productId: number) {
    return this.httpClient.delete<IProduct>(
      `${environment.APIURL}/products/${productId}`,
      this.httpOption
    );
  }

}

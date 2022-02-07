import { Injectable } from '@angular/core';
import { from, Observable, observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PromotionAdsService {
  private adsList: string[];
  constructor() {

    //ads
    this.adsList = [
      "Big Discount ",
      "Sale Up To 50%",
      "Watch Our white Friday offers",
      // "",
      "Speical white Friday offers up to 70%",
    ]
  }

  getSheduleAds(intervalInSeconds: number): Observable<string> {
    return new Observable<string>((observer) => {

      let counter = 0;
      let addsTimer = setInterval(() => {
        console.log("interval !");

        if (counter == this.adsList.length) {
          observer.complete()
        }

        if (this.adsList[counter] == "") {
          observer.error("Error : Empty Ad")  //will stop observer
        }

        observer.next(this.adsList[counter])
        counter++
      }, intervalInSeconds * 1000);

      return {
        unsubscribe() {
          //will unsbscribe in this cases 
          // 1-Error 
          // 2-complete 
          // 3-unsubscribe
          //it wil stop the interval after complete of the obesrvable
          clearInterval(addsTimer)
          console.log("in unsbscirbe");

        }
      }
    })
  }


  getSerialAdds(): Observable<string> {
    // return from(this.adsList)  // take array
    return of("li1" ,"li2","l3")  // take ;ist of items
  }

}

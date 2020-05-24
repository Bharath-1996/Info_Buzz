import { Injectable } from '@angular/core';
import { AngularFireList,AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageDetailList:AngularFireList<any>

  constructor(private firebase:AngularFireDatabase) { }


getImageDetailList()
{
  this.imageDetailList=this.firebase.list('imageDetails');
}

  insertImageDetails(imageDetails)
  {
    this.imageDetailList.push(imageDetails);
  }
}

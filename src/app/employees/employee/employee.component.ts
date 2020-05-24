import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { format } from 'url';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule, AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  imgsrc:string;
  selectedimage:any=null;
  issubmitted: boolean;
formTemplate=new FormGroup({
  imageUrl:new FormControl('',Validators.required)
})
  
  constructor(public service: EmployeeService,private firestore:AngularFirestore,private toastr:ToastrService,public afAuth:AngularFireAuth,public storage:AngularFireStorage,private imgservice:ImageService) { }

  ngOnInit() {
    this.resetForm();
    let uid=this.afAuth.auth.currentUser.uid;
    this.uploadformreset();
    this.imgservice.getImageDetailList();
  }
  resetForm(form?:NgForm)
  {
    if(form!=null)
    form.resetForm();  
      
    this.service.formData={
      id:null,
      fullName:'',
      position:'',
      empCode:'',
      mobile:'',
      email:'',
      imageUrl:'',
    }

  }
  onSubmit(form:NgForm)
  {
    let data=Object.assign({},form.value);
    delete data.id;
    if(form.value.id==null)
      this.firestore.collection('employees').add(data);
    else
      this.firestore.doc('employees/'+form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Submitted successfully','Emp Reg');
  }
populateforms(emp)
{
  this.service.formData.email=emp.email;
  this.service.formData.empCode=emp.empCode;
  this.service.formData.fullName=emp.fullName;
  this.service.formData.mobile=emp.mobile;
  this.service.formData.id=emp.id;
  this.service.formData.position=emp.position;
}
showpreview(event:any)
{
  if(event.target.files && event.target.files[0])
  {
    const reader=new FileReader();
    reader.onload=(e:any) => this.imgsrc=e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.selectedimage=event.target.files[0];
  }
  else{
    this.imgsrc='/assets/img/clickheretoupload.jpeg';
    this.selectedimage=null;
  }
}
uploadpic(formValue)
{
  this.issubmitted=true;
  if(this.formTemplate.valid)
  {
    var filePath='images/'+this.afAuth.auth.currentUser.uid;
    const fileRef=this.storage.ref(filePath);
    this.storage.upload(filePath,this.selectedimage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          formValue['imageUrl']=url;
          formValue['uid']=this.afAuth.auth.currentUser.uid;
          this.firestore.collection('imagedetails').add(formValue);
          this.uploadformreset();
        })
      })
    ).subscribe();
    //console.log(filePath);
  }
}
get formControls()
{
  return this.formTemplate['controls'];
}
uploadformreset()
{
  this.formTemplate.reset();
  this.formTemplate.setValue({
    imageUrl:''
  });
  this.imgsrc='/assets/img/clickheretoupload.jpeg';
  this.selectedimage=null;
  this.issubmitted=false;
}
}

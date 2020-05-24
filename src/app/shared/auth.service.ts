import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { isNullOrUndefined } from 'util';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user:Observable<firebase.User>;
  
  constructor(public afAuth:AngularFireAuth,public router:Router,private toaster:ToastrService,private firestore:AngularFirestore) 
  {
    
  }
  profile:Employee;
  showSpinner=false;
  
  signup(email:string,password:string)
  {
    var options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-center-center",
      //"positionClass":"toast-bottom-full-width",
      "preventDuplicates": false,
      "showDuration": 600,
      "hideDuration": 5000,
      "timeOut": 7000,
      "extendedTimeOut": 8000,
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
      };
    this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(
      value => {
        this.toaster.success('Registered Successfully, you need to verify your email before login, check your email inbox/spam/promotions folders','Emp.Register',options);
        //this.toaster.show('You need to verify the email!...','Verify Email',options);
        this.updatetable(email);
        this.SendVerificationMail();
        this.router.navigate(['sign-in']);
      }
    ).catch( err => {
      const errorCode = err.code;
      const errorMessage = err.message;
      if (errorCode === 'auth/email-already-in-use') {
        // Call function X to sign user in instead
      this.toaster.warning('This email ID already used by someone else!..','Error',options);
      this.router.navigate(['sign-up']);
      return;
      } 
      this.toaster.warning('something went wrong!..','Error',options);
      this.router.navigate(['sign-up']);
     })
  }
  updatetable(email:string)
  {
    let data={};
    data['empCode']='';
    data['fullName']='';
    data['mobile']='';
    data['position']='';
    data['email']=email;
    data['imageUrl']='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMQEhUSEA8VFhMVEhUVFRMYFRUVEBIRFxUWFhUXFhUYHSggGB0lGxUWITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDw0NDisZFRkrKzctKysrKzcrKzIrKy03LTcrKys3Kzc3LS0rKysrKysrKysrKystKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EAEAQAAIBAgMEBggEAwcFAAAAAAABAgMRBCExBRJBURMiMmFxgQYUUpGhscHRQlNiknLh8BUWIzSCorJEY2R0wv/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8A+4AAqgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMZTS+3E58RilDtSUe7WfuA6WzHpVwz8MyGrbWX4IX75Z/A5Ku0KktZteGXyCVY3UfsvzaS+Zh6xzcP3/yKtKTerbPAVavWOTh+/wDkZqo+V/BpoqR6nbRgq29KuN14r6mUXfQrFLHVI6Tfnn8zqo7W9uCffHJgTwOPDYyM+zK79l5S/mdMZrTjyCswAAAAAAAAAAAAAAAAAAAPJOwHporV1FXbtHnz8FxNONxigry14R4vvfcQOJxMqjvJ+C4LwCOzFbVbuqfVXtfjfnwI5u+bPAEAAAAAAAAAAAO7C7TlHKfWj39peDOEAWjDYlTV4u64+1HxR0J3KlRqyg7xdmT2Axyqd0uMeD70FSAPIyuehQAAAAAAAAAAAAAZxY7FqCu9fwrm+b7jdiKqim5dla9/JFaxWIdSTk/JcEuQRjVqubcpO7ZgAEAAAAAA58XjqdFXqTUe7i/BLMjfSHbXQLchnUa8oLn4lLq1ZTblKTberebYVcZ+lNFaKb77JfNm7D+kdCbs5OL/AFKy96KKAR9QhJNXTTT4rNHp8+2TtaeHlk7wv1oPR+HJl7wmJjVgpwd017uaYG4ABA9jJp3Ts1xPABYNnY3pF+tar2lzXeSEXfNFSpVHBqUXZosWExKklJaN2a9mf2YXHYAAoAAAAAAAAY1JWX9amRy4yvuRcvZWX8T0/rvAitsYi76NPKOr5yI09bvmzwMgAAGuvXjTi5TklFatmwoW3tqOvUdn/hxdorg/1PxAl8X6WJO1Knf9UnZe5HND0tqXzpQa7rpldAWNuKrupOU5ayd39jUCd2JsqO66+IypJZJ/i7/D5gQQLBtbZkKlNYjCrq260Fw5u3C3FFfChY/Q3GWnKk3lJby7pLX4fIrh7GTWadn8QPqAPnWF2pWpO8KsvBu8X5Mt+w9tRxCs1u1FquDXNBIlgAEDs2biNyVpdmWT+jOMAWyhLWL1jk+9cGbSMwOIvGM3qnuT8H2X77e9kmGgAAAAAAABsg9tVcox59d+ehM1tLc7L36lb2nU3qsnydvdkE1ygAIA8k7ZvQpe2vSCdVuNKTjTWV1lKfe3wXcBZts4pQo1LSW9uNJXV7vLQ+ehgKAHfsfZksROyyis5S5Lku8K6NgbJ6Z79TKlHNt5KVuF+XMbe2t00tyGVKOUVpvW4tfI37f2nG3q9DKnHJtfia4eHzIECS2JtV4eeecJdqP1XedO39lKH+NRzpSzy0i39CEJrYG1VTvSq50p5Z6Rb+gEKCU25sp4eV4505dl8u5kWAN2DxDpTjOOsWn4rivcaQB9QhPeSa0aTXgz0rPo3txyao1fCEvDSL+5ZgyAADv2RK8pU3pOLXmtCcwlTeim9dH/ABLJ/FFYw9TdlGXJpljwrtOpHvU14SWfxTC46gAFAAAAAGuo814t+STKnN3bfN3LTieL/RP6FVCaAAIivSes4YeVtZNR8m8/gUM+gekOGdWhNLVWkv8AS7v4XPn4XAABQu8cDL1aMMLKKUleU23d3WdrLUpBnGpJaSa8G0ETk/RSqk3vwyV/xfYgCyeiU2+mu2+otW37RW0FCcw/oxVnGMlOFpJNa3s/IgyyekE2sPhrNrq8Hb8MQiUwezpRoypYmUZU0smm7xXmuHApDMpVZPWTfi3YwCgAA9jJp3TzWa8UfTMNU34Rl7UU/ej5rQpOclGKu5NJeZ9Lo092KiuCS9ysE1mAAgWHDT69N+1R+Ks/qyvE3hX/AJd9018AuJYABQAAAABoxWj/AIJ/QqpbaqzXfde9fyKnJWyCa8AAQKxtr0bcm50LZ5uGmf6fsWcAfOJ7OrRdnRn+1mPqNX8qf7WfSQFr5t6jV/Kn+1j1Gr+VP9rPpIBVU9FaE4dNvQlG8Fa6avrzKyj6hUjdNc00VT+6Evz1+1/cCtFm27RlPD4fdi5WjnZN/hXI8/uhL89ftf3LPhKW5CML33YpX52VgPnfqNX8qf7WPUav5U/2s+kgFfNvUav5U/2s20NlVpu0aMvFqy97PogBULsLYSodebTqf7Yru5vvJoAIAAATWH/6f/W/gQpPUY9ejH2aTb80kFSYACgAAAADCrpfk0/v8CtbRp7tSS77+TzLPJXyZBbapdmfduvxQTUYAAgAAIqjtZyddbi/wU7Z9q19eWh07LxvTUo1GlFyvlfk7EJhnaWOvyf/ANHFUjfD4RXavUkrrJ2ckgq17QxXR0p1I2bir91/IbPxPSUoVJWW9FN8l7ysun0XrlKDe4oJpN3s7r7mUF0jwdGd+jdO7V2t59b7fEC23/rgeKSejuVLC4mMaFWnVUpxVfchG7Tb4K/LL4mOCnOi8TFR3LUt5QUt5QeWj8wie2jtJ0qlKEVFqpLdb4rNcvEkWyl0cLGDwk023UleWd03vIm/SinaNOqtadSLf8La+tgJm/eFJapqxTcRUfRVaibSrYndv/21f7/A3yh0NTE0ad+j9Xct27dpbqz+L94Fr3lzQ3lzX8yoJ9TBZ/jf/NHVsvCKpiq0pN2p1d5JPJybeb93xAswAAAADOjDeklzaRP4frV5vhGMYL5si9kQ67k9IRcn9CV2RHqOT1nJyfm8gruAAUAAAAADjx9DfjKPF9ZfxI7DCosstdUBUQd21sPuy3l2ZZ+EuKOEMgAAi8dsGlWm5tyi32t12UvHI4/SHBZYenCD3VO2SfVj1VqtPEnK9aMIuU5KMVq3oc8NqUXB1FVW4nZvPJvS6A0UNiU4QqQTk+k7Um0528bHtbYtOUIQvJdGrQmmlNedjrWMg5RjvrelHeiuLjrc1LatGyfSxs5OKedt5aoDRLYVLouizSUt7ev19/ncywuxadOUpXnJzhuy3nfeXF6XudOEx1Otfo5qVtbcDmeJaxEk60dxU79HbrJ6uV7aAaKPo7Sg4tSneEt6N5Ky42tbQ2+kNR9E4Rpucqj3FbRPW79xtjtig2kq0etpn8+Rsw20aVRScKiaj2nyXMDRS2TD1eNCaukldrXf1bXm2e4PY9OkpdqTmt2UpO8nHSxtwu06VV7tOopPlxt3X1Mau1qMJOMqsU46rkBx0fRylFxalUvGSkryVlZ3ta2h3YTZ8aU6k4t3qO8rtWWryy7z3FbRpUknOolvZrm1zsdFOaklKLTTV01o0BkAAAB07Pw/STz7Kzk+FgOuFNxpRgu3Wl7of18ybpwUUktErLwRH4BdJOVV6Lqw8FqySDQAAAAAAAAAAObF0FNOL0fH2ZcGVqtScJOMlmi2tXODaOC6RfqXZftLkwivA9lFp2as1wPAiC9LexSv2OlW9yt3/E4egVWri407bjprTs76s1a3emWitRjNOM4pxeqeaMMNhYUlu04KK5Ja+IFNpV3aGI4U1Tpf7JX+h0YrDblDCRa7VS8u/es/kyz/ANn0txw6KO43dxtk3zM62EhPd3oJ7rvG/wCFrSwENsmCjjMQoqysslkuHDzNWJ/zlX/1pf8AFE/DDQjKU1FKUu1Li/E8lhIOTm4Lecd1y4uPICmdDH1ag91Xddpu2bV9GSEayoV8XJQVo011fwu+7w5Zk/8A2fS3VHoo7sXeKtkpc0Z+p096Utxb01aTt2lyYFXwk3LE4ebnBuUb2glFQTTtF24nFUcPV6ilbpun49u3Hy1LjR2bRg040opxd00s02Q+0tm1a8nFYenBOedW63pRWmWoVyYveeItemr0IqLqX3N1xV7d+pP7Cwzp0Yxcoytezi7xs27WZuxGAp1ElOmpbqsrrNeZuo0owSjFJRWiWiCMwAB7GLbSSzei7yWdHdSoQfWlnUlyjy/r6mFCl0CUmr1ZZQjyvxZJYDC7ibk7zlnJ9/IK6KVNRSjHRKyMwAoAAAAAAAAAAB5KNz0AR2PwKqd0+EuEu595BVabi7SVmi2yjfJnJi8MpK0ldcGu3H7oJFaB2YnZ8o9aPWjzX1RxhAAAAAAAAAAAADpwuBnUzStHjJ5L+YHPGLbsldvhxJOlRVCzkt6q+zBZ272ZULR6mHW9L8VV9leH9e8kMHglDrN703rJ6+QVjgsG0+kqO9R+6K5I7QAoAAAAAAAAAAAAAAAAAANU6PGL3XzWj8VxOHFYOL7cLP24ZrzjqSYArs9lyedOUZrudn7jkqUJR7UWvIs9XCxlm4581lL3o1vDzXZqvwklJe/JhFYBYZ0J8aVKX+1/FGl4fnhF5TQIhATXQf8Aie+aNkaU/wAOGpx8Wn8gRCU6UpdmLfgjrhsues2oLm2vkSnQVpa1YxXKMfqz2OzIXvNym/1Nv4AR9KNKLtTi6s/DqI7Fg51M60rL8uOUfNkhCCSskkuSVkZBWFKmoq0UkuSMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z';
    
    this.firestore.collection('employees').doc(this.afAuth.auth.currentUser.uid).set(data);
  }

  login(email:string,password:string)
  {
    var options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-center-center",
      //"positionClass":"toast-bottom-full-width",
      "preventDuplicates": false,
      "showDuration": 500,
      "hideDuration": 4000,
      "timeOut": 6000,
      "extendedTimeOut": 1000,
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
      };
    this.afAuth.auth.signInWithEmailAndPassword(email,password).then(
       value => {
        
        if(value.user.emailVerified==true)
        {
        sessionStorage.setItem('token',value.user.uid);
        this.toaster.success('Login Successfully','Emp.Login');
        this.router.navigate(['main']);
        }
        else
        {
          this.toaster.warning('Your email is not verified, please verify','Email Verify',options);
          this.SendVerificationMail();
          this.router.navigate(['sign-in']);
        }
      }
    ).catch( err => {
      const errorCode = err.code;
      const errorMessage = err.message;
      //console.log("login error"+errorCode); 
      if (errorCode === 'auth/user-not-found') {
        // Call function X to sign user in instead
      this.toaster.warning('Account does not exist, Please Register!..','Error',options);
      this.router.navigate(['sign-up']);
      return;
      } 
      this.toaster.warning('something went wrong!..','Error',options);
      this.router.navigate(['sign-up']);

    })
  }

  Logout()
  {
    this.afAuth.auth.signOut();
    this.toaster.success('You are logged out!..','Emp.Logout');
    sessionStorage.removeItem('token');
    this.router.navigate(['sign-in'])
  }
  isloggedin()
  {
      
      let user =sessionStorage.getItem('token')
      return !(user === null)     
  }
  isuserlogged()
  {
    let users='';
    if(this.afAuth.auth.currentUser.uid)
    {
      return !(users===null)
    }
    users=sessionStorage.getItem('token')
    return !(users===null)
  }
  // send_verification()
  // {
  //   var user_verify=this.afAuth.auth.currentUser;
  //   user_verify.sendEmailVerification().then(
  //     value => {
  //         this.toaster.show('Verification Email Sent... please verify','Email Verification');
  //     }
  //   ).catch(
  //     err => 
  //     {
  //         this.toaster.warning('Your email address is incorrect','Error');
  //     }
  //   )
  // }
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['sign-in']);
    })
  }
  resetpassword(email:string)
  {
    var options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-center-center",
      //"positionClass":"toast-bottom-full-width",
      "preventDuplicates": false,
      "showDuration": 500,
      "hideDuration": 5000,
      "timeOut": 7000,
      "extendedTimeOut": 1000,
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
      };
    return this.afAuth.auth.sendPasswordResetEmail(email)
    .then(()=>{
      this.toaster.success('Password reset link is sent to your email, please check!..','Reset Password',options);
      this.router.navigate(['sign-in']);
    })
  }
}

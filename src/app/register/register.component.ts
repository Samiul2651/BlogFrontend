import {Component, inject} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  profileForm = new FormGroup({
    userInput: new FormControl('', Validators.required),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  },{
    validators: [Validation.match("userPassword", "confirmPassword")]
  }
  );
  httpClient = inject(HttpClient);
  url = "http://localhost:8080/api/user/register";
  handleSubmit(){
    //alert(this.profileForm.value["userInput"] + " " + this.profileForm.value["userPassword"]);
    let user = {
      email: this.profileForm.value["userEmail"],
      username: this.profileForm.value["userInput"],
      password: this.profileForm.value["userPassword"]
    }
    this.httpClient
      .post(this.url, user, {responseType: 'text'})
      .subscribe((data: string) => {
       if(data == "Registration Successfull"){
          alert("Registration Successfull");
       }
       else{
          alert("Registration Failed");
       }
      });
  }
}

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}

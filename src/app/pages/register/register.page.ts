import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IonInput, MenuController } from '@ionic/angular';
import { UserI } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  dataUser: UserI = {
    name: '',
    email: '',
    uid: '',
    password: '',
    profile: 'user',
    profilePhoto: '',
  };
  registerForm: FormGroup;
  lockLogInButton = false;

  constructor(
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private menuController: MenuController
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, this.passwordValidator()]),
    });

    if (this.menuController) {
      this.menuController.swipeGesture(false, 'menu-content');
    }
  }
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValid =
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!--%*?&])[A-Za-z\d$@$!%*?&].{8,}/.test(
          value
        );
      const passwordValid = isValid;
      return !passwordValid
        ? { noPasswordValid: { passwordValid: false } }
        : null;
    };
  }

  registerButton(name: IonInput, email: IonInput, password: IonInput) {
    this.dataUser.name = name.value.toLocaleString();
    this.dataUser.email = email.value.toLocaleString();
    this.dataUser.password = password.value.toLocaleString();
    this.auth
      .registerUser(this.dataUser)
      .then((res) => {
        console.log(res, 'exito al crear usuario');
        const path = 'users';
        const id = res.user.uid;
      })
      .catch((err) => {
        console.log(err, 'error');
      });
  }
}

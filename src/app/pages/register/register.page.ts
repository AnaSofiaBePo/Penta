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
import { Router } from '@angular/router';
import { IonInput, MenuController } from '@ionic/angular';
import { UserI } from 'src/app/models/user.models';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { FireStoreService } from 'src/app/services/fire-store.service';

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
    id: '',
    password: '',
    profile: 'user',
    profilePhoto: '',
  };
  registerForm: FormGroup;
  lockLogInButton = false;

  constructor(
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private menuController: MenuController,
    private alerts: AlertsService,
    private dataBase: FireStoreService,
    private router: Router
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

  async registerButton(name: IonInput, email: IonInput, password: IonInput) {
    await this.alerts.presentLoading('Registrando...');
    this.dataUser.name = name.value.toLocaleString();
    this.dataUser.email = email.value.toLocaleString();
    this.dataUser.password = password.value.toLocaleString();
    this.auth
      .registerUser(this.dataUser)
      .then(async (res) => {
        this.alerts.closeLoading();
        this.alerts.presentToastSuccess('Registro exitoso');
        const id = res.user.uid ;
        const path = 'users';
        this.dataUser.id = id;
        this.dataUser.uid = id;
        this.dataUser.password = null;
       await this.dataBase.createDoc(this.dataUser, path, id);
       this.router.navigate(['/login']);
      })
      .catch((err) => {
        this.alerts.closeLoading();
        this.alerts.presentToast('Ha ocurrido un error');
        console.log(err, 'error');
      });
  }
}

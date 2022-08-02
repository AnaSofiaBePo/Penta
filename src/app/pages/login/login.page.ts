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
import { Route, Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  lockLogInButton = false;

  constructor(
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private alerts: AlertsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
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

  async loginButton(email: IonInput, password: IonInput) {
    console.log(email.value, password.value);
    await this.alerts.presentLoading();
    const res = await this.auth
      .login(email.value.toLocaleString(), password.value.toLocaleString())
      .catch(async (error) => {
        await this.alerts.presentToast('Email o contrasena invalida');
        this.alerts.closeLoading();
      });
    if (res) {
      await this.alerts.presentToastSuccess('Ha iniciado sesion correctamente');
      this.alerts.closeLoading();
      if(this.alerts.closeLoading){
        this.router.navigate(['/home']);
      }
    }
  }
}

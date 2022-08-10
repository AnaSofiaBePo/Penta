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
import { IonInput } from '@ionic/angular';
import { UserI } from 'src/app/models/user.models';
import { AlertsService } from 'src/app/services/alerts.service';
import { FireStoreService } from 'src/app/services/fire-store.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  createUserForm: FormGroup;
  lockLogInButton = false;
  fieldTextType = false;
  dataUser: UserI = {
    name: '',
    email: '',
    uid: '',
    id: '',
    password: '',
    profile: 'user',
    profilePhoto: '',
  };

  constructor(
    private dataBase: FireStoreService,
    private alerts: AlertsService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        this.passwordValidator(),
      ]),
    });
  }

  async createNewUser(name: IonInput, email: IonInput, password: IonInput) {
    await this.alerts.presentLoading('Creando usuario');
    const path = 'Users';
    const id = this.dataBase.getId();
    const data: UserI = {
      name: (this.dataUser.name = name.value.toLocaleString()),
      email: (this.dataUser.email = email.value.toLocaleString()),
      password: (this.dataUser.password = password.value.toLocaleString()),
      profile: 'user',
      // eslint-disable-next-line object-shorthand
      id: id,
    };

    this.dataBase
      .createDoc(data, path, id)
      .then((res) => {
        console.log(res);
        this.alerts.closeLoading();
        this.alerts.presentToastSuccess('Usuario se ha creado exitosamente');
        this.dataUser = null;
      })
      .catch((err) => {
        console.log(err);
        this.alerts.presentToast('Ha ocurrido un error');
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

  toggleFieldTextType(_event) {
    this.fieldTextType = !this.fieldTextType;
  }
}

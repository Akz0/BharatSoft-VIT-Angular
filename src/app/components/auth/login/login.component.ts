import {
  loginSuccess,
  loginFail,
  loginStart,
} from './../state/auth.actions';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: FormGroup | any;
  authLoading$: Observable<boolean>;
  loginResponse: boolean;
  loginMessage: string;
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.login = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  async logIn() {
    const email = this.login.value.email;
    const password = this.login.value.password;

    const body = {
      email: email,
      password: password,
    };
    const config: any = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    this.store.dispatch(loginStart());
    await fetch('http://localhost:2000/api/login', config)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        if (!data.failed) {
          this.store.dispatch(
            loginSuccess({
              user: data.user,
              token: `Bearer ${data.token}`,
            })
          );
          this.router.navigate(['']);
        } else {
          this.loginResponse = false;
          this.loginMessage = data.message;
          this.store.dispatch(
            loginFail({
              error: data.message,
            })
          );
        }
      })
      .catch(error => {});
  }
}

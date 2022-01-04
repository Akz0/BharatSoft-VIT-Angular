import { getAuthStatus } from './../state/auth.selectors';
import {
  registerStart,
  registerSuccess,
  registerFail,
} from './../state/auth.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  register: FormGroup | any;
  authLoading$: Observable<boolean>;
  registerResponse: boolean = false;
  registerMessage: string;
  authStatusSub: Subscription;
  authStatus: boolean;
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.register = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      name: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
    });

    this.authStatusSub = this.store
      .select(getAuthStatus)
      .subscribe(data => {
        this.authStatus = data;
      });
  }

  async registerSubmit() {
    const body = {
      email: this.register.value.email,
      password: this.register.value.password,
      name: this.register.value.name,
      role: this.register.value.role,
    };
    const config: any = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    this.store.dispatch(registerStart());
    await fetch('http://localhost:2000/api/register', config)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (!data.failed) {
          console.log(data);
          this.store.dispatch(registerSuccess());
          this.registerResponse = true;
          this.registerMessage = `${data.message}. Please Login`;
        } else {
          this.registerResponse = false;
          this.registerMessage = data.message;
          this.store.dispatch(
            registerFail({
              error: data.message,
            })
          );
        }
      })
      .catch(error => {});
  }

  ngOnDestroy() {
    if (this.authStatusSub) {
      this.authStatusSub.unsubscribe();
    }
  }
}

import { CoursesModule } from './components/courses/courses.module';
import { environment } from './../environments/environment';
import { AngularMaterialModule } from './components/shared/material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/shared/header/header.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { LoaderComponent } from './components/shared/loader/loader.component';
import { HomeComponent } from './components/shared/home/home.component';
import { CourseCardComponent } from './components/shared/course-card/course-card.component';
import { NewPracticalModalComponent } from './components/shared/new-practical-modal/new-practical-modal.component';
import { NewTheoryModalComponent } from './components/shared/new-theory-modal/new-theory-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppReducer } from './app.state';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    HomeComponent,
    CourseCardComponent,
    NewPracticalModalComponent,
    NewTheoryModalComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    FlexLayoutModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(AppReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 30,
      logOnly: environment.production,
    }),
    HttpClientModule,
    CoursesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

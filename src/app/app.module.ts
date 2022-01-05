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
import { DeleteCourseModalComponent } from './components/shared/delete-course-modal/delete-course-modal.component';
import { EditPracticalModalComponent } from './components/shared/edit-practical-modal/edit-practical-modal.component';
import { EditTheoryModalComponent } from './components/shared/edit-theory-modal/edit-theory-modal.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    HomeComponent,
    CourseCardComponent,
    NewPracticalModalComponent,
    NewTheoryModalComponent,
    DeleteCourseModalComponent,
    EditPracticalModalComponent,
    EditTheoryModalComponent,
    PageNotFoundComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(AppReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 30,
      logOnly: environment.production,
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

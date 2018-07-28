import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/primeng';

import { RouterModule, Routes } from '@angular/router';

import { Utils } from './app.utils';

import { AppGuard } from './app.guard';

import { BooksService } from './services/web/books.service';
import { AuthenticationService } from './services/security/authentication.service';

import { AppComponent } from './app.component';
import { BooksComponent } from './components/web/books/books.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { LoginComponent } from './components/web/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { PageComponent } from './components/web/page/page.component';
import { PageNotFoundComponent } from './components/error/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    component: BooksComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AppGuard],
    component: DashboardComponent
  },
  {
    path: 'page/:pageName',
    component: PageComponent
  },
  {
    path: 'pagenotfound',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'pagenotfound'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    PageComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MessagesModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AppGuard,
    BooksService,
    AuthenticationService,
    Utils
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

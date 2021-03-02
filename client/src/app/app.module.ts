import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/primeng';
// Import Angular plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


import { RouterModule, Routes } from '@angular/router';

import { Utils } from './app.utils';

import { AppGuard } from './app.guard';

import { UsersService } from './services/web/users.service';
import { PostsService } from './services/web/posts.service';
import { AuthenticationService } from './services/security/authentication.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/error/page-not-found/page-not-found.component';
import { IndexComponent } from './components/web/index/index.component';
import { WorksComponent } from './components/web/works/works.component';
import { BlogComponent } from './components/web/blog/blog.component';
import { AboutComponent } from './components/web/about/about.component';
import { ContactComponent } from './components/web/contact/contact.component';
import { EventsComponent } from './components/web/events/events.component';
import { LoginComponent } from './components/web/login/login.component';

const appRoutes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'mis-obras',
    component: WorksComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'sobre-mi',
    component: AboutComponent
  },
  {
    path: 'contacto',
    component: ContactComponent
  },
  {
    path: 'eventos',
    component: EventsComponent
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
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    PageNotFoundComponent,
    IndexComponent,
    WorksComponent,
    BlogComponent,
    AboutComponent,
    ContactComponent,
    EventsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MessagesModule,
    RouterModule.forRoot(appRoutes),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    AppGuard,
    UsersService,
    PostsService,
    AuthenticationService,
    Utils
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {MarkdownToHtmlModule} from 'ng2-markdown-to-html';
import {LoadingModule} from 'ngx-loading';
import {InfiniteScrollModule} from 'angular2-infinite-scroll';


// Components
import {AppComponent} from './app.component';
import {IssuesListComponent} from './components/issues-list/issues-list.component';
import {IssueComponent} from './components/issue/issue.component';
import {IssuePageComponent} from './components/issue-page/issue-page.component';

// Services
import {GithubService} from './services/github.service';

// Routes
const appRoutes: Routes = [
    {path: 'issues/:id', component: IssuePageComponent},
    {
        path: '', component: IssuesListComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        IssuesListComponent,
        IssueComponent,
        IssuePageComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        MarkdownToHtmlModule.forRoot(),
        LoadingModule,
        InfiniteScrollModule
    ],
    providers: [
        GithubService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

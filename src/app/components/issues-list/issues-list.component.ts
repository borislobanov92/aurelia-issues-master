import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {GithubService} from 'app/services/github.service';
import {IGithubIssue} from 'app/interfaces/interfaces';

@Component({
    selector: 'github',
    templateUrl: './issues-list.component.html',
    styleUrls: ['./issues-list.component.css']
})
export class IssuesListComponent implements OnInit {

    public issuesData: IGithubIssue[];
    public loading: boolean = false;
    public issuesCount: number = 0;
    public hasNext: boolean;
    public pageNumber: number = 1;

    constructor(
        private route: ActivatedRoute,
        private githubService: GithubService
    ) {
        this.loading = true;
    }

    ngOnInit() {
        this.route.queryParams.subscribe(({page}) => {
            this.pageNumber = page ? +page : this.pageNumber;
            this.getDataFromRepo();
        });
    }

    getDataFromRepo() {
        this.githubService.getIssuesFromRepo(this.pageNumber).subscribe(
            (data: IGithubIssue[]) => {
                this.loading = false;
                this.issuesData = data;
                this.issuesCount = data.length;
            },
            () => {
                this.loading = false;
            }
        );

        this.githubService.getIssuesFromRepo(this.pageNumber + 1).subscribe(
            (data: IGithubIssue[]) => {
                this.hasNext = !!data.length;
            }
        )
    }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {GithubService} from 'app/services/github.service';
import {IGithubComment, IGithubIssue} from 'app/interfaces/interfaces';

@Component({
    selector: 'issue-page',
    templateUrl: './issue-page.component.html',
    styleUrls: ['./issue-page.component.css']
})
export class IssuePageComponent implements OnInit {

    public issue: IGithubIssue;
    public comments: IGithubComment[];
    public loading: boolean = false;

    constructor(
        private githubService: GithubService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(({ id }) => {
            this.getIssueData(id);
        });
    }

    getIssueData(issueId: number) {
        this.loading = true;

        // Getting issue data in case we visit the issue page directly from URL
        this.githubService.getSingleIssue(issueId).subscribe(
            (data: IGithubIssue) => {
                this.issue = data;
                this.issue.body = this.issue.body || 'No description provided.';

                const { comments, comments_url } = data;

                if (!comments) {
                    this.loading = false;
                    return;
                }

                this.getComments(comments_url);
            },
            () => {
                this.loading = false;
            }
        );
    }

    getComments(url: string) {
        this.githubService.getComments(url).subscribe(
            (comments: IGithubComment[]) => {
                this.comments = comments;
                this.loading = false;
            },
            () => {
                this.loading = false;
            }
        );
    }
}

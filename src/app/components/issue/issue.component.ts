import {Component, Input, OnInit} from '@angular/core';
import {IGithubIssue} from 'app/interfaces/interfaces';

@Component({
    selector: 'issue',
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
    @Input()
    private issue: IGithubIssue;

    constructor() {}

    ngOnInit() {
    }
}

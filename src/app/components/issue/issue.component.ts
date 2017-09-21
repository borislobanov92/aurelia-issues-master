import {Component, Input} from '@angular/core';
import {IGithubIssue} from 'app/interfaces/interfaces';

@Component({
    selector: 'issue',
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.css']
})
export class IssueComponent {
    @Input()
    private issue: IGithubIssue;
}

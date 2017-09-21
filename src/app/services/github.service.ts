import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import {GITHUB_CONFIG} from 'app/_config/github.config';

@Injectable()
export class GithubService {
    private _config = GITHUB_CONFIG.CLIENT_SETTINGS;

    constructor(private _http: Http) {
    }

    public getIssuesFromRepo(
        pageNumber: number = 1,
        per_page: number = this._config.per_page,
        organization: string = this._config.organization,
        repoName: string = this._config.repoName
    ): Observable<any> {
        const
            { apiUrl, client_id: clientId, client_secret: secret } = this._config,
            url = `${apiUrl}repos/${organization}/${repoName}/issues?per_page=${per_page}&page=${pageNumber}&client_id=${clientId}&client_secret=${secret}`;

        return this._http.get(url).map(res => res.json().filter(this.issueIsNotPR));
    }

    public getSingleIssue(
        issueNumber: number,
        organization: string = this._config.organization,
        repoName: string = this._config.repoName
    ): Observable<any> {
        const
            { apiUrl, client_id: clientId, client_secret: secret } = this._config,
            url = `${apiUrl}repos/${organization}/${repoName}/issues/${issueNumber}?client_id=${clientId}&client_secret=${secret}`;

        return this._http.get(url).map(res => res.json());
    }

    public getComments(apiUrl: string): Observable<any> {
        const
            { client_id: clientId, client_secret: secret } = this._config,
            url = `${apiUrl}?client_id=${clientId}&client_secret=${secret}`;
        return this._http.get(url).map(res => res.json());
    }

    private issueIsNotPR({ pull_request }): boolean {
        return !pull_request;
    }
}

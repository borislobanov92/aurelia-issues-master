export interface IGithubIssue {
    url: string;
    comments_url: string;
    html_url: string;
    id: number;
    number: number;
    title: string;
    user: IGithubUser;
    state: string;
    comments: number;
    created_at: string;
    body: string;
    pull_request?: any;
}

export interface IGithubComment {
    url: string;
    html_url: string;
    issue_url: string;
    id: number;
    user: IGithubUser;
    state: string;
    comments: number;
    created_at: string;
    body: string;
}

export interface IGithubUser {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
    type: string;
    site_admin: boolean;
}

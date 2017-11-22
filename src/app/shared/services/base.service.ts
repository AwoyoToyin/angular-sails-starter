import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { environment } from '@environments/environment';
import { AppError } from '@shared/errors/app-error';
import { BadInputError } from '@shared/errors/bad-input-error';
import { NotFoundError } from '@shared/errors/not-found-error';
import { UnauthorizedError } from '@shared/errors/unauthorized';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class BaseService {

    protected API_PATH = environment.server_base_url;

    constructor(protected http: Http) { }

    /**
     * Creates a record
     * @param resource
     */
    create(resource): Observable<any> {
        return this.http.post(this.API_PATH, resource, this.getHeaders())
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * Fetches all or a single record
     * @param id string | number
     */
    read(id?: string | number): Observable<any> {
        let path = this.API_PATH;
        if (id) { path = `${path}${id}`; }

        return this.http.get(path, this.getHeaders())
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * Updates a single record
     * @param resource
     */
    update(resource): Observable<any> {
        const path = `${this.API_PATH}${resource.id}`;

        return this.http.patch(path, resource, this.getHeaders())
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * Deletes a record
     * @param id string | number
     */
    delete(id) {
        const path = `${this.API_PATH}${id}`;

        return this.http.delete(path, this.getHeaders())
            .map(response => response.json())
            .catch(this.handleError);
    }

    protected getHeaders(): RequestOptions {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json; charset=utf-8');

        return new RequestOptions({ headers: headers });
    }

    protected handleError(error: Response | any): Observable<AppError> {
        if (error.status === 400) { return Observable.throw(new BadInputError(error.json())); }
        if (error.status === 401) { return Observable.throw(new UnauthorizedError()); }
        if (error.status === 404) { return Observable.throw(new NotFoundError()); }

        return Observable.throw(new AppError(error));
    }

}

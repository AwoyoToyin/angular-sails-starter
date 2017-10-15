import { AppError } from './../shared/errors/app-error';
import { NotFoundError } from './../shared/errors/not-found-error';
import { BadInputError } from './../shared/errors/bad-input-error';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BaseService {

    protected API_PATH = '';

    constructor(private http: Http) { }

    /**
     * Creates a record
     * @param resource
     */
    create(resource): Observable<any> {
        return this.http.post(this.API_PATH, resource)
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * Fetches all or a single record
     * @param id string | number
     */
    read(id?: string | number): Observable<any> {
        let path = this.API_PATH;
        if (id) { path = `${path}/${id}`; }

        return this.http.get(path)
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * Updates a single record
     * @param resource
     */
    update(resource): Observable<any> {
        const path = `${this.API_PATH}/${resource.id}`;

        return this.http.patch(path, resource)
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * Deletes a record
     * @param id string | number
     */
    delete(id) {
        const path = `${this.API_PATH}/${id}`;

        return this.http.delete(path)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response): Observable<AppError> {
        if (error.status === 400) { return Observable.throw(new BadInputError(error.json())); }

        if (error.status === 404) { return Observable.throw(new NotFoundError()); }

        return Observable.throw(new AppError(error));
    }

}
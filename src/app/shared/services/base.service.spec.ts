import { fakeAsync, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AppError } from '@shared/errors/app-error';
import { collection } from '@test/data';

import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        BaseService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          // tslint:disable-next-line:no-shadowed-variable
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });

    // Get the MockBackend
    backend = TestBed.get(MockBackend);
    // Returns a service with the MockBackend so we can test with dummy responses
    service = TestBed.get(BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a collection of data from the server', fakeAsync(() => {
    getFakeResponse(collection);

    service.read().subscribe(
      result => expect(result).toEqual(collection),
      error => expect(error).toBeUndefined()
    );

  }));

  it('should throw an error trying to return a collection of data from the server', fakeAsync(() => {
    getFakeErrorResponse();

    service.read().subscribe(
      result => expect(result).toBeUndefined(),
      error => expect(error instanceof AppError).toBeTruthy()
    );

  }));

  function getFakeResponse(response) {
    // When the request subscribes for results on a connection, return a fake response
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify(response)
      }));
    });
  }

  function getFakeErrorResponse() {
    // When the request subscribes for results on a connection, return a fake error response
    backend.connections.subscribe(connection => {
      connection.mockRespond(new AppError());
    });
  }
});

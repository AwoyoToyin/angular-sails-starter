import { Subject } from 'rxjs/Rx';

export namespace Stubs {

    export class RouterStub {
        navigate(params) { }
    }

    export class ActivatedRouteStub {
        private subject = new Subject();

        push(value) {
            this.subject.next(value);
        }

        get params() {
            return this.subject.asObservable();
        }

        get queryParams() {
            return this.subject.asObservable();
        }
    }

}

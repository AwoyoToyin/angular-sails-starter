import { ErrorHandler } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppError } from '@shared/errors/app-error';
import { NotFoundError } from '@shared/errors/not-found-error';
import { CreateNoticeAction } from '@store/bs-notify/bs-notify.actions';
import { IAppState } from '@store/index';

export class AppErrorHandler implements ErrorHandler {

    // for notice
    private message = 'An unexpected error occurred.';
    public type = 'danger';
    public title = 'Error!';
    private icon = 'fa fa-exclamation-triangle';
    public placement = 'top-right';
    private allow_dismiss = true;
    private newest_on_top = true;
    public showProgressbar = true;
    public delay = 7000;

    constructor(private store: Store<IAppState>) {}

    handleError(error?: AppError): void {
        const originalError = error.originalError;
        if (error instanceof NotFoundError) {
            this.message = originalError ? originalError.message : 'Resource not found';
            this.type = 'danger';
        }

        this.notify();
    }

    private notify(): void {
        this.store.dispatch(new CreateNoticeAction({
            icon: this.icon,
            title: this.title,
            message: this.message,
            type: this.type,
            placement: this.placement,
            showProgressbar: this.showProgressbar,
            delay: this.delay
        }));
    }
}

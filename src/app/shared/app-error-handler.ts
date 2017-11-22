import { ErrorHandler } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppError } from '@shared/errors/app-error';
import { NotFoundError } from '@shared/errors/not-found-error';
import { UnauthorizedError } from '@shared/errors/unauthorized';
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
    public showProgressbar = true;
    public delay = 10000;

    constructor(private store: Store<IAppState>) {}

    handleError(error: AppError): void {
        const originalError = error.originalError;
        if (error instanceof NotFoundError) {
            this.message = (originalError && originalError.message) ?
                originalError.message : 'Resource not found';
        }

        if (error instanceof UnauthorizedError) {
            this.message = (originalError && originalError.message) ?
                originalError.message : 'Authorization required';
        }

        if (error instanceof AppError) {
            this.message = (originalError && originalError.message) ?
                originalError.message : 'An unexpected error occurred';
        }

        this.notify();
    }

    private notify(): void {
        this.store.dispatch(new CreateNoticeAction({
            title: this.title,
            message: this.message,
            type: this.type,
            placement: this.placement,
            showProgressbar: this.showProgressbar,
            delay: this.delay
        }));
    }
}

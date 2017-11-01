import { ActionReducer } from '@ngrx/store';
import { BsNotice } from '@shared/models/bs-notify/bs-notify.interface';
import { tassign } from 'tassign';

import { Actions, ActionTypes } from './bs-notify.actions';

export interface IBsNotice {
    notice: BsNotice;
}

const initialState: IBsNotice = {
    notice: {
        type: 'info',
        icon: '',
        icon_type: '',
        title: '',
        message: '',
        placement: 'top-right',
        animate: {
            enter: 'animated zoomInDown',
            exit: 'animated zoomOutUp'
        },
        allow_dismiss: true,
        newest_on_top: true,
        showProgressbar: false,
        delay: 0
    },
};

export function bsNoticeReducer(state: IBsNotice = initialState, action: Actions): IBsNotice {

    switch (action.type) {

        case ActionTypes.CREATE:

            return tassign(state, { notice : action.payload });

        default:
            return state;
    }
}

export const getBsNotice = (state: IBsNotice) => state.notice;

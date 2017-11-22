import { tassign } from 'tassign';

import { Actions, ActionTypes } from './bs-notify.actions';
import { BsNotice } from './bs-notify.interface';

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
        allow_dismiss: true,
        showProgressbar: true,
        delay: 10000
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

// export const getBsNotice = (state: IBsNotice) => state.notice;

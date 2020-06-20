import { Dispatch } from 'redux';
import { ADD_COMMENT } from 'store/actions/actions';
import { reset } from 'redux-form';

const COMMENT_URL = '/comment';

export const createComment = (commentText: string, messageId: number, formNameForReset: string) => async (dispatch: Dispatch) => {
    const response: Response = await fetch(COMMENT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: commentText, message: {id: messageId} }),
    });
    const comment = await response.json();

    dispatch(reset(formNameForReset));
    dispatch({ type: ADD_COMMENT, comment });
};

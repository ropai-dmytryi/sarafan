import * as React from 'react';
import { IComment } from 'model/IComment';

interface ICommentItemProps {
    comment: IComment;
}

const CommentItem = ({ comment: { text } }: ICommentItemProps) => {
    return (
        <div>
            { text }
        </div>
    );

};

export default CommentItem;

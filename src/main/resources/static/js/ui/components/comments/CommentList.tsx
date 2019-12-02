import * as React from 'react';
import { IComment } from 'model/IComment';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { IMessage } from 'model/IMessage';

interface ICommentListProps {
    message: IMessage;
    createComment: (commentText: string, messageId: number, formNameForReset: string) => void;
}

class CommentList extends React.Component<ICommentListProps> {
    public render() {
        const { message: {id, comments}, createComment } = this.props;
        const commentsList = comments ? comments : [];
        const formName = 'commentForMessage' + id;
        return (
            <div>
                {
                    commentsList.map((comment: IComment, index: number) => (
                        <CommentItem
                            key={ index }
                            comment={ comment }
                        />
                    ))
                }
                <div>
                    <CommentForm form={ formName } onSubmit={ (values: any) => createComment(values.text, id, formName) }/>
                </div>
            </div>
        );
    }
}

export default CommentList;

package sarafan.service;

import sarafan.domain.Comment;
import sarafan.domain.User;

public interface CommentService {

    Comment create(Comment comment, User user);
}

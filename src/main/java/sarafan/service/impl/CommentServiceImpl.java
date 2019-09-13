package sarafan.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sarafan.domain.Comment;
import sarafan.domain.User;
import sarafan.repo.CommentRepo;
import sarafan.service.CommentService;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepo commentRepo;

    public CommentServiceImpl(CommentRepo commentRepo) {
        this.commentRepo = commentRepo;
    }

    @Override
    public Comment create(Comment comment, User user) {
        comment.setAuthor(user);
        commentRepo.save(comment);

        return comment;
    }
}

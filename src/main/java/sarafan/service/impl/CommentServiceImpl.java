package sarafan.service.impl;

import org.springframework.stereotype.Service;
import sarafan.domain.Comment;
import sarafan.domain.User;
import sarafan.domain.Views;
import sarafan.dto.EventType;
import sarafan.dto.ObjectType;
import sarafan.repo.CommentRepo;
import sarafan.sender.WsSender;
import sarafan.service.CommentService;

import java.util.function.BiConsumer;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepo commentRepo;
    private final BiConsumer<EventType, Comment> wsSender;

    public CommentServiceImpl(CommentRepo commentRepo, WsSender wsSender) {
        this.commentRepo = commentRepo;
        this.wsSender = wsSender.getSender(ObjectType.COMMENT, Views.FullComment.class);
    }

    @Override
    public Comment create(Comment comment, User user) {
        comment.setAuthor(user);

        Comment commentFromDb = commentRepo.save(comment);

        wsSender.accept(EventType.CREATE, commentFromDb);

        return commentFromDb;
    }
}

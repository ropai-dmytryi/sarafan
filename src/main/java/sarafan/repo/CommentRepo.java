package sarafan.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import sarafan.domain.Comment;

public interface CommentRepo extends JpaRepository<Comment, Long> {
}

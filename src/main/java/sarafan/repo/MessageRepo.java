package sarafan.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import sarafan.domain.Message;

public interface MessageRepo extends JpaRepository<Message, Long> {
}

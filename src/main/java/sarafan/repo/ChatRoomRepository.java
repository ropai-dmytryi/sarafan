package sarafan.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import sarafan.domain.ChatRoom;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    Optional<ChatRoom> findBySenderIdAndRecipientId(Long senderId, Long recipientId);
}

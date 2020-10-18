package sarafan.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import sarafan.domain.ChatMessage;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    long countBySenderIdAndRecipientIdAndStatus(String senderId,
                                                String recipientId,
                                                ChatMessage.MessageStatus received);

    List<ChatMessage> findByChatId(String id);

    List<ChatMessage> findBySenderIdAndRecipientId(Long senderId, Long recipientId);
}

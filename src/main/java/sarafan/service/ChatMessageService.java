package sarafan.service;

import sarafan.domain.ChatMessage;

import java.util.List;

public interface ChatMessageService {

    ChatMessage save(ChatMessage chatMessage);

    long countNewMessages(String senderId, String recipientId);

    List<ChatMessage> findChatMessages(Long senderId, Long recipientId);

    ChatMessage findById(Long id);
}

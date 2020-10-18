package sarafan.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sarafan.domain.ChatMessage;
import sarafan.exception.ResourceNotFoundException;
import sarafan.repo.ChatMessageRepository;
import sarafan.service.ChatMessageService;
import sarafan.service.ChatRoomService;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository repository;
    private final ChatRoomService chatRoomService;

    @Autowired
    public ChatMessageServiceImpl(ChatMessageRepository repository, ChatRoomService chatRoomService) {
        this.repository = repository;
        this.chatRoomService = chatRoomService;
    }

    @Override
    public ChatMessage save(ChatMessage chatMessage) {
        chatMessage.setStatus(ChatMessage.MessageStatus.RECEIVED);
        repository.save(chatMessage);
        return chatMessage;
    }

    @Override
    public long countNewMessages(String senderId, String recipientId) {
        return repository.countBySenderIdAndRecipientIdAndStatus(
                senderId, recipientId, ChatMessage.MessageStatus.RECEIVED);
    }

    @Override
    public List<ChatMessage> findChatMessages(Long senderId, Long recipientId) {
        var chatId = chatRoomService.getChatId(senderId, recipientId, false);

        List<ChatMessage> messages = chatId.map(repository::findByChatId).orElse(new ArrayList<>());

        if (messages.size() > 0) {
            repository.findBySenderIdAndRecipientId(senderId, recipientId)
                    .forEach(this::setStatusDeliveredAndUpdate);
        }

        return messages;
    }

    @Override
    public ChatMessage findById(Long id) {
        return repository
                .findById(id)
                .map(this::setStatusDeliveredAndUpdate)
                .orElseThrow(() ->
                        new ResourceNotFoundException(String.format("Can't find message with id: %d", id)));
    }

    private ChatMessage setStatusDeliveredAndUpdate(ChatMessage chatMessage) {
        chatMessage.setStatus(ChatMessage.MessageStatus.DELIVERED);
        return repository.save(chatMessage);
    }
}

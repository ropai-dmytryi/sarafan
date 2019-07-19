package sarafan.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import sarafan.domain.Message;
import sarafan.domain.Views;
import sarafan.dto.EventType;
import sarafan.dto.ObjectType;
import sarafan.repo.MessageRepo;
import sarafan.sender.WsSender;
import sarafan.service.MessageService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.function.BiConsumer;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepo messageRepo;
    private final BiConsumer<EventType, Message> wsSender;

    public MessageServiceImpl(MessageRepo messageRepo, WsSender wsSender) {
        this.messageRepo = messageRepo;
        this.wsSender = wsSender.getSender(ObjectType.MESSAGE, Views.IdName.class);
    }

    @Override
    public List<Message> getAll() {
        return messageRepo.findAll();
    }

    @Override
    public Message create(Message message) {
        message.setCreationDate(LocalDateTime.now());
        Message createdMessage = messageRepo.save(message);

        wsSender.accept(EventType.CREATE, createdMessage);

        return createdMessage;
    }

    @Override
    public Message update(Message messageFromDb, Message message) {
        BeanUtils.copyProperties(message, messageFromDb, "id");
        Message updatedMessage = messageRepo.save(messageFromDb);

        wsSender.accept(EventType.UPDATE, updatedMessage);
        return updatedMessage;
    }

    @Override
    public void delete(Message message) {
        messageRepo.delete(message);
        wsSender.accept(EventType.REMOVE, message);
    }
}

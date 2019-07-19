package sarafan.service;

import sarafan.domain.Message;

import java.util.List;

public interface MessageService {

    List<Message> getAll();

    Message create(Message message);

    Message update(Message messageFromDb, Message message);

    void delete(Message message);
}

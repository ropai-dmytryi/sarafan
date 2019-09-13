package sarafan.service;

import sarafan.domain.Message;
import sarafan.domain.User;

import java.io.IOException;
import java.util.List;

public interface MessageService {

    List<Message> getAll();

    Message create(Message message, User user) throws IOException;

    Message update(Message messageFromDb, Message message) throws IOException;

    void delete(Message message);
}

package sarafan.service;

import sarafan.domain.Message;

import java.io.IOException;
import java.util.List;

public interface MessageService {

    List<Message> getAll();

    Message create(Message message) throws IOException;

    Message update(Message messageFromDb, Message message) throws IOException;

    void delete(Message message);
}

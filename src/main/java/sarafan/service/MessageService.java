package sarafan.service;

import org.springframework.data.domain.Pageable;
import sarafan.domain.Message;
import sarafan.domain.User;
import sarafan.dto.MessagePageDto;

import java.io.IOException;

public interface MessageService {

    MessagePageDto getAll(Pageable pageable);

    Message create(Message message, User user) throws IOException;

    Message update(Message messageFromDb, Message message) throws IOException;

    void delete(Message message);
}

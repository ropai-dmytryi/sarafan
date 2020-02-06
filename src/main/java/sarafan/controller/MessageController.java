package sarafan.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sarafan.domain.Message;
import sarafan.domain.User;
import sarafan.domain.Views;
import sarafan.exception.AccessDeniedException;
import sarafan.service.MessageService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(MessageController.MESSAGE_MAPPING)
public class MessageController {

    private static final String ID_PATH_VARIABLE = "id";
    private static final String ID_PARAM = "{" + ID_PATH_VARIABLE + "}";
    public static final String MESSAGE_MAPPING = "message";

    private MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping
    @JsonView(Views.FullMessage.class)
    public List<Message> list() {
        return messageService.getAll();
    }

    @PostMapping
    @JsonView(Views.FullMessage.class)
    public Message create(@RequestBody Message message, @AuthenticationPrincipal User user) throws IOException {
        return messageService.create(message, user);
    }

    @PutMapping(ID_PARAM)
    @JsonView(Views.FullMessage.class)
    public Message update(@PathVariable(ID_PATH_VARIABLE) Message messageFromDb,
                          @RequestBody Message message,
                          @AuthenticationPrincipal User user) throws IOException {
        if (!user.getId().equals(messageFromDb.getAuthor().getId())) {
            throw new AccessDeniedException();
        }
        return messageService.update(messageFromDb, message);
    }

    @DeleteMapping(ID_PARAM)
    public void delete(@PathVariable(ID_PATH_VARIABLE) Message message,
                       @AuthenticationPrincipal User user) {
        if (!user.getId().equals(message.getAuthor().getId())) {
            throw new AccessDeniedException();
        }
        messageService.delete(message);
    }

}

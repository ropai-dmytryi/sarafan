package sarafan.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
import sarafan.dto.MessagePageDto;
import sarafan.exception.AccessDeniedException;
import sarafan.service.MessageService;

import java.io.IOException;

@RestController
@RequestMapping(MessageController.MESSAGE_MAPPING)
public class MessageController {

    public static final String MESSAGE_MAPPING = "message";
    private static final String ID_PARAM = "id";
    private static final String ID_MAPPING = "{" + ID_PARAM + "}";
    private static final int MESSAGES_PER_PAGE = 6;

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping
    @JsonView(Views.FullMessage.class)
    public MessagePageDto list(
            @PageableDefault(size = MESSAGES_PER_PAGE, sort = { "id" }, direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return messageService.getAll(pageable);
    }

    @PostMapping
    @JsonView(Views.FullMessage.class)
    public Message create(@RequestBody Message message, @AuthenticationPrincipal User user) throws IOException {
        return messageService.create(message, user);
    }

    @PutMapping(ID_MAPPING)
    @JsonView(Views.FullMessage.class)
    public Message update(@PathVariable(ID_PARAM) Message messageFromDb,
                          @RequestBody Message message,
                          @AuthenticationPrincipal User user) throws IOException {
        if (!user.equals(messageFromDb.getAuthor())) {
            throw new AccessDeniedException();
        }
        return messageService.update(messageFromDb, message);
    }

    @DeleteMapping(ID_MAPPING)
    public void delete(@PathVariable(ID_PARAM) Message message,
                       @AuthenticationPrincipal User user) {
        if (!user.equals(message.getAuthor())) {
            throw new AccessDeniedException();
        }
        messageService.delete(message);
    }

}

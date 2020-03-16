package sarafan.dto;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;
import sarafan.domain.Message;
import sarafan.domain.Views;

import java.util.List;

@Data
@AllArgsConstructor
@JsonView(Views.FullMessage.class)
public class MessagePageDto {
    private List<Message> messages;
    private int currentPage;
    private int totalPages;
}

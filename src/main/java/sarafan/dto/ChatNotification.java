package sarafan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatNotification {
    private Long id;
    private Long senderId;
    private String senderName;
}

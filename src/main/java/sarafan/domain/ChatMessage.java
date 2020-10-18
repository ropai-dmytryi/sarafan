package sarafan.domain;

import lombok.Data;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Data
@ToString
@Entity
public class ChatMessage {

    @Id
    private Long id;
    private String chatId;
    private Long senderId;
    private Long recipientId;
    private String senderName;
    private String recipientName;
    private String content;
    private Date timestamp;
    private MessageStatus status;

    public enum MessageStatus {
        RECEIVED, DELIVERED
    }
}

package sarafan.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoom {
    @Id
    private Long id;
    private String chatId;
    private Long senderId;
    private Long recipientId;
}

package sarafan.service.impl;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sarafan.domain.Message;
import sarafan.domain.User;
import sarafan.domain.Views;
import sarafan.dto.EventType;
import sarafan.dto.MessagePageDto;
import sarafan.dto.MetaDto;
import sarafan.dto.ObjectType;
import sarafan.repo.MessageRepo;
import sarafan.sender.WsSender;
import sarafan.service.MessageService;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.function.BiConsumer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class MessageServiceImpl implements MessageService {

    private static final String YOUTU = "youtu";
    private static final String CONTENT_PARAM = "content";
    private static final String URL_PATTERN = "https?://?[\\w\\d._\\-%/?=&#]+";
    private static final String IMAGE_PATTERN = "\\.(jpeg|jpg|gif|png)$";

    private static final Pattern URL_REGEX = Pattern.compile(URL_PATTERN, Pattern.CASE_INSENSITIVE);
    private static final Pattern IMG_REGEX = Pattern.compile(IMAGE_PATTERN, Pattern.CASE_INSENSITIVE);

    private final MessageRepo messageRepo;
    private final BiConsumer<EventType, Message> wsSender;

    @Autowired
    public MessageServiceImpl(MessageRepo messageRepo, WsSender wsSender) {
        this.messageRepo = messageRepo;
        this.wsSender = wsSender.getSender(ObjectType.MESSAGE, Views.FullMessage.class);
    }

    @Override
    public MessagePageDto getAll(Pageable pageable) {
        Page<Message> page = messageRepo.findAll(pageable);
        return new MessagePageDto(
                page.getContent(),
                pageable.getPageNumber(),
                page.getTotalPages()
        );
    }

    @Override
    public Message create(Message message, User user) throws IOException {
        message.setCreationDate(LocalDateTime.now());
        fillMeta(message);
        message.setAuthor(user);
        Message createdMessage = messageRepo.save(message);

        wsSender.accept(EventType.CREATE, createdMessage);

        return createdMessage;
    }

    @Override
    public Message update(Message messageFromDb, Message message) throws IOException {
        messageFromDb.setText(message.getText());
        fillMeta(messageFromDb);
        Message updatedMessage = messageRepo.save(messageFromDb);

        wsSender.accept(EventType.UPDATE, updatedMessage);
        return updatedMessage;
    }

    @Override
    public void delete(Message message) {
        messageRepo.delete(message);
        wsSender.accept(EventType.REMOVE, message);
    }

    private void fillMeta(Message message) throws IOException {
        String text = message.getText();
        Matcher matcher = URL_REGEX.matcher(text);

        if (matcher.find()) {
            String url = text.substring(matcher.start(), matcher.end());

            matcher = IMG_REGEX.matcher(url);

            message.setLink(url);

            if (matcher.find()) {
                message.setLinkCover(url);
            } else if (!url.contains(YOUTU)) {
                MetaDto meta = getMeta(url);

                message.setLinkCover(meta.getCover());
                message.setLinkTitle(meta.getTitle());
                message.setLinkDescription(meta.getDescription());
            }
        }
    }

    private MetaDto getMeta(String url) throws IOException {
        Document doc = Jsoup.connect(url).get();

        Elements title = doc.select("meta[name$=title],meta[property$=title]");
        Elements description = doc.select("meta[name$=description],meta[property$=description]");
        Elements cover = doc.select("meta[name$=image],meta[property$=image]");

        return new MetaDto(
                getContent(title.first()),
                getContent(description.first()),
                getContent(cover.first())
        );
    }

    private String getContent(Element element) {
        return element == null ? "" : element.attr(CONTENT_PARAM);
    }
}

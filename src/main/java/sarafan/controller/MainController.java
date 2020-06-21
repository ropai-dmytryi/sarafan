package sarafan.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import sarafan.domain.User;
import sarafan.domain.Views;
import sarafan.service.UserService;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(MainController.ROOT_MAPPING)
public class MainController {

    public static final String ROOT_MAPPING = "/";
    private static final String PROFILE_ATTRIBUTE = "profile";
    private static final String FRONTEND_DATA_ATTRIBUTE = "frontendData";

    private final UserService userService;
    private final ObjectWriter profileWriter;

    public MainController(UserService userService, ObjectMapper mapper) {
        this.userService = userService;
        ObjectMapper objectMapper = mapper
                .setConfig(mapper.getSerializationConfig());

        this.profileWriter = objectMapper
                .writerWithView(Views.FullProfile.class);
    }

    @GetMapping
    public String main(Model model, @AuthenticationPrincipal User user) throws JsonProcessingException {
        Map<Object, Object> data = new HashMap<>();

        if (user != null) {
            User userFromDb = userService.getUser(user.getId());
            String serializedProfile = profileWriter.writeValueAsString(userFromDb);
            data.put(PROFILE_ATTRIBUTE, serializedProfile);
        } else {
            data.put(PROFILE_ATTRIBUTE, "null");
        }

        model.addAttribute(FRONTEND_DATA_ATTRIBUTE, data);
        return "index";
    }
}

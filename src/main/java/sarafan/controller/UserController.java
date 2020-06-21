package sarafan.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import sarafan.domain.User;
import sarafan.domain.Views;
import sarafan.service.UserService;

import java.util.List;

@RestController
@RequestMapping(UserController.USER_MAPPING)
public class UserController {

    public static final String USER_MAPPING = "user";
    private static final String FILTER_MAPPING = "filter";
    private static final String ID_PARAM = "id";
    private static final String GET_USER_MAPPING = "{" + ID_PARAM +"}";
    private static final String CHANNEL_ID_PARAM = "channelId";
    private static final String CHANGE_SUBSCRIPTION_MAPPING = "change-subscription/{" + CHANNEL_ID_PARAM + "}";

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(GET_USER_MAPPING)
    @JsonView(Views.FullProfile.class)
    public User get(@PathVariable(ID_PARAM) User user) {
        return user;
    }

    @PostMapping(CHANGE_SUBSCRIPTION_MAPPING)
    @JsonView(Views.FullProfile.class)
    public User changeSubscription(
            @AuthenticationPrincipal User subscriber,
            @PathVariable(CHANNEL_ID_PARAM) User channel
    ) {
        if (subscriber.equals(channel)) {
            return channel;
        } else {
            return userService.changeSubscription(channel, subscriber);
        }
    }

    @GetMapping(FILTER_MAPPING)
    @JsonView(Views.IdName.class)
    public List<User> getUsersByName(@RequestParam String name) {
        return userService.getUsersByName(name);
    }
}

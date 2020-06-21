package sarafan.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sarafan.domain.User;
import sarafan.domain.Views;
import sarafan.service.ProfileService;

@RestController
@RequestMapping(ProfileController.PROFILE_MAPPING)
public class ProfileController {

    public static final String PROFILE_MAPPING = "profile";
    private static final String ID_PARAM = "id";
    private static final String GET_USER_MAPPING = "{" + ID_PARAM +"}";
    private static final String CHANNEL_ID_PARAM = "channelId";
    private static final String CHANGE_SUBSCRIPTION_MAPPING = "change-subscription/{" + CHANNEL_ID_PARAM + "}";

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
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
            return profileService.changeSubscription(channel, subscriber);
        }
    }
}

package sarafan.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import sarafan.domain.User;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(MainController.ROOT_MAPPING)
public class MainController {

    public static final String ROOT_MAPPING = "/";
    private static final String PROFILE_ATTRIBUTE = "profile";
    private static final String FRONTEND_DATA_ATTRIBUTE = "frontendData";

    @GetMapping
    public String main(Model model, @AuthenticationPrincipal User user) {
        Map<Object, Object> data = new HashMap<>();

        data.put(PROFILE_ATTRIBUTE, user);

        model.addAttribute(FRONTEND_DATA_ATTRIBUTE, data);
        return "index.html";
    }
}

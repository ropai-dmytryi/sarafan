package sarafan.service;

import sarafan.domain.User;

import java.util.List;

public interface UserService {
    User changeSubscription(User subscriber, User channel);

    User getUser(String id);

    List<User> getUsersByName(String name);
}

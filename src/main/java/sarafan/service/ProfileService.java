package sarafan.service;

import sarafan.domain.User;

public interface ProfileService {
    User changeSubscription(User subscriber, User channel);
}

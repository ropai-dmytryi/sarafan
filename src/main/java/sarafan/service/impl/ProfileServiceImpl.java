package sarafan.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sarafan.domain.User;
import sarafan.repo.UserDetailsRepo;
import sarafan.service.ProfileService;

import java.util.Set;

@Service
public class ProfileServiceImpl implements ProfileService {
    private final UserDetailsRepo userDetailsRepo;

    @Autowired
    public ProfileServiceImpl(UserDetailsRepo userDetailsRepo) {
        this.userDetailsRepo = userDetailsRepo;
    }

    @Override
    public User changeSubscription(User subscriber, User channel) {
        Set<User> subscribers = channel.getSubscribers();

        if (subscribers.contains(subscriber)) {
            subscribers.remove(subscriber);
        } else {
            subscribers.add(subscriber);
        }
        return userDetailsRepo.save(channel);
    }
}

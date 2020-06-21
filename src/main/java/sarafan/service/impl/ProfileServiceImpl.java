package sarafan.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sarafan.domain.User;
import sarafan.exception.NotFoundException;
import sarafan.repo.UserDetailsRepo;
import sarafan.service.ProfileService;

import java.util.Optional;
import java.util.Set;

@Service
public class ProfileServiceImpl implements ProfileService {
    private final UserDetailsRepo userDetailsRepo;

    @Autowired
    public ProfileServiceImpl(UserDetailsRepo userDetailsRepo) {
        this.userDetailsRepo = userDetailsRepo;
    }

    @Override
    public User changeSubscription(User channel, User subscriber) {
        Set<User> subscribers = channel.getSubscribers();

        if (subscribers.contains(subscriber)) {
            subscribers.remove(subscriber);
        } else {
            subscribers.add(subscriber);
        }
        return userDetailsRepo.save(channel);
    }

    @Override
    public User getUser(String id) {
        return userDetailsRepo.findById(id).orElseThrow(NotFoundException::new);
    }
}

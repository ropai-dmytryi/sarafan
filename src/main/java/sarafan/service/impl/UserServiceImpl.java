package sarafan.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import sarafan.domain.User;
import sarafan.exception.NotFoundException;
import sarafan.repo.UserDetailsRepo;
import sarafan.service.UserService;

import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    private final UserDetailsRepo userDetailsRepo;

    @Autowired
    public UserServiceImpl(UserDetailsRepo userDetailsRepo) {
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

    @Override
    public List<User> getUsersByName(String name) {
        return userDetailsRepo.findAllByNameLike("%" + StringUtils.capitalize(name) + "%");
    }
}

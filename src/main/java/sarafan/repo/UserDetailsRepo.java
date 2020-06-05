package sarafan.repo;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import sarafan.domain.User;

import java.util.Optional;

public interface UserDetailsRepo extends JpaRepository<User, String> {

    @EntityGraph(attributePaths = { "subscriptions", "subscribers" })
    Optional<User> findById(String s);
}

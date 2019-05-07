package sarafan.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import sarafan.domain.User;

public interface UserDetailsRepo extends JpaRepository<User, String> {
}

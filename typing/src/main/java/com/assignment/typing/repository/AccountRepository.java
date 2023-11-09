package com.assignment.typing.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.assignment.typing.model.Account;

public interface AccountRepository extends CrudRepository<Account, Long> {
	Optional<Account> findByUserIdAndPassword(String userId, String password);

	Optional<Account> findByUserId(String userId);
}

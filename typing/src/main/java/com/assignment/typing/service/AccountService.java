package com.assignment.typing.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assignment.typing.model.Account;
import com.assignment.typing.model.User;
import com.assignment.typing.model.UserResponse;
import com.assignment.typing.repository.AccountRepository;
import com.google.gson.Gson;

@Service
public class AccountService {
	@Autowired
	private AccountRepository accountRepository;

	public Account createAccount(String userId, String password) {
		Account account = new Account();
		account.setUserId(userId);
		account.setPassword(password);
		return accountRepository.save(account);
	}

	public String createAccount(User user) {

		Optional<Account> existingAccount = accountRepository.findByUserId(user.getUserId());
		if (existingAccount.isPresent()) {
			UserResponse errorResponse = UserResponse.builder().status_cd("0").status_msg("FAIL")
					.usr_msg("User already exists").http_status_cd("400").build();
			return new Gson().toJson(errorResponse);
		}

		Account account = new Account();
		account.setUserId(user.getUserId());
		account.setPassword(user.getPassword());
		accountRepository.save(account);
		UserResponse successResponse = UserResponse.builder().status_cd("1").status_msg("SUCCESS")
				.usr_msg("User created successfully").http_status_cd("200").build();
		return new Gson().toJson(successResponse);
	}

	public String signIn(User user) {
		Optional<Account> existingAccount = accountRepository.findByUserId(user.getUserId());
		if (!existingAccount.isPresent()) {
			UserResponse errorResponse = UserResponse.builder().status_cd("0").status_msg("FAIL")
					.usr_msg("User does not exist").http_status_cd("400").build();
			return new Gson().toJson(errorResponse);
		}
		Optional<Account> account = accountRepository.findByUserIdAndPassword(user.getUserId(), user.getPassword());
		if (!account.isPresent()) {
			UserResponse errorResponse = UserResponse.builder().status_cd("0").status_msg("FAIL")
					.usr_msg("Incorrect password").http_status_cd("400").build();
			return new Gson().toJson(errorResponse);
		}
		Long accountId = account.map(Account::getId).orElse(null);

		UserResponse successResponse = UserResponse.builder().acccountId(accountId).status_cd("1").status_msg("SUCCESS")
				.usr_msg("Singin successful").http_status_cd("200").build();
		return new Gson().toJson(successResponse);
	}
}

package com.assignment.typing.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.typing.model.User;
import com.assignment.typing.model.UserResponse;
import com.assignment.typing.service.AccountService;
import com.google.gson.Gson;

@RestController
@RequestMapping("/api")
public class UserController {
	private static Map<String, String> users = new HashMap<>();

	@Autowired
	private AccountService accountService;

	@PostMapping("/signup")
	public String signUp(@RequestBody User user) {
		try {
			return accountService.createAccount(user);
		} catch (Exception e) {
			UserResponse errorResponse = UserResponse.builder().status_cd("0").status_msg("FAIL")
					.usr_msg(e.getMessage()).http_status_cd("400").build();
			return new Gson().toJson(errorResponse);
		}
	}

	@PostMapping("/signin")
	public String signIn(@RequestBody User user) {
		try {
			return accountService.signIn(user);
		} catch (Exception e) {
			UserResponse errorResponse = UserResponse.builder().status_cd("0").status_msg("FAIL")
					.usr_msg(e.getMessage()).http_status_cd("400").build();
			return new Gson().toJson(errorResponse);
		}

	}
}

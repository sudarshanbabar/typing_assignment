package com.assignment.typing.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.typing.model.HistoryRequest;
import com.assignment.typing.model.UserResponse;
import com.assignment.typing.service.HistoryService;
import com.google.gson.Gson;

@RestController
@RequestMapping("/api")
public class HistoryController {
	private static Map<String, String> users = new HashMap<>();

	@Autowired
	private HistoryService historyService;

	@PostMapping("/history")
	public String addHistory(@RequestBody HistoryRequest historyRequest) {
		try {
			return historyService.addHistory(historyRequest);
		} catch (Exception e) {
			UserResponse errorResponse = UserResponse.builder().status_cd("0").status_msg("FAIL")
					.usr_msg(e.getMessage()).http_status_cd("400").build();
			return new Gson().toJson(errorResponse);
		}
	}

	@GetMapping("/history/{accountId}")
	public String signIn(@PathVariable Long accountId) {
		try {
			return historyService.getHistory(accountId);
		} catch (Exception e) {
			UserResponse errorResponse = UserResponse.builder().status_cd("0").status_msg("FAIL")
					.usr_msg(e.getMessage()).http_status_cd("400").build();
			return new Gson().toJson(errorResponse);
		}

	}
}

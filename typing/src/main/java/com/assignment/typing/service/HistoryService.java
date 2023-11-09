package com.assignment.typing.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assignment.typing.model.History;
import com.assignment.typing.model.HistoryRequest;
import com.assignment.typing.model.HistoryResponse;
import com.assignment.typing.model.UserResponse;
import com.assignment.typing.repository.HistoryRepository;
import com.google.gson.Gson;

@Service
public class HistoryService {
	@Autowired
	private HistoryRepository historyRepository;

	public String addHistory(HistoryRequest historyRequest) {

		History history = new History(historyRequest);
		historyRepository.save(history);
		UserResponse successResponse = UserResponse.builder().status_cd("1").status_msg("SUCCESS")
				.usr_msg("History save successfully").http_status_cd("200").build();
		return new Gson().toJson(successResponse);
	}

	public String getHistory(Long accountId) {
//		List<History> historyList = historyRepository.findByAccountId(accountId);
		HistoryResponse successResponse = HistoryResponse.builder()
				.historyList(historyRepository.findByAccountId(accountId)).status_cd("1").status_msg("SUCCESS")
				.usr_msg("History data receive successfully").http_status_cd("200").build();
		return new Gson().toJson(successResponse);
	}

}

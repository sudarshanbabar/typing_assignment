package com.assignment.typing.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HistoryRequest {
	private Long accountId;
	private Long correct;
	private Long inCorrect;
	private Long wpm;
}

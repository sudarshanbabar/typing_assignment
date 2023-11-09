package com.assignment.typing.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class History {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private Long accountId;
	private Long correct;
	private Long inCorrect;
	private Long wpm;

	public History(HistoryRequest historyRequest) {
		super();
		this.accountId = historyRequest.getAccountId();
		this.correct = historyRequest.getCorrect();
		this.inCorrect = historyRequest.getInCorrect();
		this.wpm = historyRequest.getWpm();
	}

}

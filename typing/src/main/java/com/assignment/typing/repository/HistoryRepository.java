package com.assignment.typing.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.assignment.typing.model.History;

public interface HistoryRepository extends CrudRepository<History, Long> {
	List<History> findByAccountId(Long accountId);
}

package com.assignment.typing.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {

	private String status_cd;
	private String status_msg;
	private String usr_msg;
	private String http_status_cd;
	private Long acccountId;

}

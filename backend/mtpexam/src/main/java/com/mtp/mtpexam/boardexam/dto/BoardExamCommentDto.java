package com.mtp.mtpexam.boardexam.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BoardExamCommentDto {
    private Long id;
    private String writer;
    private String content;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime createdAt;

}

package com.mtp.mtpexam.boardexam.dto;


import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BoardExamCommentDto {
    private Long id;
    private String writer;
    private String content;
}

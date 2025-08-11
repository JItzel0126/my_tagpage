package com.mtp.mtpexam.boardexam.dto;


import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class BoardExamDto {

    private Long id;
    private String title;
    private String content;
    private String writer;
//    목록 시 사용
    private long commentCount;
//    상세 시 사용
    private List<BoardExamCommentDto> comments;
}

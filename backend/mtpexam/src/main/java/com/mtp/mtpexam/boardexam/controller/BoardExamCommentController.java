package com.mtp.mtpexam.boardexam.controller;

import com.mtp.mtpexam.boardexam.dto.BoardExamCommentDto;
import com.mtp.mtpexam.boardexam.entity.BoardExamComment;
import com.mtp.mtpexam.boardexam.service.BoardExamCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BoardExamCommentController {
    private final BoardExamCommentService commentService;

    // 특정 게시글의 댓글 목록
    @GetMapping("/api/posts/{postId}/comments")
    public Page<BoardExamCommentDto> list(
            @PathVariable Long postId,
            Pageable pageable
    ) {
        return commentService.findAllByBoardExamId(postId, pageable);
    }

    // 댓글 등록
    @PostMapping("/api/posts/{postId}/comments")
    public Long create(
            @PathVariable Long postId,
            @RequestBody BoardExamCommentDto req
    ) {
        BoardExamComment saved = commentService.save(postId, req);
        return saved.getId();
    }

    // 댓글 수정 (단일 자원 경로)
    @PatchMapping("/api/comments/{id}")
    public Long update(@PathVariable Long id, @RequestBody BoardExamCommentDto req) {
        return commentService.update(id, req).getId();
    }

    // 댓글 삭제
    @DeleteMapping("/api/comments/{id}")
    public void delete(@PathVariable Long id) {
        commentService.delete(id);
    }

}

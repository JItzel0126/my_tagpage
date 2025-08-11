package com.mtp.mtpexam.boardexam.controller;

import com.mtp.mtpexam.boardexam.dto.BoardExamDto;
import com.mtp.mtpexam.boardexam.entity.BoardExam;
import com.mtp.mtpexam.boardexam.repository.BoardExamCommentRepository;
import com.mtp.mtpexam.boardexam.service.BoardExamService;
import com.mtp.mtpexam.common.MapStruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173") // Vite 기준. CRA면 3000으로 변경
public class BoardExamController {
    private final BoardExamService boardExamService;
    private final BoardExamCommentRepository commentRepository;
    private final MapStruct mapStruct;

    // 목록 (검색 + 페이징)
    @GetMapping
    public Page<BoardExamDto> list(
            @RequestParam(defaultValue = "") String keyword,
            Pageable pageable
    ) {
        return boardExamService.findAll(keyword, pageable);
    }

    // 상세 (댓글은 별도 API에서 조회)
    @GetMapping("/{id}")
    public BoardExamDto detail(@PathVariable Long id) {
        BoardExam post = boardExamService.findById(id);     // 없으면 RuntimeException (배운대로)
        BoardExamDto dto = mapStruct.toDto(post);
        dto.setCommentCount(commentRepository.countByBoardExamId(id)); // 상세에도 카운트 채워주기(선택)
        return dto;
    }

    // 등록
    @PostMapping
    public Long create(@RequestBody BoardExamDto req) {
        return boardExamService.save(req).getId();
    }

    // 수정
    @PatchMapping("/{id}")
    public Long update(@PathVariable Long id, @RequestBody BoardExamDto req) {
        return boardExamService.update(id, req).getId();
    }

    // 삭제
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        boardExamService.delete(id);
    }
}

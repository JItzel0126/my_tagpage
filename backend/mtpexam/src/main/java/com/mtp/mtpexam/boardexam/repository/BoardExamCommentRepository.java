package com.mtp.mtpexam.boardexam.repository;

import com.mtp.mtpexam.boardexam.entity.BoardExamComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardExamCommentRepository extends JpaRepository<BoardExamComment,Long> {

    // 특정 게시글의 댓글 페이지 조회
    Page<BoardExamComment> findByBoardExamId(Long boardExamId, Pageable pageable);

    // 목록에 뿌릴 댓글 개수
    long countByBoardExamId(Long boardExamId);

    // 보안용: 해당 게시글 소속 댓글인지 검증할 때 유용
    Optional<BoardExamComment> findByIdAndBoardExamId(Long id, Long boardExamId);
}

package com.mtp.mtpexam.boardexam.repository;

import com.mtp.mtpexam.boardexam.entity.BoardExam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardExamRepository extends JpaRepository<BoardExam, Long> {

    // 제목/작성자 검색 (대소문자 무시)
    Page<BoardExam> findByTitleContainingIgnoreCaseOrWriterContainingIgnoreCase(
            String title, String writer, Pageable pageable);

    // 존재 여부 체크(수정/삭제 전에)
    boolean existsById(Long id);

}

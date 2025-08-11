package com.mtp.mtpexam.boardexam.repository;

import com.mtp.mtpexam.boardexam.entity.BoardExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardExamRepository extends JpaRepository<BoardExam, Long> {
}

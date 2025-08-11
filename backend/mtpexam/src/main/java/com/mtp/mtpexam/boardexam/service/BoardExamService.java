package com.mtp.mtpexam.boardexam.service;

import com.mtp.mtpexam.boardexam.dto.BoardExamCommentDto;
import com.mtp.mtpexam.boardexam.dto.BoardExamDto;
import com.mtp.mtpexam.boardexam.entity.BoardExam;
import com.mtp.mtpexam.boardexam.repository.BoardExamCommentRepository;
import com.mtp.mtpexam.boardexam.repository.BoardExamRepository;
import com.mtp.mtpexam.common.ErrorMsg;
import com.mtp.mtpexam.common.MapStruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.management.RuntimeErrorException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardExamService {
    private final BoardExamRepository boardExamRepository;
    private final BoardExamCommentRepository boardExamCommentRepository;
    private final MapStruct mapStruct;
    private final ErrorMsg errorMsg;

//    목록 조회 (검색+댓글 수 포함)
    public Page<BoardExamDto> findAll(String keyword, Pageable pageable) {
        Page<BoardExam> page = (keyword == null || keyword.isBlank())
                ? boardExamRepository.findAll(pageable)
                : boardExamRepository.findByTitleContainingIgnoreCaseOrWriterContainingIgnoreCase(keyword, keyword, pageable);

        return page.map(post->{
            BoardExamDto boardExamDto = mapStruct.toDto(post);
            boardExamDto.setCommentCount(boardExamCommentRepository.countByBoardExamId(post.getId()));
            return boardExamDto;
        });
    }

//    상세 조회
    public BoardExam findById(Long id) {
        return boardExamRepository.findById(id)
                .orElseThrow(()->new RuntimeException(errorMsg.getMessage("errors.not.found")));
    }

//    추가
    public BoardExam save(BoardExamDto boardExamDto) {
        BoardExam entity = mapStruct.toEntity(boardExamDto);
        return boardExamRepository.save(entity);
    }

//    수정(Dirty checking)
    public BoardExam update(Long id, BoardExamDto boardExamDto) {
        BoardExam boardExam = boardExamRepository.findById(id)
                .orElseThrow(()->new RuntimeException(errorMsg.getMessage("errors.not.found")));
            boardExam.setTitle(boardExamDto.getTitle());
            boardExam.setWriter(boardExamDto.getWriter());
            boardExam.setContent(boardExamDto.getContent());
            return boardExamRepository.save(boardExam);
    }

//    삭제 : 없으면 예외처리
    public void delete(Long id) {
        if (!boardExamRepository.existsById(id)) {
            throw new RuntimeException(errorMsg.getMessage("errors.not.found"));
        }
        boardExamRepository.deleteById(id);
    }

}

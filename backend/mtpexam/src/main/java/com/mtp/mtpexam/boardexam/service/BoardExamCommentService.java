package com.mtp.mtpexam.boardexam.service;

import com.mtp.mtpexam.boardexam.dto.BoardExamCommentDto;
import com.mtp.mtpexam.boardexam.entity.BoardExamComment;
import com.mtp.mtpexam.boardexam.repository.BoardExamCommentRepository;
import com.mtp.mtpexam.boardexam.repository.BoardExamRepository;
import com.mtp.mtpexam.common.ErrorMsg;
import com.mtp.mtpexam.common.MapStruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardExamCommentService {
    private final BoardExamCommentRepository boardExamCommentRepository;
    private final BoardExamRepository boardExamRepository;
    private final MapStruct mapStruct;
    private final ErrorMsg errorMsg;

//  댓글 목록

    public Page<BoardExamCommentDto> findAllByBoardExamId(Long boardExamId, Pageable pageable) {
        return boardExamCommentRepository.findByBoardExamId(boardExamId, pageable)
                .map(boardExamComment -> mapStruct.toDto(boardExamComment));
    }

    //    댓글 등록
    public BoardExamComment save(Long boardExamId, BoardExamCommentDto boardExamCommentDto) {
        var boardExamComment = boardExamRepository.findById(boardExamId)
                .orElseThrow(() -> new RuntimeException(errorMsg.getMessage("errors.not.found")));
        var boardExamCommentEntity = mapStruct.toEntity(boardExamCommentDto);
//        연관관계 주입
        boardExamCommentEntity.setBoardExam(boardExamComment);
        return boardExamCommentRepository.save(boardExamCommentEntity);
    }

    //    댓글 수정
    public BoardExamComment update(Long id, BoardExamCommentDto boardExamCommentDto) {
        var boardExamComment = boardExamCommentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(errorMsg.getMessage("errors.not.found")));
        boardExamComment.setContent(boardExamCommentDto.getContent());
        boardExamComment.setWriter(boardExamCommentDto.getWriter());
        return boardExamCommentRepository.save(boardExamComment);

    }

    //    댓글 삭제 : 없으면 예외처리
    public void delete(Long id) {
        if (!boardExamCommentRepository.existsById(id)) {
            throw new RuntimeException(errorMsg.getMessage("errors.not.found"));
        }
        boardExamCommentRepository.deleteById(id);
    }

}

package com.mtp.mtpexam.common;

import com.mtp.mtpexam.boardexam.dto.BoardExamCommentDto;
import com.mtp.mtpexam.boardexam.dto.BoardExamDto;
import com.mtp.mtpexam.boardexam.entity.BoardExam;
import com.mtp.mtpexam.boardexam.entity.BoardExamComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface MapStruct {

//    BoardExam
    @Mapping(target = "commentCount", ignore = true)
    @Mapping(target = "comments", ignore = true)
    BoardExamDto toDto(BoardExam boardExam);
//    생성 시 PK는 무시
    @Mapping(target = "id", ignore = true)
    BoardExam toEntity(BoardExamDto boardExamDto);

//    게시글 derty 체킹용
    void update(BoardExamDto boardExamDto, @MappingTarget BoardExam boardExam);

//    BoardExamComment
    BoardExamCommentDto toDto(BoardExamComment boardExamComment);

//    DTO를 엔티티로 변환할 때, DTO에는 boardExam 필드가 없거나(Long id만 있기 때문에)
//    연관관계 서비스에서 주입할 예정이기 때문에 ignore = ture로 무시
    @Mapping(target = "boardExam", ignore = true)
    @Mapping(target = "id", ignore = true)
    BoardExamComment toEntity(BoardExamCommentDto boardExamCommentDto);

//    코멘트 dirty 체킹용
    void updateComment(BoardExamCommentDto boardExamCommentDto
            , @MappingTarget BoardExamComment boardExamComment);

}

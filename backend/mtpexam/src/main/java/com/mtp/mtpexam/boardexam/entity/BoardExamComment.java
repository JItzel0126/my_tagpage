// src/main/java/com/mtp/mtpexam/entity/BoardExamComment.java

package com.mtp.mtpexam.boardexam.entity;

import com.mtp.mtpexam.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "post_comment",
// 댓글 테이블 인덱스: 정렬/조회 자주 하는 컬럼에 인덱스 추가.
       indexes = {
         @Index(name = "idx_comment_post", columnList = "board_exam_id"),
         @Index(name = "idx_comment_id_desc", columnList = "id")
       })

@Getter @Setter
@NoArgsConstructor
@ToString(exclude = "boardExam")
@AllArgsConstructor
@EqualsAndHashCode(of = "id", callSuper = false)
@Builder
public class BoardExamComment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "board_exam_id", nullable = false)
    private BoardExam boardExam;
    @Column(nullable = false, length = 40)
    private String writer;
    @Column(nullable = false, length = 1000)
    private String content;

}

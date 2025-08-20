// src/main/java/com/mtp/mtpexam/entity/BoardExam.java

package com.mtp.mtpexam.boardexam.entity;

import com.mtp.mtpexam.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "post_exam")

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "id", callSuper = false)
@Builder
public class BoardExam extends BaseTimeEntity {
    @Id
//    INSERT 할 때 데이터베이스가 자동으로 키 생성
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 160)
    private String title;
    @Lob
    private String content;
    @Column(nullable = false, length = 40)
    private String writer;

}

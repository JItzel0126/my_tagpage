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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 160)
    private String title;
    @Lob
    private String content;
    @Column(nullable = false, length = 40)
    private String writer;

}

// src/main/java/com/mtp/mtpexam/common/BaseTimeEntity.java

package com.mtp.mtpexam.common;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;

// JPA 공통 클래스, 생성일시 수정일시 값을 자동으로 생성

// @EntityListeners :
//      JPA 엔티티의 변경 이벤트를 감지하여 자동으로 값을 채워주는 기능을 활성화하는 어노테이션
//
// AuditingEntityListener.class:
//      JPA Auditing 기능을 구현하는 리스너
//      @CreatedDate, @LastModifiedDate 어노테이션이 붙은 필드에 자동으로 값을 채워줌
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public class BaseTimeEntity {

//  insert 때 생성일시 자동 생성
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
//  update 때 수정일시 자동 생성
    @LastModifiedDate
    private LocalDateTime updatedAt;
}

-- 게시글 데이터 (post_exam)
INSERT INTO post_exam (id, title, content, writer, created_at, updated_at) VALUES
                                                                               (1, '첫 번째 게시글', '이것은 첫 번째 게시글 내용입니다.', '관리자', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                               (2, '두 번째 게시글', '이것은 두 번째 게시글 내용입니다.', '테스터', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                               (3, '세 번째 게시글', '이것은 세 번째 게시글 내용입니다.', '홍길동', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                               (4, '네 번째 게시글', '이것은 네 번째 게시글 내용입니다.', '이몽룡', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                               (5, '다섯 번째 게시글', '이것은 다섯 번째 게시글 내용입니다.', '성춘향', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                               (6, '여섯 번째 게시글', '이것은 여섯 번째 게시글 내용입니다.', '아무개', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                               (7, '일곱 번째 게시글', '이것은 일곱 번째 게시글 내용입니다.', '김철수', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                               (8, '여덟 번째 게시글', '이것은 여덟 번째 게시글 내용입니다.', '박영희', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                               (9, '아홉 번째 게시글', '이것은 아홉 번째 게시글 내용입니다.', '나그네', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                               (10, '열 번째 게시글', '이것은 열 번째 게시글 내용입니다.', '운영자', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 댓글 데이터 (post_comment)
-- 1번 게시글 댓글
INSERT INTO post_comment (id, board_exam_id, writer, content, created_at, updated_at) VALUES
                                                                                          (1, 1, '댓글러1', '첫 번째 글의 첫 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                          (2, 1, '댓글러2', '첫 번째 글의 두 번째 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                          (3, 1, '댓글러3', '첫 번째 글의 세 번째 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 2번 게시글 댓글
INSERT INTO post_comment (id, board_exam_id, writer, content, created_at, updated_at) VALUES
                                                                                          (4, 2, '댓글러A', '두 번째 글의 첫 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                          (5, 2, '댓글러B', '두 번째 글의 두 번째 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 3번 게시글 댓글
INSERT INTO post_comment (id, board_exam_id, writer, content, created_at, updated_at) VALUES
    (6, 3, '댓글맨', '세 번째 글의 유일한 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 4번 게시글 댓글
INSERT INTO post_comment (id, board_exam_id, writer, content, created_at, updated_at) VALUES
                                                                                          (7, 4, '유저1', '네 번째 글의 첫 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                          (8, 4, '유저2', '네 번째 글의 두 번째 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                          (9, 4, '유저3', '네 번째 글의 세 번째 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                          (10, 4, '유저4', '네 번째 글의 네 번째 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 5번 게시글 댓글
INSERT INTO post_comment (id, board_exam_id, writer, content, created_at, updated_at) VALUES
    (11, 5, '익명', '다섯 번째 글의 첫 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 6번 게시글 댓글
INSERT INTO post_comment (id, board_exam_id, writer, content, created_at, updated_at) VALUES
                                                                                          (12, 6, '리플맨', '여섯 번째 글의 첫 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                          (13, 6, '리플걸', '여섯 번째 글의 두 번째 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 7번 게시글 댓글
INSERT INTO post_comment (id, board_exam_id, writer, content, created_at, updated_at) VALUES
                                                                                          (14, 7, '철수', '일곱 번째 글의 첫 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                          (15, 7, '영희', '일곱 번째 글의 두 번째 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                          (16, 7, '민수', '일곱 번째 글의 세 번째 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 8번 게시글 댓글
INSERT INTO post_comment (id, board_exam_id, writer, content, created_at, updated_at) VALUES
                                                                                          (17, 8, '댓글왕', '여덟 번째 글의 첫 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                          (18, 8, '댓글여왕', '여덟 번째 글의 두 번째 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 9번 게시글 댓글
INSERT INTO post_comment (id, board_exam_id, writer, content, created_at, updated_at) VALUES
    (19, 9, '나그네', '아홉 번째 글의 첫 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 10번 게시글 댓글
INSERT INTO post_comment (id, board_exam_id, writer, content, created_at, updated_at) VALUES
                                                                                          (20, 10, '운영자', '열 번째 글의 첫 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                          (21, 10, '관리자', '열 번째 글의 두 번째 댓글', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
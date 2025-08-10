// src/assets/pages/exam-cards/BoardExam.jsx
import { Link } from 'react-router-dom';
import ExamCard from '../../components/ExamCard';
import { useMemo, useState } from 'react';

// ✅ 상수 정리 (읽기 쉽고, 나중에 수정 쉬움)
const PAGE_SIZE = 5;

// 1) 샘플 데이터 (정적)
// const items = [] : items 배열 선언
//  {id, title, writer, createAt} 4개 키를 가진  객체 

export default function BoardExam () {

  const items = [
    { id: 13, title: '리액트 게시판 만들기 13', writer: '너굴', createdAt: '2025-08-10' },
    { id: 12, title: '리액트 게시판 만들기 12', writer: '너굴', createdAt: '2025-08-10' },
    { id: 11, title: '리액트 게시판 만들기 11', writer: '너굴', createdAt: '2025-08-10' },
    { id: 10, title: 'Tailwind 정리 10', writer: '파파야', createdAt: '2025-08-09' },
    { id: 9,  title: 'Tailwind 정리 9',  writer: '파파야', createdAt: '2025-08-09' },
    { id: 8,  title: 'Tailwind 정리 8',  writer: '파파야', createdAt: '2025-08-09' },
    { id: 7,  title: 'Tailwind 정리 7',  writer: '파파야', createdAt: '2025-08-09' },
    { id: 6,  title: 'Tailwind 정리 6',  writer: '파파야', createdAt: '2025-08-09' },
    { id: 5,  title: '첫 글 5', writer: '관리자', createdAt: '2025-08-08' },
    { id: 4,  title: '첫 글 4', writer: '관리자', createdAt: '2025-08-08' },
    { id: 3,  title: '첫 글 3', writer: '관리자', createdAt: '2025-08-08' },
    { id: 2,  title: '첫 글 2', writer: '관리자', createdAt: '2025-08-08' },
    { id: 1,  title: '첫 글 1', writer: '관리자', createdAt: '2025-08-08' },
  ];

  // 2) 키워드(프론트 필터) + 현재 페이지
  const [keyword, setKeyword] = useState('');
    // 기본값 0부터 시작 (0=1페이지)
  const [page, setPage] = useState(0);

  // 3) 필터링된 목록 (검색 적용)
  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return items;
    return items.filter(r =>
      [r.title, r.writer].some(v => (v || '').toLowerCase().includes(q))
    );
  }, [keyword, items]);

    // 4) 페이징 계산
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const current = Math.min(page, totalPages - 1); // 검색 후 페이지 초과 방지
  const start = current * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageItems = filtered.slice(start, end);

    // 5) 페이지 번호 배열 (간단히 전부 보여주기)
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  function goPage(p) {
    // 음수/초과 방지
    const safe = Math.min(Math.max(0, p), totalPages - 1);
    setPage(safe);
  }

    // 검색할 때는 1페이지로 이동
  function onSearch() {
    setPage(0);
  }

  return (
    <ExamCard
      title="BoardExam"
      desc="게시판 연습"
      className="min-h-screen bg-slate-100 p-6"
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold">게시판 목록</h1>
          <Link to="/practice" className="text-blue-600 underline">
            ← 연습 홈
          </Link>
          {/* 다음 단계에서 /boards/new로 이동 버튼 추가 예정 */}
        </header>

        {/* 검색 */}
        <div className="mb-4 flex gap-2">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            placeholder="제목/작성자 검색"
            className="flex-1 rounded-xl border px-3 py-2"
          />
          <button
            type="button"
            onClick={onSearch}
            className="rounded-xl border px-4 py-2 bg-white hover:bg-slate-50"
          >
            검색
          </button>
          <button
            type="button"
            onClick={() => { setKeyword(''); setPage(0); }}
            className="rounded-xl border px-4 py-2 bg-white hover:bg-slate-50"
          >
            초기화
          </button>
        </div>

        {/* 목록 테이블 */}
        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <table className="w-full text-left table-fixed">
            <colgroup>
              <col className="w-20" />
              <col />
              <col className="w-40" />
              <col className="w-40" />
            </colgroup>
            <thead className="bg-slate-50 text-slate-600 text-sm">
              <tr>
                <th className="px-4 py-3">번호</th>
                <th className="px-4 py-3">제목</th>
                <th className="px-4 py-3">작성자</th>
                <th className="px-4 py-3">작성일</th>
              </tr>
            </thead>
           <tbody>
              {pageItems.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                    데이터가 없어요.
                  </td>
                </tr>
              ) : (
                pageItems.map((row) => (
                  <tr key={row.id} className="border-t hover:bg-slate-50">
                    <td className="px-4 py-3">{row.id}</td>
                    <td className="px-4 py-3 truncate">{row.title}</td>
                    <td className="px-4 py-3">{row.writer}</td>
                    <td className="px-4 py-3">{row.createdAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

                {/* 페이징 */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-slate-600">
            총 {total}건 · {current + 1}/{totalPages}페이지
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => goPage(0)}
              className="rounded-lg border px-3 py-1.5 bg-white hover:bg-slate-50"
            >
              처음
            </button>
            <button
              onClick={() => goPage(current - 1)}
              className="rounded-lg border px-3 py-1.5 bg-white hover:bg-slate-50"
            >
              이전
            </button>

            {pages.map((p) => (
              <button
                key={p}
                onClick={() => goPage(p)}
                className={[
                  "rounded-lg border px-3 py-1.5",
                  p === current ? "bg-black text-white" : "bg-white hover:bg-slate-50"
                ].join(" ")}
              >
                {p + 1}
              </button>
            ))}

            <button
              onClick={() => goPage(current + 1)}
              className="rounded-lg border px-3 py-1.5 bg-white hover:bg-slate-50"
            >
              다음
            </button>
            <button
              onClick={() => goPage(totalPages - 1)}
              className="rounded-lg border px-3 py-1.5 bg-white hover:bg-slate-50"
            >
              끝
            </button>
          </div>
        </div>
      </div>
    </ExamCard>
  );
}
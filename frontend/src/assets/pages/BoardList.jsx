// src/assets/pages/BoardList.jsx
import { useEffect, useState, useMemo } from "react";
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"; 
// 예: VITE_API_BASE_URL="http://localhost:8080"


// 고정 폭(5rem= w-20, 10rem= w-40). 제목은 남은 폭을 먹게 'auto'
// title은 명시 안 하면 auto(남는 공간)
const COL_WIDTHS = {
  id: "4rem",
  writer: "5rem",
  createdAt: "5rem"
};

// 기본 컬럼(목록 비어있을 때 헤더/폭 유지용)
const DEFAULT_COLUMNS = ["id", "title", "writer", "createdAt"];

// 한국어 라벨 매핑
const LABELS = {
  id: "번호",
  title: "제목",
  writer: "작성자",
  createdAt: "작성일",
};

export default function BoardList(){
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const size = 3;
  

  // 서버 페이징
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const current = page; // 현재 페이지(0-base)

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // items를 보고 컬럼 자동 산출 (없으면 기본 컬럼 사용)
  const columns = useMemo(() => {
    if (items?.length > 0) {
      // 첫 행의 키에서 컬럼 산출 (원하는 순서와 다르면 DEFAULT_COLUMNS로 정렬해도 됨)
      const keys = Object.keys(items[0]);
      // 우리가 쓰는 4개만 필터 (백엔드가 더 많은 필드를 보낼 수도 있으니까)
      const filtered = DEFAULT_COLUMNS.filter((k) => keys.includes(k));
      return filtered.length ? filtered : DEFAULT_COLUMNS;
    }
    return DEFAULT_COLUMNS;
  }, [items]);

  async function fetchBoards({ page=0, size=5, keyword="" } = {}){
    try{
      setLoading(true);
      setErr("");
      const qs = new URLSearchParams({ page, size, keyword }).toString();

      // 경로 수정: /api/boards -> /api/posts
      const res = await fetch(`${BASE_URL}/api/posts?${qs}`);
      if(!res.ok) throw new Error(`HTTP ${res.status}`);

      // Spring page
      const data = await res.json();
      // data ; {content, totalElements, totalpages, number, size, ...}

      // Page 응답 또는 배열 응답 모두 대응
      setItems(Array.isArray(data) ? data : data?.content ?? []);
      setTotal(data?.totalElements ?? (Array.isArray(data) ? data.length : 0));
      setTotalPages(Math.max(1, data?.totalPages ?? 1));
      // 서버 기준 현재 페이지로 동기화
      setPage(data?.number ?? 0);
    }catch(e){
      setErr("목록 불러오기 실패 (백엔드 꺼짐/CORS/경로 확인)");
      // 임시 Mock
      setItems([
        { id: 1, title: "샘플 1", writer: "관리자", createdAt: "2025-08-10" },
        { id: 2, title: "샘플 2", writer: "홍길동", createdAt: "2025-08-10" },
      ]);
      setTotal(2);
      setTotalPages(1);
      setPage(0);
    }finally{
      setLoading(false);
    }
  }

  // 페이지 변경 시 서버 호출
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // 검색은 버튼/Enter로 트리거
  useEffect(() => { fetchBoards({ page, size, keyword:"" }); }, [page]);

  // 페이지 목록/이동 핸들러
  const pages = Array.from({length: totalPages}, (_, i) => i);
  function goPage(p){
    const safe = Math.min(Math.max(0,p), totalPages - 1);
    setPage(safe);
  }

  return (

    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold">게시판 목록</h1>
          <Link to="/practice" className="text-blue-600 underline">
        ← 게시판 연습
          </Link>
          {/* 다음 단계에서 /boards/new로 이동 버튼 추가 예정 */}
        </header>

        {/* 검색 */}
        <div className="mb-4 flex gap-2">
          <input
            value={keyword}
            onChange={(e)=>setKeyword(e.target.value)}
            onKeyDown={(e)=> e.key === 'Enter' && (setPage(0), fetchBoards({ page:0, size, keyword }))}
            placeholder="제목/작성자 검색"
            className="flex-1 rounded-xl border px-3 py-2"
          />
          <button
            onClick={()=>{ setPage(0); fetchBoards({ page:0, size, keyword }); }}
            className="rounded-xl border px-4 py-2 bg-white hover:bg-slate-50"
          >
            검색
          </button>
        </div>

        {/* 상태 */}
        {loading && <div className="mb-3 text-sm text-slate-500">로딩중…</div>}
        {err && <div className="mb-3 text-sm text-rose-600">{err}</div>}

        {/* 목록 테이블 */}        
        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <table className="w-full text-left table-fixed">
            <colgroup>
              {columns.map((col)=>(
                <col key={col}
                style={{width: COL_WIDTHS[col] || "auto"}}/>
              ))}
            </colgroup>

            <thead className="bg-slate-50 text-slate-600 text-sm">
              <tr>
                {columns.map((col) => (
                <th key={col} className="px-4 py-3 text-left">
                  {LABELS[col] || col}
                </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={columns.length} className="px-4 py-10 text-center text-slate-500">
                  데이터가 없어요.
                </td></tr>
              )}
              {items.map((row) => (
                <tr key={row.id} className="border-t hover:bg-slate-50">
                   {/* id */}
                  <td className="px-4 py-3">{row.id}</td>
                   {/* title (링크 + 댓글 수 뱃지 + 말줄임) */}
                  <td className="px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                    <Link to={`/boards/${row.id}`} className="hover:font-bold">
                  {row.title}
                  {!!row.commentCount && (
                    <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                    💬 {row.commentCount}
                    </span>
                  )}
                    </Link>
                  </td>
                  {/* writer */}
                  <td className="px-4 py-3">{row.writer}</td>
                  {/* createdAt */}
                  <td className="px-4 py-3">{row.createdAt ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이징 */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-slate-600">
            총 {total}건 · {current + 1}/{totalPages}페이지
          </div>       
              {/* 처음 페이지 이동 */}
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
              onClick={() => goPage(0)} disabled={current === 0}
              className="rounded-lg border px-3 py-1.5 bg-white hover:bg-slate-50">
              처음
            </button>
            {/* 이전 페이지 이동 */}
          <button
            onClick={()=>goPage(current - 1)} disabled={current === 0}
            className="rounded-xl border px-3 py-1.5 bg-white hover:bg-slate-50">
            이전
          </button>
              {/* 이동 페이지 버튼 색 바꾸기 */}
          {pages.map((p) => (
              <button
                key={p}
                onClick={() => goPage(p)}
                className={[
                  "rounded-lg border px-3 py-1.5",
                  p === current ? "bg-black text-white" : "bg-white hover:bg-slate-50"
                ].join(" ")}>
                {p + 1}
              </button>
            ))}
            {/* 다음 페이지 이동 */}
          <button
            onClick={()=>goPage(current + 1)} disabled={current >= totalPages -1}
            className="rounded-xl border px-3 py-1.5 bg-white hover:bg-slate-50">
            다음
          </button>
          <button
              onClick={()=>goPage(totalPages - 1)} disabled={current >= totalPages -1}
              className="rounded-lg border px-3 py-1.5 bg-white hover:bg-slate-50">
              끝
            </button>
        </div>
        </div> 
      </div>
    </div>
  );
}
// src/assets/pages/BoardList.jsx
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ""; 
// 예: VITE_API_BASE_URL="http://localhost:5173"

export default function BoardList(){
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const size = 10;
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function fetchBoards({ page=0, size=10, keyword="" } = {}){
    try{
      setLoading(true);
      setErr("");
      const qs = new URLSearchParams({ page, size, keyword }).toString();
      const res = await fetch(`${BASE_URL}/api/boards?${qs}`);
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // Page 응답 또는 배열 응답 모두 대응
      setItems(Array.isArray(data) ? data : data?.content ?? []);
    }catch(e){
      setErr("목록 불러오기 실패 (백엔드 꺼짐/CORS/경로 확인)");
      // 임시 Mock
      setItems([
        { id: 1, title: "샘플 1", writer: "관리자", createdAt: "2025-08-10" },
        { id: 2, title: "샘플 2", writer: "홍길동", createdAt: "2025-08-10" },
      ]);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => { fetchBoards({ page, size, keyword:"" }); }, [page]);

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
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-600 text-sm">
              <tr>
                <th className="px-4 py-3 w-20">번호</th>
                <th className="px-4 py-3">제목</th>
                <th className="px-4 py-3 w-40">작성자</th>
                <th className="px-4 py-3 w-40">작성일</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                  데이터가 없어요.
                </td></tr>
              )}
              {items.map((row) => (
                <tr key={row.id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3">{row.id}</td>
                  <td className="px-4 py-3">{row.title}</td>
                  <td className="px-4 py-3">{row.writer}</td>
                  <td className="px-4 py-3">{row.createdAt ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이징 (아주 기본) */}
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={()=>setPage(p=>Math.max(0, p-1))}
            className="rounded-xl border px-3 py-1.5 bg-white hover:bg-slate-50"
          >
            이전
          </button>
          <span className="text-sm text-slate-600">page {page+1}</span>
          <button
            onClick={()=>setPage(p=>p+1)}
            className="rounded-xl border px-3 py-1.5 bg-white hover:bg-slate-50"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
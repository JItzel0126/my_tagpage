// BoardDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export default function BaoardDetail () {

  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [cPage, setCPage] = useState(0);
  const cSize = 3;
  const [cTotal, setCTotal] = useState(0);
  const [cTotalPages, setCTotalPages] = useState(1);
// 글상세
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(`${BASE_URL}/api/posts/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPost(data);
      } catch (e) {
        setErr("글을 불러오지 못했어요 🥲");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
// 댓글목록
  useEffect(()=> {
    (async () => {
      try {
        setLoadingComments(true);
        const qs = new URLSearchParams({ page: cPage, size: cSize }).toString(); // ✅ qs 추가
        const res = await fetch(`${BASE_URL}/api/posts/${id}/comments?${qs}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setComments(data?.content ?? []);
        setCTotal(data?.totalElements ?? 0);
        setCTotalPages(Math.max(1, data?.totalPages ?? 1));
        setCPage(data?.number ?? 0);
      } catch (e) {
        setErr("코멘트를 불러오지 못했어요 🥲");
      } finally {
        setLoadingComments(false);
      }
    })();
  }, [id, cPage]);

  if (loading) return <div className='p-4'>로딩중_</div>;
  if (err)     return <div className="p-4 text-rose-600">{err}</div>;
  if (!post)   return <div className="p-4">데이터가 없어요.</div>;
  
  return(
     <section className="min-h-[85vh] flex flex-col overflow-hidden border-2 border-slate-100 bg-white shadow-sm">
      <header className="bg-slate-200 text-zinc-600 p-3 space-y-2">
        <div className="flex flex-wrap gap-2">
          <div className="rounded border px-2 py-1">번호 {post.id}</div>
          <div className="rounded border px-2 py-1">작성자 {post.writer}</div>
          <div className="rounded border px-2 py-1">작성일 {post.createdAt?.slice(0,10) ?? "-"}</div>
          <div className="rounded border px-2 py-1">조회 {post.views ?? 0}</div>
          <div className="rounded border px-2 py-1">좋아요 {post.likes ?? 0}</div>
        </div>
        <h2 className="text-xl font-bold truncate">{post.title}
          {!!post.commentCount && (
                    <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                    💬 {post.commentCount} </span>
                    )}
        </h2>
        
      </header>

      <main className="min-h-[70vh] flex-1 p-4">
        <div className="prose max-w-none whitespace-pre-wrap">
          {post.content}
        </div>
      </main>

      <footer className="h-12 bg-blue-50 text-blue-900 flex items-center gap-2 px-4">
        <Link to="/board" className="rounded px-3 py-1.5 bg-white border">목록</Link>
        <button className="rounded px-3 py-1.5 bg-white border">수정</button>
        <button className="rounded px-3 py-1.5 bg-white border">삭제</button>        
      </footer>

      {/* 코멘트 영역 */}
      <section className='my-2 rounded-xl border-2 border-slate-200 bg-white'>
      <div className="prose max-w-none whitespace-pre-wrap p-2 border-2 border-slate-200 bg-slate-200">
          댓글 <span>{post.commentCount ?? comments.length} </span>개
      </div>
      {loadingComments && <div className="px-4 py-3 text-sm text-slate-500">댓글 로딩중…</div>}

        {comments.length === 0 && !loadingComments ? (
          <div className="px-4 py-10 text-center text-slate-400">첫 댓글을 남겨보세요!</div>
        ) : (
          <ul className="divide-y">
            {comments.map(c => (
              <li key={c.id} className="px-4 py-3">
                <div className="text-sm text-slate-600">
                  <b>{c.writer}</b> · {c.createdAt ?? "-"}
                </div>
                <div className="mt-1 whitespace-pre-wrap">{c.content}</div>
              </li>
            ))}
          </ul>
        )}

         {/* 댓글 페이징(간단) */}
         {cTotalPages > 1 && (
        <div className="mt-4 flex items-center justify-end gap-2 px-4 pb-4">
          <button onClick={()=>setCPage(0)} disabled={cPage===0}
            className="rounded-lg border px-1 py-1 bg-white disabled:opacity-50">처음</button>
          <button onClick={()=>setCPage(p=>Math.max(0,p-1))} disabled={cPage===0}
            className="rounded-full border px-1 py-1 bg-white disabled:opacity-50">이전</button>
          <span className="text-sm text-slate-600">
            {cPage+1}/{cTotalPages} 페이지 · 총 {cTotal}개
          </span>
          <button onClick={()=>setCPage(p=>Math.min(cTotalPages-1,p+1))} disabled={cPage>=cTotalPages-1}
            className="rounded-full border px-1 py-1 bg-white disabled:opacity-50">다음</button>
          <button onClick={()=>setCPage(cTotalPages-1)} disabled={cPage>=cTotalPages-1}
            className="rounded-lg border px-1 py-1 bg-white disabled:opacity-50">끝</button>
        </div>
        )}
      </section>
    </section>
  )
}


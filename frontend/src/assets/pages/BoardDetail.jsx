// BoardDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// import.meta.env.VITE_API_BASE_URL : Vite에서 제공하는 환경 변수 접근 방식
// Vite에서 환경 변수 이름은 VITE_로 시작해야만 클라이언트 코드에 접근 가능

// import.meta.env : Vite 전용 전역 객체
// VITE_API_BASE_URL 이라는 이름의 변수를 .env 파일에 정의해 두고 읽음
// || - .env에 값이 있으면 그걸 쓰고, 없으면 로컬 서버 주소로 대체
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// export default function 함수 () { ... }
// 컴포넌트가 화면에 뭘 보여줄지 정의하는 JSX 실행문

export default function BoardDetail () {

  // 1. (선택) 변수, 상태, 훅, 데이터 패치 로직
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

  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if(!window.confirm("정말 삭제할까요? 복구가 어려워요 🥲")) return;

    try {
    setDeleting(true);
    const res = await fetch(`${BASE_URL}/api/posts/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || `HTTP ${res.status}`);
    }
    // 성공 → 목록으로
    window.location.href = "/boards"; 
  } catch (e) {
    console.error(e);
    alert(`삭제 실패 ㅠㅠ (${e.message})`);
    setDeleting(false);
  }
    
  }

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

  // 2. return 안 = 실제로 브라우저에 렌더링할 JSX
  //  JSX는 HTML처럼 보이지만 JavaScript 안에서 쓰는 XML 문법. 안의 태그들은 DOM에 렌더링.
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
        <Link to="/boards" className="rounded px-3 py-1.5 bg-white border">목록</Link>
        <Link to={`/boards/${post.id}/edit`} className="rounded px-3 py-1.5 bg-white border hover:bg-yellow-500 hover:text-slate-50">수정</Link>

        {/* 삭제 */}

        <button 
        onClick={handleDelete}
        disabled= {deleting}
        className="rounded px-3 py-1.5 bg-white border hover:bg-red-500 hover:text-slate-50">
          {deleting ? "삭제중..." : "삭제"}
          </button>        
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

         {/* 댓글 페이징 */}
              {/* 댓글이 4개 미만일 때만 표시 */}
         {cTotalPages > 1 && (
        <div className="mt-4 flex items-center justify-end gap-2 px-4 pb-4">
              {/* 처음 */}
          <button onClick={()=>setCPage(0)} disabled={cPage===0}
            className="rounded-lg border px-1 py-1 bg-white disabled:opacity-50">처음</button>
              {/* 이전 */}
          <button onClick={()=>setCPage(p=>Math.max(0,p-1))} disabled={cPage===0}
            className="rounded-full border px-1 py-1 bg-white disabled:opacity-50">이전</button>
              {/* 댓글페이지 */}
          <span className="text-sm text-slate-600">
            {cPage+1}/{cTotalPages} 페이지 · 총 {cTotal}개
          </span>
              {/* 다음 */}
          <button onClick={()=>setCPage(p=>Math.min(cTotalPages-1,p+1))} disabled={cPage>=cTotalPages-1}
            className="rounded-full border px-1 py-1 bg-white disabled:opacity-50">다음</button>
              {/* 끝 */}
          <button onClick={()=>setCPage(cTotalPages-1)} disabled={cPage>=cTotalPages-1}
            className="rounded-lg border px-1 py-1 bg-white disabled:opacity-50">끝</button>
        </div>
        )}
      </section>
    </section>
  )
}


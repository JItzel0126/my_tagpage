// BoardsNew.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"; 



export default function BoardsNew () {
  const nav = useNavigate();

  const [title, setTitle]   = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');

  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    if(!title.trim() || !writer.trim()){
      setErr('제목과 작성자는 필수예요!');
      return;
    }
    try{
      setSaving(true);
      setErr('');
      const res = await fetch(`${BASE_URL}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ title, writer, content }),
      });
      if(!res.ok){
        const msg = await res.text();
        throw new Error(msg || `HTTP ${res.status}`);
      }
      const newId = await res.json(); // 컨트롤러가 Long id 반환
      // 저장 완료 → 상세 페이지로 이동
      nav(`/boards/${newId}`);
    }catch(e){
      console.error(e);
      setErr('저장에 실패했어요. (필드/서버 로그 확인)');
    }finally{
      setSaving(false);
    }
  }
  
  return(

    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-3xl">
        <header className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold">새 글 작성</h1>
          <Link to="/boards" className="text-blue-600 underline">목록</Link>
        </header>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-5 shadow space-y-4">
          {err && <div className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{err}</div>}

          <div>
            <label className="block text-sm text-slate-600 mb-1">제목 *</label>
            <input
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              className="w-full rounded-lg border px-3 py-2"
              maxLength={160}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">작성자 *</label>
            <input
              value={writer}
              onChange={(e)=>setWriter(e.target.value)}
              placeholder="작성자 이름"
              className="w-60 rounded-lg border px-3 py-2"
              maxLength={40}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">내용</label>
            <textarea
              value={content}
              onChange={(e)=>setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              className="min-h-[160px] w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div className="flex gap-2">
            {/* 저장 */}
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
            >
              {saving ? '저장 중…' : '저장'}
            </button>
            {/* 취소 */}
            <Link to="/boards"
            className="rounded-lg border px-4 py-2 bg-white hover:bg-slate-50">
              취소
            </Link>
          </div>
        </form>
      </div>
    </div>

  )
}
// BoardsEdit.jsx

import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"; 

export default function BoardsEdit () {

  const { id } = useParams();
  const nav = useNavigate();

  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    setLoading(true);
    setErr('');
    fetch(`${BASE_URL}/api/posts/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })       
      .then(data => {
        setTitle(data.title);
        setWriter(data.writer);
        setContent(data.content);
      })
      .catch(e => {
        console.error(e);
        setErr('불러오기 실패 ㅠㅠ');
      })
      .finally(()=> setLoading(false));
  }, [id]);

  // HTTP 메서드 : CRUD 기준
  // POST → Create (새 글 작성)
  // GET → Read (글 읽기)
  // PUT → Update (수정)
  // PATCH → Update (부분 수정)
  // DELETE → Delete (삭제)

  // PUT과 PATCH 차이
  // PUT : 전체 교체 
  // PATCH : 부분 수정 느낌 (JPA+더티체킹)

  async function handleUpdate(e) {
        if(!window.confirm("정말 수정할까요?")) return;
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch(`${BASE_URL}/api/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, writer, content }),
      });
      if (!res.ok){
        const msg = await res.text();
        throw new Error(msg || `HTTP ${res.status}`);
      } 
      nav(`/boards/${id}`);
    } catch (e) {
      console.error(e);
      setErr('수정 실패 ㅠㅠ');
    } finally{
        setSaving(false);
      }
  }

  if (loading) return <p>불러오는 중...</p>;


  return (

    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-3xl">
        <header className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold">수정</h1>
          <Link to="/boards" className="rounded px-3 py-1.5 bg-white border hover:bg-slate-50">목록</Link>
        </header>

   <form onSubmit={handleUpdate} className="rounded-2xl bg-white p-5 shadow space-y-4">
    {err && <div className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{err}</div>}

    {/* 제목 */}
    <div>
      <label className="block text-sm text-slate-600 mb-1">제목</label>
    {/* required : boolean 속성,
      required 속성이 명시되면 해당 입력 필드는 필수 입력 항목 */}
      <input
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        className="w-full rounded-lg border px-3 py-2"
        maxLength={160}
        required />
    </div>
    
    {/* 작성자 */}
    <div>
      <label className="block text-sm text-slate-600 mb-1">작성자</label>
      <input
        value={writer}
        onChange={(e)=>setWriter(e.target.value)}
        className="w-full rounded-lg border px-3 py-2"
        maxLength={40}
        required />
    </div>

      {/* 본문 */}
      <div>
        <label className="block text-sm text-slate-600 mb-1">내용</label>
        <textarea 
          value={content} 
          onChange={(e)=>setContent(e.target.value)}
          className="min-h-[160px] w-full rounded-lg border px-3 py-2" />
      </div>
      
      {/* 액션 */}
      <div className="flex gap-2">
        {/* 수정 */}
        <button 
        type="submit"
        disabled={saving}
        className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50 hover:bg-yellow-500">
        {saving ? '수정중...' : '수정'}
        </button>

        {/* 취소 */}
            <Link to={`/boards/${id}`}
            className="rounded-lg border px-4 py-2 bg-white hover:bg-slate-50">
              취소
            </Link>
      </div>
      
    </form>






      </div>
    </div>
  )
}
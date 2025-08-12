// ContentBoard.jsx

import { Link } from 'react-router-dom';

export default function ContentBoard(){
  return(
    <section className="min-h-[85vh] flex flex-col rounded-2xl overflow-hidden border-2 border-slate-100 bg-white shadow-sm">
        <header className="h-25 shrink-0 bg-slate-200 text-zinc-500 flex flex-col justify-center gap-1 p-1">
          <aside className="grid grid-cols-12 gap-2">
              <div className="col-span-2 md:col-span-1 rounded border">
                <h3>번호</h3>
              </div>
            <div className="col-span-7 md:col-span-9 rounded border"></div>
            <div className="col-span-3 md:col-span-2 rounded border">
              <h3>작성자</h3>            
            </div>
          </aside>
          <aside className="grid grid-cols-12 gap-1">
            <div className="col-span-9 md:col-span-10 rounded-md border p-1">
              <p>제목</p>
            </div>
            <div className="col-span-3 md:col-span-2 rounded-md border p-1">
              <p>작성일</p>
            </div>
          </aside>          
          <aside className="grid grid-cols-12">
            <div className="col-span-8 md:col-span-10 p-1"></div>
            <div className="col-span-2 md:col-span-1 p-1">조회수</div>
            <div className="col-span-2 md:col-span-1 p-1">좋아요</div>
          </aside>
          </header>

          <main className="flex-1 bg-white p-4">
            <div className="flex flex-col md:flex-row gap-4 h-full">
              <section className="flex-1">
                <div title="Content">내용</div>
              </section>
            </div>
          </main>
          <footer className="h-12 shrink-0 bg-blue-50 text-blue-900 flex items-center px-4">
            <button><Link to="/board"> 목록 </Link></button>
            <button>수정</button>
            <button>삭제</button>
          </footer> 
    </section>
  )
}
// HomePage.jsx
export default function HomePage() {
  return (
    <div className="min-h-screen bg-lime-50">
      <header className="mx-auto max-w-5xl px-4 pt-10 pb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">My TagPage 👋</h1>
        <p className="mt-2 text-gray-600">리액트 + 타일윈드 연습 중… 천천히 가자 🐢</p>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16">
        {/* 히어로 카드 */}
        <div className="rounded-2xl bg-white shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800">빠른 시작</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            <li className="rounded-xl border p-4 hover:shadow">
              <div className="text-sm text-gray-500">바로가기</div>
              <a href="/board" className="text-xl font-semibold text-gray-900 hover:underline">게시판</a>
              <p className="text-gray-500 mt-1">연습용 CRUD 페이지</p>
            </li>
            <li className="rounded-xl border p-4 hover:shadow">
              <div className="text-sm text-gray-500">상태</div>
              <div className="text-xl font-semibold text-gray-900">Frontend OK · Backend 대기</div>
              <p className="text-gray-500 mt-1">지금은 화면만 만든다!</p>
            </li>
          </ul>
        </div>

        {/* 그리드 카드 예시 */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800">최근 업데이트</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Tailwind 세팅", "라우터 연결", "게시판 UI 초안"].map((t,i)=>(
              <article key={i} className="rounded-xl bg-white border p-4 hover:shadow">
                <h4 className="font-bold text-gray-900">{t}</h4>
                <p className="text-sm text-gray-500 mt-1">작업 진행 중...</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
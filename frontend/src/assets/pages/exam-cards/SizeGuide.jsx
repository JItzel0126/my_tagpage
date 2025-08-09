// SizeGuide.jsx
// Tailwind 사이즈/스페이싱/폰트 크기 시각 가이드
// - 라우트 예: { path: "/size-guide", element: <SizeGuide /> }

import { Link } from "react-router-dom";
import ExamCard from "../../components/ExamCard";

export default function SizeGuide() {
  return (
    <ExamCard
      title="SizeGuide"
      desc="Tailwind 사이즈 유틸리티 한눈에 보기"
      className="space-y-6"
    >
      <div className="space-y-8">
        <Section title="① Width (가로폭)">
          <p className="text-sm text-gray-600">컨테이너 폭 대비 각 유틸리티가 차지하는 실제 길이를 시각화합니다.</p>
          <BarRow label="w-12 (3rem/48px)" barClass="w-12" />
          <BarRow label="w-24 (6rem/96px)" barClass="w-24" />
          <BarRow label="w-40 (10rem/160px)" barClass="w-40" />
          <BarRow label="w-1/2 (50%)" barClass="w-1/2" />
          <BarRow label="w-2/3 (~66.67%)" barClass="w-2/3" />
          <BarRow label="w-full (100%)" barClass="w-full" />
          <BarRow label="w-[72px] (임의 px)" barClass="w-[72px]" />
          <BarRow label="w-[22ch] (문자폭 단위)" barClass="w-[22ch]" />
        </Section>

        <Section title="② Height (세로높이)">
          <p className="text-sm text-gray-600">고정 높이/뷰포트 높이/유연 높이 예시.</p>
          <div className="flex flex-wrap items-end gap-4 p-4 rounded-xl bg-white border">
            <TallBox label="h-12 (48px)" className="h-12" />
            <TallBox label="h-24 (96px)" className="h-24" />
            <TallBox label="min-h-[8rem]" className="min-h-[8rem]" />
            <TallBox label="h-[20vh]" className="h-[20vh]" />
            <TallBox label="h-auto (내용만)" className="h-auto" content="auto" />
          </div>
        </Section>

        <Section title="③ Padding / Margin (여백)">
          <p className="text-sm text-gray-600">여백 크기가 카드 레이아웃에 주는 영향.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PadCard title="p-2 (0.5rem)" pad="p-2" />
            <PadCard title="p-4 (1rem)" pad="p-4" />
            <PadCard title="p-6 (1.5rem)" pad="p-6" />
            <PadCard title="px-6 py-2" pad="px-6 py-2" />
            <PadCard title="m-4 + p-4" pad="p-4" extra="m-4" />
            <PadCard title="gap-4 (자식 간 간격)" pad="p-4" withGap />
          </div>
        </Section>

        <Section title="④ 글자 크기 (text-*)">
          <div className="rounded-xl bg-white border divide-y">
            <FontRow cls="text-xs" note="12px" sample="text-xs — 작은 캡션" />
            <FontRow cls="text-sm" note="14px" sample="text-sm — 일반 캡션" />
            <FontRow cls="text-base" note="16px" sample="text-base — 본문 기본" />
            <FontRow cls="text-lg" note="18px" sample="text-lg — 약간 크게" />
            <FontRow cls="text-xl" note="20px" sample="text-xl — 섹션 타이틀" />
            <FontRow cls="text-2xl" note="24px" sample="text-2xl — 페이지 타이틀" />
            <FontRow cls="text-3xl" note="30px" sample="text-3xl — 히어로 헤드라인" />
            <FontRow cls="text-4xl" note="36px" sample="text-4xl — 큰 헤드라인" />
          </div>
        </Section>

        <Section title="⑤ 사이즈 스케일 & 팁">
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><b>스페이싱 단위</b>: 대부분의 숫자 스케일은 <code>1 → 0.25rem (4px)</code>. 예: <code>4 → 1rem(16px)</code>, <code>6 → 1.5rem(24px)</code>, <code>8 → 2rem(32px)</code>, <code>12 → 3rem(48px)</code>, <code>14 → 3.5rem(56px)</code>, <code>16 → 4rem(64px)</code>.</li>
            <li><b>임의 값</b>: 대괄호로 커스텀 — <code>w-[72px]</code>, <code>h-[10rem]</code>, <code>max-w-[60ch]</code>.</li>
            <li><b>size-*</b>: 동시에 너비·높이 지정 — <code>size-14</code>는 <code>w-14 h-14</code>와 동일 (3.5rem/56px).</li>
            <li><b>뷰포트 단위</b>: <code>w-screen</code>, <code>h-screen</code>, <code>min-h-[50vh]</code> 등으로 화면 비율 기반 레이아웃.</li>
            <li><b>텍스트 줄 바꿈 제어</b>: 폭이 좁으면 <code>min-w-0</code>를 중첩 컨테이너에 부여해 줄바꿈을 허용.</li>
          </ul>
          <div className="grid sm:grid-cols-2 gap-4 mt-3">
            <div className="p-4 rounded-xl bg-white border">
              <div className="font-semibold mb-2">스페이싱 빠른 표</div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {[
                  [1, "0.25rem / 4px"],
                  [2, "0.5rem / 8px"],
                  [3, "0.75rem / 12px"],
                  [4, "1rem / 16px"],
                  [6, "1.5rem / 24px"],
                  [8, "2rem / 32px"],
                  [10, "2.5rem / 40px"],
                  [12, "3rem / 48px"],
                  [14, "3.5rem / 56px"],
                  [16, "4rem / 64px"],
                ].map(([n, v]) => (
                  <div key={n} className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2">
                    <code>*-{n}</code>
                    <span className="text-gray-600">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border">
              <div className="font-semibold mb-2">min/max 폭 제어</div>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">max-w-sm</div>
                  <div className="max-w-sm p-2 bg-blue-50 rounded">좁은 카드 — 긴 텍스트가 자동 줄바꿈됩니다.</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">max-w-[60ch]</div>
                  <div className="max-w-[60ch] p-2 bg-blue-50 rounded">본문 가독성 최적 폭(~60ch). 이 범위를 넘어가면 가독성이 떨어질 수 있어요.</div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      <Link to="/practice" className="text-blue-600 underline">← 목록으로</Link>
    </ExamCard>
  );
}

function Section({ title, children }) {
  return (
    <section className="p-4 rounded-2xl border-2 border-blue-950 bg-lime-100">
      <h2 className="text-lg font-extrabold mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function BarRow({ label, barClass = "" }) {
  return (
    <div className="grid grid-cols-[180px,1fr] items-center gap-3">
      <div className="text-sm text-gray-700"><code>{label}</code></div>
      <div className="h-8 bg-slate-100 rounded overflow-hidden">
        <div className={`h-full bg-blue-500 ${barClass}`} />
      </div>
    </div>
  );
}

function TallBox({ label, className = "", content }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-16 rounded-md bg-blue-500/70 ${className}`} />
      <div className="mt-1 text-xs text-gray-700">{label}</div>
    </div>
  );
}

function PadCard({ title, pad = "", extra = "", withGap = false }) {
  return (
    <div className={`rounded-2xl border bg-white ${extra}`}>
      <div className={`rounded-2xl ${pad} ${withGap ? "space-y-2" : ""}`}>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-600">본문 컨텐츠</div>
        {withGap && (
          <div className="text-xs text-gray-500">자식들 사이에 <code>gap</code> 대신 <code>space-y</code> 사용</div>
        )}
      </div>
    </div>
  );
}

function FontRow({ cls, note, sample }) {
  return (
    <div className="flex items-baseline justify-between py-2 px-3">
      <div className={`font-medium ${cls}`}>{sample}</div>
      <div className="text-xs text-gray-600"><code>{cls}</code> · {note}</div>
    </div>
  );
}
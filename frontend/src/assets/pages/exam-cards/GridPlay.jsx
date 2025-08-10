// exam-cards/GridPlay.jsx
import { Link } from "react-router-dom";
import ExamCard from "../../components/ExamCard";
/**
 * 목표(초급):
 * 1) grid 시작하기: grid + grid-cols-N + gap
 * 2) 반응형 컬럼: sm:, md:, lg:
 * 3) auto-fit + minmax: 카드가 "알아서" 줄/칸 맞추게
 * 4) 셀 병합 느낌: col-span, row-span
 * 5) 정렬: items-*, justify-items-*, place-content-*
 */
export default function GridPlay() {
  return (
    <ExamCard title="Grid Play ①" desc="그리드 레이아웃 초급 패턴"
    className="space-y-6 flex flex-col">
    <div>
        <p className="hint mb-4 border bg-gray-50 rounded p-2"> <b>손가락에 심는 Grid 핵심 요약</b>
          <br/>시작: grid + grid-cols-N + gap-*
          <br/>반응형: grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ...
          <br/>자동 맞춤: [grid-template-columns:repeat(auto-fit,minmax(12rem,1fr))]
          <br/>셀 병합: col-span-*, 세로 병합: row-span-* (+ auto-rows-*랑 궁합)
          <br/>정렬: justify-items-*(가로), items-*(세로), 둘 다 = place-items-*
        </p>

      <Section title="① grid 시작하기: grid-cols + gap">
        <p className="hint mb-4 border bg-gray-50 rounded p-2">
          <code>grid</code> + <code>grid-cols-3</code> + <code>gap-3 </code>
          : 3열(수직) 그리드, 간격 0.75rem.<br/>
          : 가로 방향으로 3개의 컬럼을 갖는 그리드 레이아웃을 만들고, 각 컬럼 사이에 3 단위의 간격을 적용하라는 의미
        </p>
        <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded-xl border">
          {[...Array(9)].map((_, i) => (
            <Cell key={i}>cell {i + 1}</Cell>
          ))}
        </div>
      </Section>
    </div>

      <Section title="② 반응형 컬럼: 모바일 1열 → md 3열 → lg 4열">
        <p className="hint mb-4 border bg-gray-50 rounded p-2">
          <code>grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 </code> <br/>
          : <b>모바일</b> - 1열 col, <b>sm(640px 이상)</b> - 2열 col, 
            <b> md(768px 이상)</b> - 3열 col, <b>lg(1024px 이상)</b> - 4열 col,<br/>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-white p-3 rounded-xl border">
          {[...Array(8)].map((_, i) => (
            <Cell key={i}>R {i + 1}</Cell>
          ))}
        </div>
      </Section>

      <Section title="③ auto-fit + minmax: 칸이 '알아서' 줄어들고 늘어남">
        <p className="hint mb-4 border bg-gray-50 rounded p-2">
          <code>grid [grid-template-columns:repeat(auto-fit,minmax(12rem,1fr))]</code>
          <br/>: 카드 최소 12rem, 남으면 1fr로 늘림.
          <br/><b>grid-template-columns:</b> CSS 그리드에서 열의 레이아웃을 정의하는 속성.
          <br/><b>repeat():</b> 일정한 패턴을 반복하여 열을 생성하는 함수.
          <br/><b>auto-fit:</b> 가능한 한 많은 열을 채우도록 지정. 공간이 부족하면 열을 줄여서라도 채우려고 시도.
          <br/><b>minmax(12rem,1fr):</b> 각 열의 최소 너비를 12rem. 최대 너비는 사용 가능한 공간에 맞춰 유연하게 조정(1fr).
          <br/><b>fr(fractional unit):</b> 사용 가능한 공간을 분할하는 비율. 공간이 충분하면 1fr만큼 늘어나고, 공간이 부족하면 최소 크기인 12rem으로 줄어듭니다.
          <br/>예)  3개의 열이 1fr로 설정되어 있으면, 사용 가능한 공간을 3등분하여 각 열에 할당.
          
        </p>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(12rem,1fr))] gap-3 bg-white p-3 rounded-xl border">
          {["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"].map(
            (t) => (
              <Card key={t} title={t}>
                이 레이아웃은 화면 폭에 맞춰 칸 수가 자동으로 변해요.
              </Card>
            ))}
        </div>
      </Section>

      <Section title="④ 셀 병합 느낌: col-span / row-span">
        <p className="hint mb-4 border bg-gray-50 rounded p-2">
          <code><b>col-span-12</b></code> 12열 그리드에서 가로 전체,{" "}
          <br/><code><b>md:col-span-X</b></code>은 md 이상에서 X칸 차지.
        </p>
        <div className="grid grid-cols-12 gap-3 bg-white p-3 rounded-xl border">
          <Banner className="col-span-12">헤더(가로 전체) 
            <code><b> : col-span-12</b></code>
          </Banner>
          <Card className="col-span-12 md:col-span-8" title="메인">
            <code><b>col-span-12, md:col-span-8</b></code>
            <br/>내용이 길 수도 있는 메인 영역.
          </Card>
          <Card className="col-span-12 md:col-span-4" title="사이드">
            <code><b>md:col-span-4</b></code>
            <br/>작은 보조 정보.
          </Card>
          <Card className="col-span-6" title="하단 A">
            <code><b>col-span-6</b></code>
            <br/>6칸
          </Card>
          <Card className="col-span-6" title="하단 B">
            <code><b>col-span-6</b></code>
            <br/>6칸
          </Card>
        </div>

        <p className="hint mt-3 mb-4 border bg-gray-50 rounded p-2">
          <code>grid grid-cols-3 auto-rows-[(X)px] </code>
          <br/><b>auto-rows-[60px]:</b> 명시적으로 지정되지 않은 행(암시적 행)의 높이를 (X)픽셀로 설정.
          <br/><code><b>row-span-2 : </b></code>
           1열 카드가 세로로 2칸 차지.
        </p>
        <div className="grid grid-cols-3 auto-rows-[60px] gap-3 bg-white p-3 rounded-xl border">
          <Cell className="row-span-2">row 2x<br/>row-span-2</Cell>
          <Cell>1x</Cell>
          <Cell>1x</Cell>
          <Cell>1x</Cell>
          <Cell>1x</Cell>
        </div>
      </Section>

       <Section title="⑤ 정렬: items / justify-items / place-content">
       <p className="hint mt-3 mb-4 border bg-gray-50 rounded p-2">
          <code> 기본 : grid grid-cols-3 gap-3 </code>
       </p>
        <div className="grid grid-cols-3 gap-3">
          <DemoBox title="기본(좌상)">
            <div className="grid h-28 border rounded-xl p-2 bg-white">
              <Dot>•</Dot>
            </div>
          </DemoBox>

          <DemoBox title="가로 가운데: justify-items-center">
            <div className="grid h-28 border rounded-xl p-2 bg-white justify-items-center">
              <Dot>•</Dot>
            </div>
          </DemoBox>

          <DemoBox title="세로 가운데: items-center">
            <div className="grid h-28 border rounded-xl p-2 bg-white items-center">
              <Dot>•</Dot>
            </div>
          </DemoBox>

          <DemoBox title="둘 다 가운데: place-items-center">
            <div className="grid h-28 border rounded-xl p-2 bg-white place-items-center">
              <Dot>•</Dot>
            </div>
          </DemoBox>

          <DemoBox title="컨텐츠 정렬: place-content-center">
            <div className="grid h-28 border rounded-xl p-2 bg-white place-content-center gap-2">
              <Dot>•</Dot>
              <Dot>•</Dot>
            </div>
          </DemoBox>

          <DemoBox title="끝으로 몰기: place-items-end">
            <div className="grid h-28 border rounded-xl p-2 bg-white place-items-end">
              <Dot>•</Dot>
            </div>
          </DemoBox>
        </div>
      </Section>

      <Link to="/practice" className="text-blue-600 underline">
        ← 목록으로
      </Link>
    </ExamCard>
  );
}

/* ---------- 작은 빌딩 블록들 ---------- */
function Section({ title, children }) {
  return (
    <section className="p-4 rounded-2xl border-2 border-blue-950 bg-sky-50">
      <h2 className="text-lg font-extrabold mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Cell({ children, className = "" }) {
  return (
    <div className={`h-16 rounded-xl border flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

function Card({ title, children, className = "" }) {
  return (
    <div className={`rounded-2xl border p-4 flex flex-col ${className}`}>
      <div className="font-semibold mb-1">{title}</div>
      <p className="text-sm text-gray-600">{children}</p>
    </div>
  );
}

function Banner({ children, className = "" }) {
  return (
    <div className={`h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

function DemoBox({ title, children }) {
  return (
    <div>
      <div className="text-sm font-semibold mb-1">{title}</div>
      {children}
    </div>
  );
}

function Dot({ children }) {
  return (
    <div className="size-10 rounded-full border flex items-center justify-center">
      {children}
    </div>
  );
}
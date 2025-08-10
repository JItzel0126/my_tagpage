// FlexPlay.jsx
import { Link } from 'react-router-dom';
import ExamCard from '../../components/ExamCard';

export default function FlexPlay(){
    return (
        <ExamCard title="FlexPlay" desc="레이아웃 구조 연습"
        className = "space-y-2"
        >
          <p className="hint mb-4 border bg-gray-50 rounded p-2"> <b>손가락에 심는 Grid 핵심 요약</b>
          <br/> <b>className="space-y-size"</b> : 요소들의 세로 방향 간격을 지정할 때 사용
          <br/>flex-1 = “남는 공간을 한 몸에 먹는다.”
          <br/>grow / shrink / basis = “공간 나눠먹기 3형제”
          <br/>“푸터 바닥 붙이기”는 부모 flex-col + 콘텐츠 flex-1 조합
          <br/>반응형은 md:flex-row 같은 프리픽스로 방향 전환
          <br/>줄바꿈은 flex-wrap + gap-*로 타일 느낌
          <br/>교차축 정렬 헷갈리면: items-*는 세로축(기본 row일 때), justify-*는 가로축
        </p>

        <div className="space-y-6">
        <Section title="① 가로/세로 전환 + 간격(gap)">
            {/* 기본: 가로 정렬 */}
            <div>className="flex flex-wrap gap-3"<br/>
            <b>flex :</b> HTML 요소를 플렉스 컨테이너로 만들어주는 역할, 기본 가로 정렬, <b>gap :</b> 간격</div>
        <div className="flex flex-wrap gap-3 p-3 border rounded-xl bg-white">           
          <Box>1</Box><Box>2</Box><Box>3</Box>
        </div>
            {/* 모바일 세로, md 이상 가로 */}
            <div>className="flex flex-col md:flex-row "<br/>
            <b>flex-col : </b>세로 정렬<br/>
            <b>md:flex-row :</b> Tailwind CSS 반응형 유틸리티 클래스, 미디엄(medium) 화면 크기 이상은 가로 정렬 </div>
        <div className="flex flex-col md:flex-row gap-3 p-3 border rounded-xl bg-white">
          <Box>모바일 세로</Box><Box>md↑ 가로</Box><Box>반응형</Box>
        </div>
      </Section>

       <Section title="② 정렬축: justify(주축) / items(교차축)">
        {/* 가운데 정렬 */}
        <div>className="flex justify-center items-center"<br/>
            <b>justify :</b> 주축(기본 가로), <b>items :</b> 교차축, <b>center :</b> 가운데 정렬<br/> ex) justify-center : flex 컨테이너의 메인 축(main axis)을 따라 요소들을 가운데로 위치시키는 역할  </div>
        <div className="flex justify-center items-center gap-3 p-3 h-24 border rounded-xl bg-white">
          <Box>center</Box><Box>center</Box>
        </div>
        {/* 공간 분배 */}
        <div>className="flex justify-between items-start"<br/>
            <b>justify-between :</b> 아이템들을 컨테이너의 주축(가로축) 양 끝으로 정렬하고, 아이템들 사이의 공간을 균등하게 분배하는 스타일<br/>
            <b>items-start :</b> 교차축(세로축)의 시작 부분(위쪽)에 정렬 </div>
        <div className="h-32 flex flex-wrap justify-between items-start gap-3 p-3 border rounded-xl bg-white">
          <Box>left</Box><Box>middle</Box><Box>right</Box>
        </div>
      </Section>

       <Section title="③ Flex Wrap + ‘타일’ 자동 줄바꿈">
        <div>className="flex flex-wrap gap-3"<br/>
            <b>flex-wrap :</b> 플렉스 컨테이너 내에서 아이템들이 넘칠 때 줄 바꿈을 할지 여부를 결정하는 속성 </div>
        <div className="flex flex-wrap gap-3 p-3 border rounded-xl bg-white">
          {Array.from({ length: 10 }).map((_, i) => (
            <Box key={i} className="basis-32 grow">tile {i+1}</Box>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          tip) <code>flex-wrap</code>으로 줄바꿈, <code>basis</code>로 기본 폭, <code>grow</code>로 남는 공간 나눠먹기
        </p>
      </Section>

       <Section title="④ Holy Grail 변형: 헤더/메인/푸터(푸터 바닥 고정)">
        <div className="min-h-[50vh] flex flex-col border rounded-xl overflow-hidden">
          <header className="h-12 shrink-0 bg-blue-900 text-white flex items-center px-4">
            Header
          </header>
          <main className="flex-1 bg-white p-4">
            <div className="flex flex-col md:flex-row gap-4 h-full">
              <aside className="md:w-60 shrink-0">
                <Panel title="Sidebar">링크들</Panel>
              </aside>
              <section className="flex-1">
                <Panel title="Content">스크롤 많은 콘텐츠</Panel>
              </section>
              <aside className="md:w-60 shrink-0">
                <Panel title="Extra">보조 패널</Panel>
              </aside>
            </div>
            <aside className='mt-4 border bg-gray-50 rounded p-2'>
             <div>컨테이너 div = "min-h-[50vh] flex flex-col h-full"<br/>
             <b>min-h-[50vh] :</b> 요소의 최소 높이를 뷰포트 높이의 50%로 설정한다는 의미<br/>
             <b>h-full :</b> `height: 100%`와 같습니다. 즉, 요소의 높이는 해당 요소의 부모 요소의 높이를 기준으로 결정<br/>
             header className = "h-12 shrink-0"<br/>           
             main className="flex-1" <br/>
             aside className = "md:w-60 shrink-0"<br/>
             section className="flex-1"<br/>
             footer className="h-12 shrink-0<br/>
             <b>flex-1 :</b> 요소가 사용 가능한 공간을 모두 차지하도록 설정하는 단축 속성<br/></div>
             <b>h-12 :</b> height: 3rem /* 48px */<br/>
             <b>shrink-0 :</b> flex 아이템이 컨테이너의 공간이 부족할 때 축소되지 않도록 설정하는 유틸리티 클래스. 기본값은 1이며, 숫자가 클수록 더 많이 축소<br/>
            </aside>

          </main>
          <footer className="h-12 shrink-0 bg-blue-50 text-blue-900 flex items-center px-4">
            Footer (flex-col + flex-1 조합으로 ‘바닥 붙음’)
          </footer>
        </div>
      </Section>

          <Section title="⑤ 미디어 오브젝트 패턴(아바타 + 본문)">
        <div className="flex items-start gap-4 p-4 border rounded-xl bg-white">
          <div className="size-14 rounded-full bg-blue-200 shrink-0 flex items-center justify-center font-bold">A</div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold">제목입니다</div>
            <p className="text-sm text-gray-600 line-clamp-2">
              옆에 동그란 썸네일/아이콘 두고 오른쪽에 텍스트가 유동적으로 차는 “미디어 오브젝트” 패턴!
              <span className="hidden md:inline"> md 이상에서 더 긴 텍스트도 안정적으로 레이아웃됩니다.</span>
            </p>
          </div>
          <button className="px-3 py-1 rounded-lg border hover:bg-blue-900 hover:text-white transition">
            액션
          </button>
        </div>
         <div className='mb-4 border bg-gray-50 rounded p-2'>컨테이너 div = "flex items-start"<br/>
             <b>items-start :</b> 교차축(cross axis)(현재 수직축)의 시작점으로 정렬하는 역할<br/>
             심볼 className = "size-14 rounded-full shrink-0"<br/>
             <b>size-14 :</b> 14rem. 요소의 크기를 기본 크기의 14배로 설정하는 유틸리티 클래스입니다.(w-14/h-14) 주로 글자 크기, 너비, 높이를 조절할 때 사용<br/>           
             텍스트 className="flex-1 min-w-0" <br/>
             <b>flex-1 min-w-0 :</b> 각각 다른 역할을 하지만 함께 사용될 때 컨테이너 내의 요소의 크기 조정 및 레이아웃을 제어하는데 효과적<br/>
             flex-1은 요소가 컨테이너에서 유연하게 늘어나거나 줄어들도록 하고, min-w-0은 요소의 최소 너비를 0으로 설정하여 내용이 넘칠 때 줄어들 수 있도록 합니다. 두 클래스를 함께 사용하면, 요소가 컨테이너 너비에 유연하게 대응하면서 내용이 잘리지 않고 표시될 수 있도록 합니다.<br/>
             <b>flex-1 :</b>flex-grow: 1; flex-shrink: 1; flex-basis: 0; 과 같음.<br/>
             flex 컨테이너 내에서 가능한 모든 공간을 차지하도록 늘어나고, 컨테이너의 크기가 줄어들면 함께 줄어들도록 설정합니다. `flex-basis: 0;`은 아이템의 초기 크기를 0으로 설정하여, 내용의 크기에 영향을 받지 않고 컨테이너 크기에 맞춰 늘어나거나 줄어들 수 있도록 합니다. <br/>
             <b>min-w-0 :</b> 요소의 최소 너비를 0으로 설정<br/>
             내용이 길어 컨테이너 너비를 초과할 경우, 내용이 잘리거나 숨겨지는 대신 요소의 너비가 줄어들 수 있습니다. <br/>
             span className = "hidden md:inline"<br/>
             <b>hidden md:inline :</b> 모바일에서 숨김. md 이상에서는 inline 속성<br/>
             button className="hover:text-white transition<br/>
             <b>hover:(A) :</b> 마우스 호버시 A 적용<br/>
             <b>transition :</b> 요소의 스타일 변화가 즉시 적용되지 않고 부드럽게 전환되도록 하는 효과<br/>
          </div>
      </Section>

      <Section title="⑥ 카드 동일 높이 + ‘버튼 하단 정렬’">
        {/* 핵심: 부모는 flex-col, 본문은 flex-1 로 밀어 올리고, 버튼은 맨 아래 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Alpha","Bravo","Charlie","Delta","Echo","Foxtrot"].map((title) => (
            <div key={title}
                 className="flex flex-col border rounded-2xl p-4 bg-white">
              <div className="text-lg font-bold mb-1">{title}</div>
              <p className="text-sm text-gray-600">
                카드 내용이 길어도… 짧아도… 높이를 맞출 수 있어요.
              </p>
              <div className="flex-1" />
              <button className="mt-3 h-10 rounded-xl border hover:bg-blue-900 hover:text-white transition">
                자세히
              </button>
            </div>
          ))}
        </div>
            <div className='mb-4 border bg-gray-50 rounded p-2'>부모 div = "flex flex-col"<br/>
             타이틀 div<br/>
             본문 div<br/>
             <b>(items-end)</b> 본문 아래 div className="flex-1" <br/>
             하단 버튼 <br/>
             <b>핵심 :</b> 부모는 flex-col, 본문은 flex-1 로 밀어 올리고, 버튼은 맨 아래 <br/>
             <b>transition :</b> flex-1로 내용 영역이 남은 공간을 차지하도록 하며,<br/>
             items-end로 하단 정렬을 구현합니다. 이렇게 하면 카드의 높이가 동일하게 유지되고, 버튼이 항상 하단에 위치하게 됨.<br/>
          </div>
      </Section>

            </div>

            <Link to="/practice" className="text-blue-600 underline">
                ← 목록으로
            </Link>
        </ExamCard>
    )
}

function Section({ title, children }) {
  return (
    <section className="p-4 rounded-2xl border-2 border-blue-950 bg-lime-100">
      <h2 className="text-lg font-extrabold mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Panel({ title, children }) {
  return (
    <div className="border rounded-xl p-3 h-full bg-white">
      <div className="font-semibold mb-2">{title}</div>
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );
}

function Box({ children, className="" }) {
  return (
    <div className={`h-12 min-w-20 px-3 rounded-xl border flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}
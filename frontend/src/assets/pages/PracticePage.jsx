import { useParams, Link } from "react-router-dom";

export default function PracticePage(){
 // /practice 들어오면 메뉴, /practice/1이면 1번
    const { id = "menu" } = useParams();

    const registry = {
    menu: { comp: Menu,       title: "메뉴" },
    "1":  { comp: HelloWorld, title: "HelloWorld" },
    "2":  { comp: GridPlay,   title: "GridPlay" },
  };

  const entry = registry[id] ?? { comp: () => <div><Empty /></div>, title: "Empty" };
  const Comp = entry.comp;
  const title = entry.title;

 return (
    <div className="min-h-screen pb-8 pt-6 flex flex-col items-center bg-amber-50">
      <h1 className="w-52 h-14 rounded-3xl border-2 border-blue-950 font-bold flex items-center justify-center shadow">
        Practice{id} {title}
      </h1>

      <div className="mt-8 w-full max-w-5xl px-4">
        <Comp />
      </div>
    </div>
  );
}

/* ===== 이 아래부터는 같은 파일 안에 “연습용 컴포넌트들” ===== */

function Menu() {
  // 연습 목록
  const items = [
    { id: "1", title: "HelloWorld" },
    { id: "2", title: "GridPlay" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((it) => (
        <Link
          key={it.id}
          to={`/practice/${it.id}`}
          className="rounded-2xl border-2 border-blue-950 h-14 flex items-center justify-center font-semibold hover:bg-blue-950 hover:text-white transition"
        >
          {it.title}
        </Link>
      ))}
    </div>
  );
}

function HelloWorld() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-44 h-14 rounded-3xl border border-amber-100 bg-amber-200 shadow-md font-semibold text-blue-300 flex items-center justify-center">
        hello world
      </div>
    <div className="flex flex-col gap-4">
       {/* 기본 */}
    <div className="border p-2">
        <div className="font-bold text-2xl mb-1">Basic</div>
      <div className="text-base font-nomal mb-1"> HelloWorld (className= text-base font-nomal) </div>
      <div>
        <b>text-base </b> (font-size: 1rem /* 16px */; line-height: 1.5rem /* 24px */;)<br />
        <b>font-nomal </b> (font-weight : 400;)
      </div>
    </div>
      {/* 크기 변화 */}
      <div className="border p-2">
      <div className="text-sm">Hello World (className= text-sm)<br />
        <b>font-size</b>: 0.875rem /* 14px */;<br />
        <b>line-height</b>: 1.25rem /* 20px */</div>
      <div className="text-lg">Hello World (className= text-lg)<br />
        <b>font-size</b>: 1.125rem /* 14px */<br />
        <b>line-height</b>: 1.75rem /* 20px */</div>
      <div className="text-2xl">Hello World (className= text-2xl)<br />
        <b>font-size</b>: 1.5rem /* 14px */<br />
        <b>line-height</b>: 2rem /* 20px */</div>
      <div className="text-5xl">Hello World (className= text-5xl)<br />
        <b>font-size</b>: 3rem /* 14px */<br />
        <b>line-height</b>: 1 </div>
    </div>
      {/* 굵기 변화 */}
      <div className="border p-2">
      <div className="font-thin">Hello World (className= font-thin)<br />
        <b>font-weight</b>: 100</div>
      <div className="font-normal">Hello World (className= font-normal)<br />
        <b>font-weight</b>: 400</div>
      <div className="font-bold">Hello World (className= font-bold)<br />
        <b>font-weight</b>: 700</div>
      <div className="font-extrabold">Hello World (className= font-extra-bold)<br />
        <b>font-weight</b>: 800</div>
    </div>
      {/* 스타일 변화 */}
    <div className="border p-2">
      <div className="italic">Hello World (className= italic)<br />
        <b>font-style</b>: italic</div>
      <div className="not-italic">Hello World (className= not italic)<br />
        <b>font-style</b>: normal</div>
      <div className="uppercase">Hello World (className= UPPERCASE)<br />
        <b>text-transform</b>: uppercase</div>
      <div className="lowercase">Hello World (className= lowercase)<br />
        <b>text-transform</b>: lowercase</div>
      <div className="capitalize">hello world (className= Capitalize)<br />
        <b>text-transform</b>: capitalize</div>
    </div>
      {/* 폰트 패밀리 - Tailwind 기본 */}
      <div className="border p-2">
        <div className="font-bold text-2xl pb-1">font-family - Tailwind 기본</div>
      <div className="font-sans">Hello World (className= font-sans)</div>
      <div className="font-serif">Hello World (className= font-serif)</div>
      <div className="font-mono">Hello World (className= font-mono)</div>
      </div>
    </div>

      <Link to="/exampage" className="text-blue-600 underline">
        ← 목록으로
      </Link>
    </div>
  );
}

function GridPlay() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-20 rounded-2xl border-2 border-blue-950" />
        ))}
      </div>
      <Link to="/exampage" className="text-blue-600 underline">
        ← 목록으로
      </Link>
    </div>
  );
}

function Empty() {
  return (
    <div className="text-center">
      <p className="text-lg">해당 연습이 없어요 😭</p>
      <Link to="/exampage" className="text-blue-600 underline">
        ← 목록으로
      </Link>
    </div>
  );
}
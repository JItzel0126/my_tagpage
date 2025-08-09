import { useParams, Link } from "react-router-dom";
import { HelloWorld, GridPlay, Empty } from '../assets/exam-cards';

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






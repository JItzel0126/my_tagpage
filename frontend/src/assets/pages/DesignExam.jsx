import { Link } from "react-router-dom";

export default function DesignExam(){
    return(
        <div className="min-h-screen pb-2 pt-2 flex items-center justify-start flex-col bg-gray-100">
            <div className="w-52 h-14 rounded-3xl border border-blue-950 font-bold flex items-center justify-center shadow-lg">
                Design Exam
            </div>
            <div className="pt-10 pb-4 w-screen flex items-center justify-center">
                <DesignCard />
            </div>    
    
        </div>
    )

}
export function DesignCard(){
  // 연습 목록
  const items = [
    { id: "1", title: "HelloWorld" },
    { id: "2", title: "GridPlay" },
    { id: "3", title: "Empty" },
  ];
  return (
    <div className="flex flex-wrap gap-3 sm:grid-cols-2">
      {items.map((it) => (
        <Link
          key={it.id}
          to={`/practice/${it.id}`}
          className="w-44 h-14 rounded-2xl border-2 border-blue-950 h-14 flex items-center justify-center font-semibold hover:bg-blue-950 hover:text-white transition"
        >
          {it.title}
        </Link>
      ))}
    </div>
  );
}


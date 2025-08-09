
export default function Empty() {
  return (
    <div className="text-center">
      <p className="text-lg">해당 연습이 없어요 😭</p>
      <Link to="/exampage" className="text-blue-600 underline">
        ← 목록으로
      </Link>
    </div>
  );
}
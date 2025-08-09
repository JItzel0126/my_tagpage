
export default function GridPlay() {
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
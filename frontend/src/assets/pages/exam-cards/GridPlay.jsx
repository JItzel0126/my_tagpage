// GridPlay.jsx
import { Link } from 'react-router-dom';
import ExamCard from '../../components/ExamCard';

export default function GridPlay() {
  return (
    <ExamCard title="Grid Play" desc="간단한 카드 그리드 레이아웃">
      <div style={{
        display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8
      }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ background:'#f5f5f5', padding:12, textAlign:'center' }}>
            box {i+1}
          </div>
        ))}
      </div>
      <Link to="/practice" className="text-blue-600 underline">
        ← 목록으로
      </Link>
    </ExamCard>
  );
}


// export default function GridPlay() {
//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {Array.from({ length: 8 }).map((_, i) => (
//           <div key={i} className="h-20 rounded-2xl border-2 border-blue-950" />
//         ))}
//       </div>
//       <Link to="/exampage" className="text-blue-600 underline">
//         ← 목록으로
//       </Link>
//     </div>
//   );
// }
// Empty.jsx
import { Link } from 'react-router-dom';
import ExamCard from '../../components/ExamCard';

export default function Empty() {
  return (
    <ExamCard title="Empty" desc="Empty"
    className='flex flex-col'>
      <button onClick={() => alert('해당 연습이 없어요 😭')}>Empty</button>
       <Link to="/practice" className="text-blue-600 underline">
        ← 목록으로
      </Link>
    </ExamCard>
  );
}
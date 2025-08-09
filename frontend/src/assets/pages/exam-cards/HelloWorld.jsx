// HelloWorld.jsx
import { Link } from 'react-router-dom';
import ExamCard from '../../components/ExamCard';

export default function HelloWorld() {
  return (
    <ExamCard title="Hello World" desc="텍스트 디자인 변경 연습"
    className = "flex flex-col items-center justify-center gap-3">
    <button onClick={() => alert('Hello World')}
            className="w-28 h-10 mb-4 rounded-2xl border border-amber-100 bg-amber-200 shadow-md font-semibold text-blue-300 flex items-center justify-center">
            Hello World</button>
    <div className="flex flex-col gap-4">
       {/* 기본 */}
    <div className="border p-2">
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
        <b>font-size</b>: 1.125rem /* 18px */<br />
        <b>line-height</b>: 1.75rem /* 28px */</div>
      <div className="text-2xl">Hello World (className= text-2xl)<br />
        <b>font-size</b>: 1.5rem /* 24px */<br />
        <b>line-height</b>: 2rem /* 32px */</div>
      <div className="text-5xl">Hello World (className= text-5xl)<br />
        <b>font-size</b>: 3rem /* 48px */<br />
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

      <Link to="/practice" className="text-blue-600 underline">
        ← 목록으로
      </Link>
    </ExamCard>
  );
}


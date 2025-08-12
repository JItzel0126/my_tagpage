// BoardDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export default function BaoardDetail () {

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(`${BASE_URL}/api/posts/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPost(data);
      } catch (e) {
        setErr("글을 불러오지 못했어요 🥲");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  
  return(
    <div className="min-h-screen pb-2 pt-2 flex items-center flex-col  bg-slate-100">
      <div className="text-center m-2">게시판</div>
      <div className="w-full md:w-10/12 border bg-gray-50 rounded p-2">
        <ContentBoard />
      </div>
    </div>
  )
}


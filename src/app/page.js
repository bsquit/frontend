// import Image from "next/image";

'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return <div>Hello from Frontent</div>;
}

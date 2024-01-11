'use client';

import React, { useState, useEffect } from 'react';
import './Home.css';
import TableComponent from './components/TableComponent';

interface GPUStatus {
  gpu_id: string;
  pid: string;
  user: string;
}

interface ServerStatus {
  server_ip: string;
  status: GPUStatus[];
  success: boolean;
}

type Response = ServerStatus[];

export default function Home() {
  const [data, setData] = useState<Response | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className='table-container'>
      {data ? data.map((item, index) => <TableComponent key={index} serverStatus={item} />) : 'Loading...'}
    </main>
  );
}

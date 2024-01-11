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
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://127.0.0.1:5000')
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLastUpdated(new Date());
        })
        .catch((err) => console.error(err));
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main>
      <h1>GPUser</h1>
      <div>Last updated: {lastUpdated ? lastUpdated.toLocaleString() : 'Never'}</div>
      <div className='table-container'>
        {data ? data.map((item, index) => <TableComponent key={index} serverStatus={item} />) : 'Loading...'}
      </div>
    </main>
  );
}

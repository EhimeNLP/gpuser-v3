import React from 'react';
import './TableComponent.css';

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

type Props = {
  serverStatus: ServerStatus;
};

const TableComponent = ({ serverStatus }: Props) => {
  if (!serverStatus.success) {
    return <div className='error-message'>&quot;{serverStatus.server_ip}&quot; からのデータ取得に失敗しました。</div>;
  }

  let allEmptyPid = true;
  let hasEmptyPid = false;

  for (const status of serverStatus.status) {
    if (status.pid !== '') {
      allEmptyPid = false;
    } else {
      hasEmptyPid = true;
    }
  }
  const captionElementMap: { [key: string]: JSX.Element } = {
    true: <span style={{ color: 'red' }}>&#9679;</span>, // all gpu are empty
    false: hasEmptyPid ? (
      <span style={{ color: 'green' }}>&#9650;</span>
    ) : (
      <span style={{ color: 'blue' }}>&#10006;</span>
    ), // some or all gpu are used
  };

  const captionElement = captionElementMap[String(allEmptyPid)];

  return (
    <div className='table-component'>
      <h2>
        {captionElement} {serverStatus.server_ip}
      </h2>
      <table className='gpu-status-table table table-striped'>
        <thead>
          <tr>
            <th>GPU ID</th>
            <th>PID</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {serverStatus.status.map((status, i) => (
            <tr key={i}>
              <td>{status.gpu_id}</td>
              <td>{status.pid}</td>
              <td>{status.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableComponent;

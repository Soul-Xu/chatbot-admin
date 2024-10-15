import React, { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';

const data = [
  { letter: 'A', frequency: 0.08167 },
  { letter: 'B', frequency: 0.01492 },
  { letter: 'C', frequency: 0.02782 },
  { letter: 'D', frequency: 0.04253 },
  { letter: 'E', frequency: 0.12702 },
  { letter: 'F', frequency: 0.02288 },
  { letter: 'G', frequency: 0.02015 },
  { letter: 'H', frequency: 0.06094 },
  { letter: 'I', frequency: 0.06966 },
  { letter: 'J', frequency: 0.00153 },
  { letter: 'K', frequency: 0.00772 },
  { letter: 'L', frequency: 0.04025 },
  { letter: 'M', frequency: 0.02406 },
  { letter: 'N', frequency: 0.06749 },
  { letter: 'O', frequency: 0.07507 },
  { letter: 'P', frequency: 0.01929 },
  { letter: 'Q', frequency: 0.00095 },
  { letter: 'R', frequency: 0.05987 },
  { letter: 'S', frequency: 0.06327 },
  { letter: 'T', frequency: 0.09056 },
  { letter: 'U', frequency: 0.02758 },
  { letter: 'V', frequency: 0.00978 },
  { letter: 'W', frequency: 0.0236 },
  { letter: 'X', frequency: 0.0015 },
  { letter: 'Y', frequency: 0.01974 },
  { letter: 'Z', frequency: 0.00074 },
];

const Letter = () => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const chart = new Chart({
        container: containerRef.current,
        autoFit: true,
      });

      chart.data(data);
      chart.interval().encode('x', 'letter').encode('y', 'frequency');
      chart.render();

      // 保存chart实例，以便后续操作（如更新、销毁等）
      // @ts-ignore
      chartRef.current = chart;
    }

    // 清理函数，在组件卸载时销毁图表
    return () => {
      if (chartRef.current) {
        // @ts-ignore
        chartRef.current.destroy();
      }
    };
  }, []); // 依赖data，当data变化时重新渲染图表

  return <div ref={containerRef} style={{ width: '100%', height: '400px' }} />;
};

export default Letter;
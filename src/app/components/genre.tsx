import React, { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';

const data = [
  { genre: 'Sports', sold: 0 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]

const Genre = () => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const chart = new Chart({
        container: containerRef.current,
        autoFit: true,
      });

      chart.data(data);
      chart
        .interval()
        .encode('x', 'genre')
        .encode('y', 'sold')
        .encode('color', 'genre')
        .style('minHeight', 50);

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
  }, [data]); // 依赖data，当data变化时重新渲染图表

  return <div ref={containerRef} style={{ width: '100%', height: '400px' }} />;
};

export default Genre;

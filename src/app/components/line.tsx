import React, { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';

const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

const Line = () => {
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
        .encode('x', 'year')
        .encode('y', 'value')
        .scale('x', {
          range: [0, 1],
        })
        .scale('y', {
          domainMin: 0,
          nice: true,
        });

      chart
        .line()
        .label({
          text: 'value',
          style: {
            dx: -10,
            dy: -12,
          },
        });

      chart
        .point()
        .style('fill', 'white')
        .tooltip(false);

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

export default Line;

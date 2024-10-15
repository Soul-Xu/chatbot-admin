import React, { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';

const data = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
];

interface PieProps {
  data: any
}

const Pie = (props: PieProps) => {
  const { data } = props;
  const chartRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const chart = new Chart({
        container: containerRef.current,
        autoFit: true,
      });

      chart.coordinate({ type: 'theta', outerRadius: 0.8 });

      chart
        .interval()
        .data(data)
        .transform({ type: 'stackY' })
        .encode('y', 'percent')
        .encode('color', 'item')
        .legend('color', { position: 'bottom', layout: { justifyContent: 'center' } })
        .label({
          position: 'outside',
          text: (data:any) => `${data.item}:${data.percent * 100}%`,
        })
        .tooltip((data) => ({
          name: data.item,
          value: `${data.percent * 100}%`,
        }));

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

export default Pie;

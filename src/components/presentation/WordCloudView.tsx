import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3-cloud';

interface Word {
  text: string;
  value: number;
}

const WordCloudView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const words: Word[] = [
    { text: 'amazing', value: 64 },
    { text: 'service', value: 55 },
    { text: 'quality', value: 48 },
    { text: 'product', value: 42 },
    { text: 'experience', value: 38 },
    { text: 'customer', value: 35 },
    { text: 'great', value: 32 },
    { text: 'support', value: 28 },
    { text: 'price', value: 25 },
    { text: 'recommend', value: 22 },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 500;

    // Clear previous content
    containerRef.current.innerHTML = '';

    // Create SVG
    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Generate word cloud layout
    d3.layout.cloud()
      .size([width, height])
      .words(words.map(d => ({
        text: d.text,
        size: 10 + d.value * 0.5 // Scale font size based on value
      })))
      .padding(5)
      .rotate(() => (~~(Math.random() * 2) * 90))
      .fontSize(d => d.size)
      .on('end', draw)
      .start();

    function draw(words: any[]) {
      svg.selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', d => `${d.size}px`)
        .style('font-family', 'Impact')
        .style('fill', () => `hsl(${Math.random() * 360}, 70%, 50%)`)
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text(d => d.text);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Word Frequency Analysis</h2>
      <div 
        ref={containerRef} 
        className="w-full h-[500px] bg-white"
      />
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Top Keywords</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {words.slice(0, 8).map((word) => (
            <div key={word.text} className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium">{word.text}</p>
              <p className="text-sm text-gray-500">{word.value} mentions</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordCloudView;
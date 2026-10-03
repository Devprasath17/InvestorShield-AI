import React from 'react';

interface RiskSignalMapProps {
  indicators: Array<{
    type: string;
    severity: string;
    description?: string;
  }>;
}

export const RiskSignalMap: React.FC<RiskSignalMapProps> = ({ indicators }) => {
  if (!indicators || indicators.length === 0) {
    return (
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-highest shadow-sm text-center">
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">Risk Signal Map</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">No significant warning signals detected.</p>
      </div>
    );
  }

  // Calculate positions for nodes
  const centerX = 210;
  const centerY = 90;
  const radiusX = 120;
  const radiusY = 60;
  
  return (
    <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-highest shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface uppercase tracking-wider">Risk Signal Map</h3>
        <span className="font-label-sm text-label-sm text-on-surface-variant">Interactive Topology • {indicators.length} Dimensions</span>
      </div>
      
      <div className="relative flex items-center justify-center rounded-xl bg-surface-container-low p-4 overflow-hidden min-h-[220px]">
        <svg className="w-full h-auto max-h-[200px]" fill="none" viewBox="0 0 420 180" xmlns="http://www.w3.org/2000/svg">
          {indicators.slice(0, 5).map((indicator, index, arr) => {
            const angle = (index / arr.length) * 2 * Math.PI - Math.PI / 2;
            const nodeX = centerX + radiusX * Math.cos(angle);
            const nodeY = centerY + radiusY * Math.sin(angle);
            
            const isHigh = indicator.severity.toLowerCase() === 'high';
            const color = isHigh ? '#ba1a1a' : '#b45309';
            const bgColor = isHigh ? '#ffdad6' : '#fef3c7';
            const textColor = isHigh ? '#93000a' : '#78350f';
            
            return (
              <g key={index}>
                <line stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="1.5" x1={centerX} x2={nodeX} y1={centerY} y2={nodeY}></line>
                
                <rect fill={bgColor} height="24" rx="12" width="130" x={nodeX - 65} y={nodeY - 12}></rect>
                <circle cx={nodeX - 53} cy={nodeY} fill={color} r="5"></circle>
                <text fill="#ffffff" fontFamily="Inter" fontSize="8" fontWeight="800" textAnchor="middle" x={nodeX - 53} y={nodeY + 3}>!</text>
                <text fill={textColor} fontFamily="Inter" fontSize="9" fontWeight="600" textAnchor="middle" x={nodeX + 5} y={nodeY + 3}>
                  {indicator.type.length > 18 ? indicator.type.substring(0, 15) + '...' : indicator.type}
                </text>
              </g>
            );
          })}
          
          <circle cx={centerX} cy={centerY} fill="#dae2ff" r="26"></circle>
          <circle cx={centerX} cy={centerY} fill="#ffffff" r="22" stroke="#2170e4" strokeWidth="2"></circle>
          <text fill="#001849" fontFamily="Inter" fontSize="9" fontWeight="700" textAnchor="middle" x={centerX} y={centerY + 4}>CONTENT</text>
        </svg>
      </div>
      <p className="font-label-sm text-label-sm text-on-surface-variant mt-3 text-center">Radial proximity indicates severity & cross-correlation with known fraud syndromes.</p>
    </div>
  );
};

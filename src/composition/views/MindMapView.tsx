import React, { useState, useRef, useEffect } from 'react';

interface MindMapNode {
  id: string;
  label: string;
  children?: MindMapNode[];
  color?: string;
  expanded?: boolean;
}

interface MindMapViewProps {
  rootNode: MindMapNode;
  onNodeClick?: (nodeId: string) => void;
  onNodeEdit?: (nodeId: string, newLabel: string) => void;
  onNodeAdd?: (parentId: string) => void;
  onNodeDelete?: (nodeId: string) => void;
  onNodeToggle?: (nodeId: string, expanded: boolean) => void;
  readOnly?: boolean;
  className?: string;
}

/**
 * MindMapView component for displaying hierarchical data in a mind map format
 */
export const MindMapView: React.FC<MindMapViewProps> = ({
  rootNode,
  onNodeClick,
  onNodeEdit,
  onNodeAdd,
  onNodeDelete,
  onNodeToggle,
  readOnly = false,
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const container = svgRef.current.parentElement;
        if (container) {
          setDimensions({
            width: container.clientWidth,
            height: container.clientHeight,
          });
        }
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  const renderNode = (node: MindMapNode, x: number, y: number, level = 0) => {
    const nodeWidth = 120;
    const nodeHeight = 40;
    const horizontalSpacing = 100;
    const verticalSpacing = 60;
    
    const nodeColor = node.color || '#4299e1';
    
    const childNodes = node.children && node.expanded !== false
      ? node.children.map((child, index) => {
          const childY = y + (index - (node.children?.length || 0) / 2 + 0.5) * verticalSpacing;
          const childX = x + nodeWidth + horizontalSpacing;
          
          return (
            <React.Fragment key={child.id}>
              <line
                x1={x + nodeWidth}
                y1={y}
                x2={childX}
                y2={childY}
                stroke="#CBD5E0"
                strokeWidth="2"
              />
              {renderNode(child, childX, childY, level + 1)}
            </React.Fragment>
          );
        })
      : null;
    
    return (
      <g>
        {/* Node */}
        <rect
          x={x}
          y={y - nodeHeight / 2}
          width={nodeWidth}
          height={nodeHeight}
          rx={5}
          ry={5}
          fill={nodeColor}
          stroke="#2C5282"
          strokeWidth="1"
          onClick={() => onNodeClick && onNodeClick(node.id)}
          style={{ cursor: 'pointer' }}
        />
        
        {/* Label */}
        <text
          x={x + nodeWidth / 2}
          y={y + 5}
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="500"
        >
          {node.label}
        </text>
        
        {/* Toggle expand button (if has children) */}
        {node.children && node.children.length > 0 && (
          <circle
            cx={x + nodeWidth - 10}
            cy={y - nodeHeight / 2 + 10}
            r={8}
            fill="white"
            stroke="#2C5282"
            strokeWidth="1"
            onClick={() => onNodeToggle && onNodeToggle(node.id, !node.expanded)}
            style={{ cursor: 'pointer' }}
          />
        )}
        
        {/* Expand/collapse indicator */}
        {node.children && node.children.length > 0 && (
          <text
            x={x + nodeWidth - 10}
            y={y - nodeHeight / 2 + 13}
            textAnchor="middle"
            fill="#2C5282"
            fontSize="12"
            fontWeight="bold"
            onClick={() => onNodeToggle && onNodeToggle(node.id, !node.expanded)}
            style={{ cursor: 'pointer' }}
          >
            {node.expanded !== false ? '-' : '+'}
          </text>
        )}
        
        {/* Add button */}
        {!readOnly && (
          <circle
            cx={x + nodeWidth + 15}
            cy={y}
            r={8}
            fill="#68D391"
            stroke="#2F855A"
            strokeWidth="1"
            onClick={() => onNodeAdd && onNodeAdd(node.id)}
            style={{ cursor: 'pointer' }}
          />
        )}
        
        {/* Add indicator */}
        {!readOnly && (
          <text
            x={x + nodeWidth + 15}
            y={y + 4}
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="bold"
            onClick={() => onNodeAdd && onNodeAdd(node.id)}
            style={{ cursor: 'pointer' }}
          >
            +
          </text>
        )}
        
        {/* Delete button (not for root node) */}
        {!readOnly && level > 0 && (
          <circle
            cx={x - 15}
            cy={y}
            r={8}
            fill="#FC8181"
            stroke="#C53030"
            strokeWidth="1"
            onClick={() => onNodeDelete && onNodeDelete(node.id)}
            style={{ cursor: 'pointer' }}
          />
        )}
        
        {/* Delete indicator */}
        {!readOnly && level > 0 && (
          <text
            x={x - 15}
            y={y + 4}
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="bold"
            onClick={() => onNodeDelete && onNodeDelete(node.id)}
            style={{ cursor: 'pointer' }}
          >
            ×
          </text>
        )}
        
        {childNodes}
      </g>
    );
  };
  
  return (
    <div className={`relative bg-white overflow-auto ${className}`} style={{ minHeight: '600px' }}>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <g transform={`translate(${dimensions.width / 4}, ${dimensions.height / 2})`}>
          {renderNode(rootNode, 0, 0)}
        </g>
      </svg>
    </div>
  );
}; 
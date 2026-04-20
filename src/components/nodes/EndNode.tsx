import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { WorkflowNodeData } from '../../types/workflow';

type EndCanvasNode = Node<WorkflowNodeData, 'end'>;

export const EndNode = ({ data, selected }: NodeProps<EndCanvasNode>) => {
  return (
    <div className={`node-card node-end ${selected ? 'node-selected' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-title">{data.title || 'End'}</div>
      <div className="node-subtitle">{data.endMessage || 'Workflow Complete'}</div>
    </div>
  );
};

import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { WorkflowNodeData, WorkflowNodeType } from '../../types/workflow';

type CanvasNode = Node<WorkflowNodeData, WorkflowNodeType>;

type BaseNodeProps = NodeProps<CanvasNode> & {
  colorClass: string;
  subtitle?: string;
};

export const BaseNode = ({ data, selected, colorClass, subtitle }: BaseNodeProps) => {
  const customFields = data.customFields?.filter((item) => item.key && item.value).length ?? 0;
  const metadata = data.metadata?.filter((item) => item.key && item.value).length ?? 0;
  const totalMeta = customFields + metadata;

  return (
    <div className={`node-card ${colorClass} ${selected ? 'node-selected' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <div className="node-title">{data.title || 'Untitled'}</div>
        {totalMeta > 0 && <div className="node-badge">{totalMeta}</div>}
      </div>
      {subtitle ? <div className="node-subtitle">{subtitle}</div> : null}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const getNodeSubtitle = (type: WorkflowNodeType, data: WorkflowNodeData): string => {
  if (type === 'task') return data.assignee ? `Assignee: ${data.assignee}` : 'Human Task';
  if (type === 'approval') return data.approverRole ? `Role: ${data.approverRole}` : 'Approval Step';
  if (type === 'automated') return data.actionId ? `Action: ${data.actionId}` : 'System Action';
  if (type === 'end') return data.summaryFlag ? 'Summary Enabled' : 'Workflow End';
  return 'Workflow Start';
};

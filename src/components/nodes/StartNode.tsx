import { Node, NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { WorkflowNodeData } from '../../types/workflow';

type StartCanvasNode = Node<WorkflowNodeData, 'start'>;

export const StartNode = (props: NodeProps<StartCanvasNode>) => {
  return <BaseNode {...props} colorClass="node-start" subtitle="Workflow Entry" />;
};

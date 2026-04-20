import { Node, NodeProps } from '@xyflow/react';
import { BaseNode, getNodeSubtitle } from './BaseNode';
import { WorkflowNodeData } from '../../types/workflow';

type ApprovalCanvasNode = Node<WorkflowNodeData, 'approval'>;

export const ApprovalNode = (props: NodeProps<ApprovalCanvasNode>) => {
  return <BaseNode {...props} colorClass="node-approval" subtitle={getNodeSubtitle('approval', props.data)} />;
};

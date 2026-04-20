import { Node, NodeProps } from '@xyflow/react';
import { BaseNode, getNodeSubtitle } from './BaseNode';
import { WorkflowNodeData } from '../../types/workflow';

type AutomatedCanvasNode = Node<WorkflowNodeData, 'automated'>;

export const AutomatedNode = (props: NodeProps<AutomatedCanvasNode>) => {
  return <BaseNode {...props} colorClass="node-automated" subtitle={getNodeSubtitle('automated', props.data)} />;
};

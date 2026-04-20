import { Node, NodeProps } from '@xyflow/react';
import { BaseNode, getNodeSubtitle } from './BaseNode';
import { WorkflowNodeData } from '../../types/workflow';

type TaskCanvasNode = Node<WorkflowNodeData, 'task'>;

export const TaskNode = (props: NodeProps<TaskCanvasNode>) => {
  return <BaseNode {...props} colorClass="node-task" subtitle={getNodeSubtitle('task', props.data)} />;
};

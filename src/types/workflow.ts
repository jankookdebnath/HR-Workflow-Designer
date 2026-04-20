import { Edge, Node } from '@xyflow/react';

export type WorkflowNodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export type KeyValue = {
  key: string;
  value: string;
};

export type AutomationAction = {
  id: string;
  label: string;
  params: string[];
};

export type WorkflowNodeData = {
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  approverRole?: string;
  autoApproveThreshold?: number;
  actionId?: string;
  actionParams?: Record<string, string>;
  metadata?: KeyValue[];
  customFields?: KeyValue[];
  endMessage?: string;
  summaryFlag?: boolean;
};

export type WorkflowNode = Node<WorkflowNodeData, WorkflowNodeType>;
export type WorkflowEdge = Edge;

export type WorkflowGraph = {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
};

export type SimulationResult = {
  isValid: boolean;
  issues: string[];
  steps: string[];
};

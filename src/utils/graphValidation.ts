import { Edge } from '@xyflow/react';
import { WorkflowNode } from '../types/workflow';

type ValidationResult = {
  isValid: boolean;
  issues: string[];
};

const hasCycle = (nodes: WorkflowNode[], edges: Edge[]): boolean => {
  const adjacency = new Map<string, string[]>();

  nodes.forEach((node) => adjacency.set(node.id, []));
  edges.forEach((edge) => {
    adjacency.get(edge.source)?.push(edge.target);
  });

  const visited = new Set<string>();
  const inPath = new Set<string>();

  const dfs = (id: string): boolean => {
    if (inPath.has(id)) return true;
    if (visited.has(id)) return false;

    visited.add(id);
    inPath.add(id);

    for (const next of adjacency.get(id) ?? []) {
      if (dfs(next)) return true;
    }

    inPath.delete(id);
    return false;
  };

  for (const node of nodes) {
    if (dfs(node.id)) return true;
  }

  return false;
};

export const validateWorkflowStructure = (nodes: WorkflowNode[], edges: Edge[]): ValidationResult => {
  const issues: string[] = [];

  const startNodes = nodes.filter((node) => node.type === 'start');
  const endNodes = nodes.filter((node) => node.type === 'end');

  if (startNodes.length !== 1) {
    issues.push('Workflow must have exactly one Start node.');
  }

  if (endNodes.length < 1) {
    issues.push('Workflow must include at least one End node.');
  }

  nodes.forEach((node) => {
    const incoming = edges.filter((edge) => edge.target === node.id).length;
    const outgoing = edges.filter((edge) => edge.source === node.id).length;

    if (node.type === 'start' && incoming > 0) {
      issues.push('Start node cannot have incoming connections.');
    }

    if (node.type !== 'end' && outgoing === 0) {
      issues.push(`Node "${node.data.title || node.id}" should have an outgoing connection.`);
    }

    if (node.type !== 'start' && incoming === 0) {
      issues.push(`Node "${node.data.title || node.id}" should have an incoming connection.`);
    }
  });

  if (hasCycle(nodes, edges)) {
    issues.push('Workflow contains a cycle. Please remove circular paths.');
  }

  return {
    isValid: issues.length === 0,
    issues
  };
};

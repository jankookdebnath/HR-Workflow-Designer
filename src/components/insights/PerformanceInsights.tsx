import { Edge, Node } from '@xyflow/react';
import { WorkflowNodeData, WorkflowNodeType } from '../../types/workflow';

type Props = {
  nodes: Node<WorkflowNodeData, WorkflowNodeType>[];
  edges: Edge[];
};

export const PerformanceInsights = ({ nodes, edges }: Props) => {
  const nodeTypes = (Object.entries(nodes.reduce((acc, node) => {
    acc[node.type] = (acc[node.type] ?? 0) + 1;
    return acc;
  }, {} as Record<WorkflowNodeType, number>)) as [WorkflowNodeType, number][]).sort(
    (a, b) => b[1] - a[1]
  );

  const avgOutgoing =
    nodes.length > 0
      ? (
        edges.reduce((sum, edge) => {
          const hasSource = nodes.some((n) => n.id === edge.source);
          return sum + (hasSource ? 1 : 0);
        }, 0) / nodes.length
      ).toFixed(2)
      : '0.00';

  const complexity = nodes.length * edges.length > 0 ? Math.ceil((nodes.length + edges.length) / 5) : 1;
  const complexityLabel =
    complexity <= 2
      ? 'Simple'
      : complexity <= 4
        ? 'Medium'
        : complexity <= 6
          ? 'Complex'
          : 'Very Complex';

  const hasApprovals = nodes.some((node) => node.type === 'approval');
  const hasAutomation = nodes.some((node) => node.type === 'automated');
  const estimatedTime = Math.ceil(nodes.length * 1.5);

  return (
    <section className="panel insights">
      <h3>Workflow Analytics</h3>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Total Nodes</div>
          <div className="metric-value">{nodes.length}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Total Connections</div>
          <div className="metric-value">{edges.length}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Avg. Outgoing</div>
          <div className="metric-value">{avgOutgoing}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Complexity</div>
          <div className="metric-value complexity-label">{complexityLabel}</div>
        </div>
      </div>

      <h4>Node Breakdown</h4>
      <div className="node-breakdown">
        {nodeTypes.length === 0 ? (
          <p>No nodes added yet.</p>
        ) : (
          nodeTypes.map(([type, count]) => (
            <div key={type} className="breakdown-row">
              <span className={`breakdown-type type-${type}`}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              <span className="breakdown-count">{count}</span>
            </div>
          ))
        )}
      </div>

      <h4>Workflow Features</h4>
      <div className="features">
        <div className={`feature-badge ${hasApprovals ? 'active' : ''}`}>
          {hasApprovals ? '✓' : '○'} Approval Steps
        </div>
        <div className={`feature-badge ${hasAutomation ? 'active' : ''}`}>
          {hasAutomation ? '✓' : '○'} Automation
        </div>
      </div>

      <h4>Estimate</h4>
      <div className="estimate-text">
        ~{estimatedTime} mins execution time based on{' '}
        <strong>{hasAutomation ? 'mixed' : hasApprovals ? 'approval-heavy' : 'task-focused'}</strong> workflow.
      </div>
    </section>
  );
};

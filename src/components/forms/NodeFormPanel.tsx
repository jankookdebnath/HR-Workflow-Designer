import { Edge } from '@xyflow/react';
import { AutomationAction, KeyValue, WorkflowNode } from '../../types/workflow';

type Props = {
  selectedNode: WorkflowNode | undefined;
  actions: AutomationAction[];
  onUpdateNode: (nodeId: string, updater: (node: WorkflowNode) => WorkflowNode) => void;
  onDeleteNode: (nodeId: string) => void;
  nodeCount: number;
  edgeCount: number;
};

const toPairs = (values?: KeyValue[]) => (values && values.length ? values : [{ key: '', value: '' }]);

const KeyValueEditor = ({
  label,
  values,
  onChange
}: {
  label: string;
  values: KeyValue[];
  onChange: (values: KeyValue[]) => void;
}) => {
  return (
    <div className="kv-editor">
      <label>{label}</label>
      {values.map((item, index) => (
        <div className="kv-row" key={`${label}-${index}`}>
          <input
            placeholder="key"
            value={item.key}
            onChange={(event) => {
              const next = [...values];
              next[index] = { ...next[index], key: event.target.value };
              onChange(next);
            }}
          />
          <input
            placeholder="value"
            value={item.value}
            onChange={(event) => {
              const next = [...values];
              next[index] = { ...next[index], value: event.target.value };
              onChange(next);
            }}
          />
          <button
            type="button"
            onClick={() => onChange(values.filter((_, currentIndex) => currentIndex !== index))}
          >
            x
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...values, { key: '', value: '' }])}>
        + Add Field
      </button>
    </div>
  );
};

const updateTitle = (
  selectedNode: WorkflowNode,
  onUpdateNode: Props['onUpdateNode'],
  value: string
) => {
  onUpdateNode(selectedNode.id, (node) => ({
    ...node,
    data: { ...node.data, title: value }
  }));
};

export const NodeFormPanel = ({
  selectedNode,
  actions,
  onUpdateNode,
  onDeleteNode,
  nodeCount,
  edgeCount
}: Props) => {
  if (!selectedNode) {
    return (
      <aside className="panel form-panel">
        <h3>Node Configuration</h3>
        <p>Select a node to configure fields.</p>
        <div className="metrics">
          <div>Nodes: {nodeCount}</div>
          <div>Edges: {edgeCount}</div>
        </div>
      </aside>
    );
  }

  const type = selectedNode.type;
  const data = selectedNode.data;

  return (
    <aside className="panel form-panel">
      <h3>{type.toUpperCase()} Node</h3>
      <label>Title</label>
      <input value={data.title || ''} onChange={(event) => updateTitle(selectedNode, onUpdateNode, event.target.value)} />

      {type === 'start' && (
        <KeyValueEditor
          label="Metadata"
          values={toPairs(data.metadata)}
          onChange={(values) => onUpdateNode(selectedNode.id, (node) => ({ ...node, data: { ...node.data, metadata: values } }))}
        />
      )}

      {type === 'task' && (
        <>
          <label>Description</label>
          <textarea
            value={data.description || ''}
            onChange={(event) =>
              onUpdateNode(selectedNode.id, (node) => ({ ...node, data: { ...node.data, description: event.target.value } }))
            }
          />
          <label>Assignee</label>
          <input
            value={data.assignee || ''}
            onChange={(event) =>
              onUpdateNode(selectedNode.id, (node) => ({ ...node, data: { ...node.data, assignee: event.target.value } }))
            }
          />
          <label>Due Date</label>
          <input
            type="date"
            value={data.dueDate || ''}
            onChange={(event) =>
              onUpdateNode(selectedNode.id, (node) => ({ ...node, data: { ...node.data, dueDate: event.target.value } }))
            }
          />
          <KeyValueEditor
            label="Custom Fields"
            values={toPairs(data.customFields)}
            onChange={(values) =>
              onUpdateNode(selectedNode.id, (node) => ({ ...node, data: { ...node.data, customFields: values } }))
            }
          />
        </>
      )}

      {type === 'approval' && (
        <>
          <label>Approver Role</label>
          <input
            value={data.approverRole || ''}
            onChange={(event) =>
              onUpdateNode(selectedNode.id, (node) => ({ ...node, data: { ...node.data, approverRole: event.target.value } }))
            }
          />
          <label>Auto Approve Threshold</label>
          <input
            type="number"
            value={data.autoApproveThreshold ?? 0}
            onChange={(event) =>
              onUpdateNode(selectedNode.id, (node) => ({
                ...node,
                data: { ...node.data, autoApproveThreshold: Number(event.target.value) }
              }))
            }
          />
        </>
      )}

      {type === 'automated' && (
        <>
          <label>Action</label>
          <select
            value={data.actionId || ''}
            onChange={(event) => {
              const selectedAction = actions.find((action) => action.id === event.target.value);
              const actionParams = (selectedAction?.params ?? []).reduce<Record<string, string>>((acc, param) => {
                acc[param] = '';
                return acc;
              }, {});

              onUpdateNode(selectedNode.id, (node) => ({
                ...node,
                data: { ...node.data, actionId: event.target.value, actionParams }
              }));
            }}
          >
            <option value="">Select action</option>
            {actions.map((action) => (
              <option key={action.id} value={action.id}>
                {action.label}
              </option>
            ))}
          </select>

          {Object.entries(data.actionParams ?? {}).map(([paramKey, paramValue]) => (
            <div key={paramKey}>
              <label>{paramKey}</label>
              <input
                value={paramValue}
                onChange={(event) =>
                  onUpdateNode(selectedNode.id, (node) => ({
                    ...node,
                    data: {
                      ...node.data,
                      actionParams: {
                        ...(node.data.actionParams ?? {}),
                        [paramKey]: event.target.value
                      }
                    }
                  }))
                }
              />
            </div>
          ))}
        </>
      )}

      {type === 'end' && (
        <>
          <label>End Message</label>
          <input
            value={data.endMessage || ''}
            onChange={(event) =>
              onUpdateNode(selectedNode.id, (node) => ({ ...node, data: { ...node.data, endMessage: event.target.value } }))
            }
          />
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={Boolean(data.summaryFlag)}
              onChange={(event) =>
                onUpdateNode(selectedNode.id, (node) => ({
                  ...node,
                  data: { ...node.data, summaryFlag: event.target.checked }
                }))
              }
            />
            Enable Summary Flag
          </label>
        </>
      )}

      <button className="danger-btn" onClick={() => onDeleteNode(selectedNode.id)}>
        Delete Selected Node
      </button>
    </aside>
  );
};

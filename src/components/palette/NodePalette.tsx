import { WorkflowNodeType } from '../../types/workflow';

const paletteItems: { type: WorkflowNodeType; label: string }[] = [
  { type: 'start', label: 'Start Node' },
  { type: 'task', label: 'Task Node' },
  { type: 'approval', label: 'Approval Node' },
  { type: 'automated', label: 'Automated Step Node' },
  { type: 'end', label: 'End Node' }
];

type Props = {
  onReset: () => void;
};

export const NodePalette = ({ onReset }: Props) => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, type: WorkflowNodeType) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="panel palette">
      <h3>Nodes</h3>
      <p>Drag into canvas</p>
      {paletteItems.map((item) => (
        <div
          key={item.type}
          className="palette-item"
          draggable
          onDragStart={(event) => onDragStart(event, item.type)}
        >
          {item.label}
        </div>
      ))}
      <button className="secondary-btn" onClick={onReset}>
        Clear Canvas
      </button>
    </aside>
  );
};

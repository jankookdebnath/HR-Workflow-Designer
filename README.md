# HR Workflow Designer (Tredence Case Study)

A focused prototype for the **Full Stack Engineering Intern** case study.
This project demonstrates a modular React + React Flow workflow builder for HR use-cases (onboarding, approvals, document workflows).

## What is implemented

### 1) Workflow Canvas (React Flow)
- Drag-and-drop node creation from a left sidebar
- Custom node types with visual color coding:
  - Start Node (Green)
  - Task Node (Blue)
  - Approval Node (Amber)
  - Automated Step Node (Purple)
  - End Node (Red)
- Connect nodes with edges
- Select node to edit configuration
- Delete nodes with panel action and delete key for canvas selections
- **Node-level metrics badges** showing field count
- **Premium UI** with gradients, shadows, hover effects, and smooth transitions
- Basic validation:
  - Exactly one Start node
  - At least one End node
  - Start cannot have incoming edges
  - Non-End nodes must have outgoing edges
  - Non-Start nodes must have incoming edges
  - Cycle detection

### 2) Node Editing / Configuration Forms
Right panel updates based on selected node type using controlled form state.

- **Start Node**
  - Title
  - Metadata key-value pairs

- **Task Node**
  - Title (required by UX intent)
  - Description
  - Assignee
  - Due date
  - Custom fields (key-value)

- **Approval Node**
  - Title
  - Approver role
  - Auto-approve threshold (number)

- **Automated Step Node**
  - Title
  - Action selector from mock API (`GET /automations` behavior)
  - Dynamic parameters generated from action definition

- **End Node**
  - End message
  - Summary flag toggle

### 3) Mock API Layer
Implemented in `src/api/mockApi.ts` as async local mocks:
- `getAutomations()` simulates `GET /automations`
- `simulate(graph)` simulates `POST /simulate`

Mock automations include:
- `send_email`
- `generate_doc`
- `create_ticket`

### 4) Workflow Test / Sandbox Panel
- Serializes complete graph (`nodes + edges`) and displays JSON
- Runs simulation against mock API
- Shows validation issues when invalid
- Shows step-by-step execution log when valid

### 5) Performance Analytics & Insights Dashboard
Real-time workflow metrics:
- **Total Nodes & Connections** count
- **Average Outgoing Connections** per node
- **Workflow Complexity** calculation (Simple → Very Complex)
- **Node Breakdown** by type with color-coded badges
- **Workflow Features** detection (Approval Steps, Automation)
- **Execution Time Estimate** based on workflow composition

### 6) Architecture Expectations (How this project is structured)

```text
src/
  api/
    mockApi.ts
  components/
    canvas/WorkflowCanvas.tsx
    forms/NodeFormPanel.tsx
    insights/PerformanceInsights.tsx
    nodes/
      StartNode.tsx
      TaskNode.tsx
      ApprovalNode.tsx
      AutomatedNode.tsx
      EndNode.tsx
      BaseNode.tsx
    palette/NodePalette.tsx
    sandbox/SandboxPanel.tsx
  types/workflow.ts
  utils/graphValidation.ts
  App.tsx
  main.tsx
  index.css
```

Design principles used:
- Separation of concerns (canvas, forms, API, validation)
- Reusable typed interfaces (`WorkflowNodeType`, `WorkflowNodeData`, `SimulationResult`)
- Extensible node form logic (easy to add new node types)
- Feature-first component decomposition
- Premium UI with gradients, shadows, transitions

## Tech stack
- React 18
- TypeScript
- Vite
- React Flow (`@xyflow/react`)

## Run locally

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run preview
```

## Key design decisions
- Used async local mock API to keep setup zero-backend while preserving integration boundaries.
- Validation is centralized in `graphValidation.ts` and reused by simulation.
- Node data shape is typed and shared across canvas + forms + simulation.
- Started with minimal but scalable architecture for a 4–6 hour time-box.

## Assumptions
- Prototype intentionally avoids authentication and persistence.
- Canvas supports manual layout; auto-layout is out of scope.
- Validation is functional and practical, not a complete BPMN-grade validator.

## What is completed vs. what can be added

### Completed
- Core canvas interactions with premium styling
- Custom node components with visual badges for field counts
- Dynamic node config forms
- Mock API integration
- Workflow simulation panel
- Basic validation and cycle detection
- Export workflow as JSON
- Import workflow from JSON
- Undo/Redo (history state with max 40 snapshots)
- **Performance analytics dashboard** with real-time metrics
- **Node complexity analysis** and workflow composition detection
- **Execution time estimation** based on workflow structure
- **Gradient-based premium UI** with smooth transitions and hover effects

### If more time is available
- Rich node-level validation badges (inline error indicators)
- Better simulation timeline UI with visual progress bar
- Persistent storage (local IndexedDB or backend)
- Unit tests (Jest/RTL) and E2E (Cypress/Playwright)
- Node templates and presets (common workflow patterns)
- Workflow versioning and comparison
- Collaborative editing with WebSocket

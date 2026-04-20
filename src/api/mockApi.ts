import { AutomationAction, SimulationResult, WorkflowGraph } from '../types/workflow';
import { validateWorkflowStructure } from '../utils/graphValidation';

const automations: AutomationAction[] = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'create_ticket', label: 'Create IT Ticket', params: ['category', 'priority'] }
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  async getAutomations(): Promise<AutomationAction[]> {
    await wait(250);
    return automations;
  },

  async simulate(graph: WorkflowGraph): Promise<SimulationResult> {
    await wait(400);
    const validation = validateWorkflowStructure(graph.nodes, graph.edges);

    if (!validation.isValid) {
      return {
        isValid: false,
        issues: validation.issues,
        steps: []
      };
    }

    const ordered = [...graph.nodes].sort((a, b) => a.position.y - b.position.y);
    const steps = ordered.map((node, index) => {
      const nodeTitle = node.data.title || node.type;
      return `Step ${index + 1}: ${node.type.toUpperCase()} - ${nodeTitle} executed successfully.`;
    });

    return {
      isValid: true,
      issues: [],
      steps
    };
  }
};

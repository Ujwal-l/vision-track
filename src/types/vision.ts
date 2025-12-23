export type VisionStatus =
  | 'not_started'
  | 'in_progress'
  | 'on_track'
  | 'at_risk'
  | 'completed';

export type Vision = {
  id: string;
  title: string;
  description: string | null;
  status: VisionStatus;
  progress: number;
  notes: string | null;
  created_at: string;
};

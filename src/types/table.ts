export type ParameterType = 'string' | 'number' | 'bool';

export interface Parameter {
  name: string;
  type: ParameterType;
  required: boolean;
}

export interface ParameterSet {
  id: string;
  name: string;
  values: Record<string, string | number | boolean>;
}

export interface CellProps {
  type: ParameterType;
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
  style?: React.CSSProperties;
}

export interface EditableHeaderProps {
  value: string;
  onChange: (value: string) => void;
  isPinned: boolean;
  onPinChange: (isPinned: boolean) => void;
  style?: React.CSSProperties;
}

export interface ResizeHandleProps {
  onResizeStart: (e: React.MouseEvent) => void;
  isResizing?: boolean;
}

export interface ColumnWidths {
  [key: string]: number;
  firstColumn?: number;
}
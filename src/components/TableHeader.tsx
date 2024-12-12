import React from 'react';
import { Plus } from 'lucide-react';

interface TableHeaderProps {
  onAddSet: () => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ onAddSet }) => {
  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={onAddSet}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        <Plus size={16} />
        ADD PARAMETER SET
      </button>
    </div>
  );
};
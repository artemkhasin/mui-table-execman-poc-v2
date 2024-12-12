import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { Plus } from 'lucide-react';
import { EditableCell } from './EditableCell';
import { EditableHeader } from './EditableHeader';
import { ResizeHandle } from './ResizeHandle';
import { Parameter, ParameterSet } from '../types/table';
import { initialParameterSets } from '../data/initialData';
import { useColumnResize } from '../hooks/useColumnResize';
import { calculateLeftPosition } from '../utils/tableUtils';
import {
  StyledTableCell,
  StyledHeaderCell,
  AddButton,
  TableWrapper
} from '../styles/TableStyles';

const defaultParameters: Parameter[] = [
  { name: 'Quantity_to_produce', type: 'number', required: true },
  { name: 'Ref_UOM', type: 'string', required: false },
  { name: 'Barrels', type: 'number', required: true },
  { name: 'Charge', type: 'string', required: true },
  { name: 'Line', type: 'string', required: true },
  { name: 'Operator', type: 'string', required: false },
  { name: 'Whatever', type: 'string', required: false },
];

const FIRST_COL_WIDTH = 200;

export const ParameterTable: React.FC = () => {
  const [parameterSets, setParameterSets] = useState<ParameterSet[]>(initialParameterSets);
  const [pinnedSets, setPinnedSets] = useState<Set<string>>(new Set());
  
  const { columnWidths, resizingColumn, handleResizeStart } = useColumnResize({
    firstColumn: FIRST_COL_WIDTH
  });

  const addParameterSet = () => {
    const newId = (parameterSets.length + 1).toString();
    setParameterSets([
      ...parameterSets,
      {
        id: newId,
        name: `Set ${newId}`,
        values: defaultParameters.reduce((acc, param) => ({
          ...acc,
          [param.name]: 'No'
        }), {})
      },
    ]);
  };

  const updateValue = (parameterId: string, paramName: string, value: string | number | boolean) => {
    setParameterSets(
      parameterSets.map((set) =>
        set.id === parameterId
          ? { ...set, values: { ...set.values, [paramName]: value } }
          : set
      )
    );
  };

  const updateSetName = (parameterId: string, newName: string) => {
    setParameterSets(
      parameterSets.map((set) =>
        set.id === parameterId
          ? { ...set, name: newName }
          : set
      )
    );
  };

  const handlePinChange = (parameterId: string, isPinned: boolean) => {
    const newPinnedSets = new Set(pinnedSets);
    if (isPinned) {
      newPinnedSets.add(parameterId);
    } else {
      newPinnedSets.delete(parameterId);
    }
    setPinnedSets(newPinnedSets);
  };

  const pinnedSetsList = useMemo(() => Array.from(pinnedSets), [pinnedSets]);
  
  const getLeftPosition = (index: number) => {
    return `${calculateLeftPosition(index, pinnedSetsList, columnWidths, FIRST_COL_WIDTH)}px`;
  };

  const getPinnedSets = () => parameterSets.filter(set => pinnedSets.has(set.id));
  const getUnpinnedSets = () => parameterSets.filter(set => !pinnedSets.has(set.id));

  return (
    <div style={{ padding: '24px' }}>
      <AddButton
        variant="contained"
        startIcon={<Plus size={16} />}
        onClick={addParameterSet}
      >
        ADD PARAMETER SET
      </AddButton>
      <TableWrapper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledHeaderCell 
                  $width={columnWidths.firstColumn || FIRST_COL_WIDTH}
                  style={{ 
                    position: 'sticky', 
                    left: 0
                  }}
                >
                  Argument
                  <ResizeHandle 
                    onResizeStart={(e) => handleResizeStart('firstColumn', columnWidths.firstColumn || FIRST_COL_WIDTH, e)} 
                  />
                </StyledHeaderCell>
                {getPinnedSets().map((set, index) => (
                  <StyledHeaderCell
                    key={set.id}
                    $width={columnWidths[set.id] || 150}
                    style={{
                      position: 'sticky',
                      left: getLeftPosition(index)
                    }}
                  >
                    <EditableHeader
                      value={set.name}
                      onChange={(newName) => updateSetName(set.id, newName)}
                      isPinned={true}
                      onPinChange={(isPinned) => handlePinChange(set.id, isPinned)}
                    />
                    <ResizeHandle 
                      onResizeStart={(e) => handleResizeStart(set.id, columnWidths[set.id] || 150, e)}
                      isResizing={resizingColumn === set.id}
                    />
                  </StyledHeaderCell>
                ))}
                {getUnpinnedSets().map((set) => (
                  <StyledHeaderCell 
                    key={set.id}
                    $width={columnWidths[set.id] || 150}
                  >
                    <EditableHeader
                      value={set.name}
                      onChange={(newName) => updateSetName(set.id, newName)}
                      isPinned={false}
                      onPinChange={(isPinned) => handlePinChange(set.id, isPinned)}
                    />
                    <ResizeHandle 
                      onResizeStart={(e) => handleResizeStart(set.id, columnWidths[set.id] || 150, e)}
                      isResizing={resizingColumn === set.id}
                    />
                  </StyledHeaderCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {defaultParameters.map((param) => (
                <TableRow key={param.name}>
                  <StyledHeaderCell
                    $width={columnWidths.firstColumn || FIRST_COL_WIDTH}
                    style={{
                      position: 'sticky',
                      left: 0
                    }}
                  >
                    {param.name} {param.required && '*'}
                  </StyledHeaderCell>
                  {getPinnedSets().map((set, index) => (
                    <StyledTableCell
                      key={`${set.id}-${param.name}`}
                      $width={columnWidths[set.id] || 150}
                      style={{
                        position: 'sticky',
                        left: getLeftPosition(index)
                      }}
                    >
                      <EditableCell
                        type={param.type}
                        value={set.values[param.name] ?? 'No'}
                        onChange={(value) => updateValue(set.id, param.name, value)}
                      />
                    </StyledTableCell>
                  ))}
                  {getUnpinnedSets().map((set) => (
                    <StyledTableCell 
                      key={`${set.id}-${param.name}`}
                      $width={columnWidths[set.id] || 150}
                    >
                      <EditableCell
                        type={param.type}
                        value={set.values[param.name] ?? 'No'}
                        onChange={(value) => updateValue(set.id, param.name, value)}
                      />
                    </StyledTableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>
    </div>
  );
};
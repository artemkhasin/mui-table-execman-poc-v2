import { ParameterSet } from '../types/table';

export const initialParameterSets: ParameterSet[] = [
  {
    id: '1',
    name: 'Set 1',
    values: {
      Quantity_to_produce: 5,
      Ref_UOM: 'kg',
      Barrels: 1,
      Charge: 'Number',
      Line: 'Number',
      Operator: 'Number',
      Whatever: 'Number'
    }
  },
  {
    id: '2',
    name: 'Set 2',
    values: {
      Quantity_to_produce: 2,
      Ref_UOM: 'kg',
      Barrels: 0,
      Charge: 3,
      Line: 3,
      Operator: 3,
      Whatever: 3
    }
  },
  {
    id: '3',
    name: 'Set 3',
    values: {
      Quantity_to_produce: 1,
      Ref_UOM: 'g',
      Barrels: 4,
      Charge: '-',
      Line: '-',
      Operator: '-',
      Whatever: '-'
    }
  },
  {
    id: '4',
    name: 'Set 4',
    values: {
      Quantity_to_produce: 4,
      Ref_UOM: '-',
      Barrels: 6,
      Charge: 'No',
      Line: 'No',
      Operator: 'No',
      Whatever: 'No'
    }
  },
  {
    id: '5',
    name: 'Set 5',
    values: {
      Quantity_to_produce: 9,
      Ref_UOM: '-',
      Barrels: 3,
      Charge: 'No',
      Line: 'No',
      Operator: 'No',
      Whatever: 'No'
    }
  },
  {
    id: '6',
    name: 'Set 6',
    values: {
      Quantity_to_produce: 20,
      Ref_UOM: 'g',
      Barrels: 2,
      Charge: 'No',
      Line: 'No',
      Operator: 'No',
      Whatever: 'No'
    }
  },
  {
    id: '7',
    name: 'Set 7',
    values: {
      Quantity_to_produce: 101,
      Ref_UOM: 'kg',
      Barrels: 2,
      Charge: 'No',
      Line: 'No',
      Operator: 'No',
      Whatever: 'No'
    }
  }
];
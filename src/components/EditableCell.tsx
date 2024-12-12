import React, { useState, useRef, useEffect } from 'react';
import { CellProps } from '../types/table';
import { Input, CellContent, ErrorTooltip } from '../styles/CellStyles';

const getErrorMessage = (type: string): string => {
  switch (type) {
    case 'number':
      return 'Please enter a valid number';
    case 'bool':
      return 'Please enter true or false';
    case 'string':
      return 'Please enter a valid string';
    default:
      return 'Invalid input';
  }
};

const validateValue = (value: string, type: string): boolean => {
  if (value.trim() === '' || value === 'No') return true;
  
  switch (type) {
    case 'number':
      return !isNaN(Number(value)) && 
             Number.isFinite(Number(value)) && 
             /^-?\d*\.?\d*$/.test(value);
    case 'bool':
      return ['true', 'false'].includes(value.toLowerCase());
    case 'string':
      return typeof value === 'string';
    default:
      return false;
  }
};

export const EditableCell: React.FC<CellProps> = ({ type, value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    const isValid = validateValue(newValue, type);
    setError(!isValid);
    setShowError(!isValid);
  };

  const handleBlur = () => {
    if (!error) {
      if (inputValue.trim() === '') {
        onChange('No');
      } else {
        switch (type) {
          case 'number':
            onChange(Number(inputValue));
            break;
          case 'bool':
            onChange(inputValue.toLowerCase() === 'true');
            break;
          default:
            onChange(inputValue);
        }
      }
      setIsEditing(false);
      setShowError(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !error) {
      handleBlur();
    }
    if (e.key === 'Escape') {
      setInputValue(value.toString());
      setIsEditing(false);
      setError(false);
      setShowError(false);
    }
  };

  return (
    <>
      {isEditing ? (
        <>
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            $hasError={error}
          />
          {showError && (
            <ErrorTooltip>
              {getErrorMessage(type)}
            </ErrorTooltip>
          )}
        </>
      ) : (
        <CellContent onClick={() => setIsEditing(true)}>
          {value.toString()}
        </CellContent>
      )}
    </>
  );
};
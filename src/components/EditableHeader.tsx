import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../styles/CellStyles';
import { Edit2, Pin, PinOff } from 'lucide-react';
import styled from 'styled-components';
import { EditableHeaderProps } from '../types/table';

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 8px;
  
  &:hover .header-icon {
    opacity: 1;
  }
`;

const HeaderText = styled.div`
  flex: 1;
  margin-right: 8px;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const HeaderIcon = styled.div`
  opacity: 0;
  transition: opacity 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #1976d2;
  }
`;

const PinIcon = styled(HeaderIcon)<{ $isPinned: boolean }>`
  opacity: ${props => props.$isPinned ? 1 : 0};
  color: ${props => props.$isPinned ? '#1976d2' : 'inherit'};
`;

export const EditableHeader: React.FC<EditableHeaderProps> = ({ 
  value, 
  onChange,
  isPinned,
  onPinChange
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      onChange(inputValue);
    } else {
      setInputValue(value);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
    if (e.key === 'Escape') {
      setInputValue(value);
      setIsEditing(false);
    }
  };

  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPinChange(!isPinned);
  };

  return (
    <>
      {isEditing ? (
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <HeaderContent onClick={() => setIsEditing(true)}>
          <HeaderText>{value}</HeaderText>
          <IconsContainer>
            <PinIcon 
              className="header-icon" 
              $isPinned={isPinned}
              onClick={handlePinClick}
            >
              {isPinned ? <PinOff size={14} /> : <Pin size={14} />}
            </PinIcon>
            <HeaderIcon className="header-icon">
              <Edit2 size={14} />
            </HeaderIcon>
          </IconsContainer>
        </HeaderContent>
      )}
    </>
  );
};
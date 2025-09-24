'use client';

import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface EnumSelectProps<T extends string | number> {
  enumObj: { [key: string]: T };
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  labelMap?: Record<T, string>;  
}

function EnumSelect<T extends string | number>({
  enumObj,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  labelMap
}: EnumSelectProps<T>) {
  
  // Obtener las opciones del enum
  const enumOptions = Object.values(enumObj).filter(
    (value) => typeof value === 'string' || typeof value === 'number'
  ) as T[];

  const getLabel = (enumValue: T): string => {
    if (labelMap && labelMap[enumValue]) {
      return labelMap[enumValue];
    }
    
    // Convertir el valor del enum a un label legible
    if (typeof enumValue === 'string') {
      return enumValue.charAt(0).toUpperCase() + enumValue.slice(1).toLowerCase();
    }
    
    return enumValue.toString();
  };

  const handleChange = (value: T) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      style={{ width: '100%' }}
    >
      {enumOptions.map((option) => (
        <Option key={option.toString()} value={option}>
          {getLabel(option)}
        </Option>
      ))}
    </Select>
  );
}

export default EnumSelect;
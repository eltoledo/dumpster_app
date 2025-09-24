'use client';

import React from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';

// Configurar dayjs en español
dayjs.locale('es');

interface FDatePickerProps {
  value?: Dayjs;
  onChange?: (date: Dayjs | null) => void;
  placeholder?: string;
  disabled?: boolean;
  showTime?: boolean;
  format?: string;
  minDaysFromToday?: number; // Mínimo días a partir de hoy
}

const FDatePicker: React.FC<FDatePickerProps> = ({
  value,
  onChange,
  placeholder = "Date Select",
  disabled = false,
  showTime= true,
  format = "DD/MM/YYYY",
  minDaysFromToday = 0
}) => {
  
  // Deshabilitar fechas pasadas (incluyendo hoy si minDaysFromToday es 0)
  const disabledDate = (current: Dayjs | null): boolean => {
    if (!current) return false;
    
    const today = dayjs().startOf('day');
    const minDate = today.add(minDaysFromToday, 'day');
    
    // Deshabilitar fechas anteriores a la fecha mínima
    return current.isBefore(minDate);
  };

  const handleChange = (date: Dayjs | null) => {
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <DatePicker
        value={value}
        onChange={handleChange}
        disabledDate={disabledDate}
        placeholder={placeholder}
        disabled={disabled}
        format={format}
        showTime={showTime}
        style={{ width: '100%' }}
        size="middle"
      />
    </ConfigProvider>
  );
};

export default FDatePicker;
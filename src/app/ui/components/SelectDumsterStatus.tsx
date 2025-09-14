import React, { useEffect } from 'react';
import { Select } from 'antd'; 
import { useSelectDumsterStatus } from '@/app/hooks/useSelectDumsterStatus';

const SelectDumsterStatus = ({ onValueChange }) => {
  const {
    dumstersStatus, 
    loading,
    fetchDumsterStatus, 
  } = useSelectDumsterStatus();

  useEffect(() => {
      fetchDumsterStatus();
    }, []);
    
     const handleChange = (value) => {
    console.log('Valor seleccionado en CustomSelect:', value);
    if (onValueChange) {
      onValueChange(value); // Pasamos el valor al padre
    }
  };
  return (
    <Select
      style={{ width: 200 }}
      placeholder="Selecciona una opción"
      loading={loading}
      options={dumstersStatus.map(option => ({
        value: option,
        label: option.status
      }))}
      filterOption={false} // Pasando método del hook
      onChange={handleChange}      
      showSearch
      allowClear
    />
  );
};

export default SelectDumsterStatus;
import { Select } from 'antd'; 
import { useSelectDumsterStatus } from '@/app/hooks/useSelectDumsterStatus';

const SelectDumsterStatus = ({ onValueChange }) => {
  const {
     dumstersStatus,  
    dumstersStatusMap,    
    loading,
    fetchDumsterStatus,
    getObjectById
  } = useSelectDumsterStatus();

  
    const finalOptions = dumstersStatus.length > 0 ? dumstersStatus :  [];
     
     const handleChange = (value) => {  
       
      if (onValueChange) {       
      onValueChange(getObjectById(value));
        }
      };


  return (
    <Select
      style={{ width: 200 }}
       placeholder="Selec Dumster State"
      loading={loading}
      options={finalOptions.map(option => ({
        value: option.id.toString(),
        label: option.name
      }))}
      filterOption={false} // Pasando método del hook
      onChange={handleChange}      
      showSearch
      allowClear
    />
  );
};

export default SelectDumsterStatus;
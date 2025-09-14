import { useState, useEffect } from 'react';
import { DumpsterStatus } from '../types/Dumpster';

export const useSelectDumsterStatus = () => {
  const [dumstersStatus, setDumstersStatus] = useState<DumpsterStatus[]>([]);   
  const [loading, setLoading] = useState(false);

 
  const fetchDumsterStatus = async () => {
    setLoading(true);
    try {
     
      const response = await fetch('/api/dumpsterstatus');
      const data = await response.json();
      setDumstersStatus(data);
    } catch (error) {
      console.error('Error fetching dumster status:', error);
    } finally {
      setLoading(false);
    }
  };
 
 

  return {
    dumstersStatus,    
    loading,
    fetchDumsterStatus
  };
};
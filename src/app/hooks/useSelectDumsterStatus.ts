import { useState, useEffect } from 'react';
import { DumpsterStatus } from '../types/Dumpster';
import { api } from '../lib/api';
import axios from 'axios';

export const useSelectDumsterStatus = () => {
  const [dumstersStatus, setDumstersStatus] = useState([]);  
  const [dumstersStatusMap, setDumstersStatusMap] = useState(new Map());    
  const [loading, setLoading] = useState(false);


 
  const fetchDumsterStatus = async () => {
    setLoading(true);
    try {
       const response = await api.get('/dumpsterstatus');       
      setDumstersStatus(response.data);


       const newMap = new Map();
      response.data.forEach((item:DumpsterStatus) => {
        newMap.set(item.id.toString(), item);
      });    
      
      setDumstersStatusMap(newMap);
 
    } catch (error) {
       if (axios.isAxiosError(error)) 
      console.error(error.response?.data||error.message||'Error fetching dumster status:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const getObjectById = (id:number) => {    
    return dumstersStatusMap.get(id.toString());
  };

    useEffect(() => {
    fetchDumsterStatus();
  }, []);

  return {
    dumstersStatus,  
    dumstersStatusMap,    
    loading,
    fetchDumsterStatus,
    getObjectById
  };
};
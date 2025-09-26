 import axios from "axios";
import { api } from "../lib/api";
import { Transfer } from "../types/Driver";

export function useTransfer()  { 
    
  // CREATE
  const createTransfer = async (transferData:Transfer) => {
    try {
      const response : Transfer = (await api.post('/transfer', transferData)).data;
      return response;
    } catch (error) {
       if (axios.isAxiosError(error)) 
      throw new Error(error.response?.data||error.message||'Error create Transfer.');
    }
  };

   // READ
  const getTransfers = async (id:string,page = 1, limit = 10,searchTerm = '',searchField= '') => {
    try {
       const response = await api.get(`/transfer/bydriver/${id}`);
      let  allTransfers:Transfer[] = response.data;
      // Aplicar filtro de búsqueda si hay término
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        allTransfers = allTransfers.filter(transfer =>
          ((searchField=="all"||searchField=="driverName") && transfer.driverName.toLowerCase().includes(term)) ||
          ((searchField=="all"||searchField=="transferDate") && transfer.transferDate.toString().includes(term)) ||
           ((searchField=="all"||searchField=="transferType") && transfer.transferType.toString().includes(term)) ||
            ((searchField=="all"||searchField=="paymentStatus") && transfer.paymentStatus.toString().includes(term)) ||
          ((searchField=="all"||searchField=="description") && transfer.description.toLowerCase().includes(term)) 
        );
      }
      // Paginación manual
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedTansfer = allTransfers.slice(startIndex, endIndex);
      
      return {
        data: paginatedTansfer,
        total: allTransfers.length,
        page,
        limit,
        totalPages: Math.ceil(allTransfers.length / limit)
      };
    } catch (error) {
       if (axios.isAxiosError(error)) 
      throw new Error(error.response?.data||error.message||'Error getting dumpsters status.');
    }
  };

  

  // UPDATE
  const updateTransfer = async (id:number, TransferData:Transfer) => {
    try {
      const response = await api.put(`/Transfer/${id}`, TransferData);
      return response.data;
    } catch (error) {
       if (axios.isAxiosError(error)) 
      throw new Error(error.response?.data||error.message||'Error update dumpster status.');
    }
  };

  // DELETE
  const deleteTransfer = async (id:number) => {
    try {
      const response = await api.delete(`/Transfer/${id}`);
      return response.data;
    } catch (error) {
       if (axios.isAxiosError(error)) 
      throw new Error(error.response?.data||error.message||'Error delete dumpster status');
    }
  };

  return {createTransfer, getTransfers, updateTransfer,deleteTransfer};
};
 import { api } from "../lib/api";
import { DumpsterStatus } from "../types/Dumpster";

export function useDumpsterStatus()  { 
    
  // CREATE
  const createDumpsterStatus = async (DumpsterStatusData:DumpsterStatus) => {
    try {
      const response : DumpsterStatus = (await api.post('/dumpsterstatus', DumpsterStatusData)).data;
      return response;
    } catch (error) {
      throw new Error('Error create dumpster status.');
    }
  };

  // READ
  const getDumpstersStatus = async (page = 1, limit = 10,searchTerm = '',searchField= '') => {
    try {
      const response = await api.get('/dumpstersstatus');
      let  allDumpstersStatus:DumpsterStatus[] = response.data;
      // Aplicar filtro de búsqueda si hay término
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        allDumpstersStatus = allDumpstersStatus.filter(dumpsterstatus =>
          ((searchField=="all"||searchField=="status") && dumpsterstatus.status.toLowerCase().includes(term)) ||
          ((searchField=="all"||searchField=="description") && dumpsterstatus.description.toLowerCase().includes(term)) 
        );
      }
      // Paginación manual
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedDumpstersStatus = allDumpstersStatus.slice(startIndex, endIndex);
      
      return {
        data: paginatedDumpstersStatus,
        total: allDumpstersStatus.length,
        page,
        limit,
        totalPages: Math.ceil(allDumpstersStatus.length / limit)
      };
    } catch (error) {
      throw new Error('Error getting dumpsters status.');
    }
  };

 const getDumpsterStatusById = async (id:number) => {
    try {
      const response = await api.get(`/dumpsterstatus/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error getting dumpster status.');
    }
  };

  // UPDATE
  const updateDumpsterStatus = async (id:number, dumpsterStatusData:DumpsterStatus) => {
    try {
      const response = await api.put(`/dumpsterstatus/${id}`, dumpsterStatusData);
      return response.data;
    } catch (error) {
      throw new Error('Error update dumpster status.');
    }
  };

  // DELETE
  const deleteDumpsterStatus = async (id:number) => {
    try {
      const response = await api.delete(`/dumpsterstatus/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error delete dumpster status');
    }
  };

  return {createDumpsterStatus, getDumpstersStatus, getDumpsterStatusById, updateDumpsterStatus,deleteDumpsterStatus};
};
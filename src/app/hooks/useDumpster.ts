 import { api } from "../lib/api";
import { Dumpster, DumpsterStatus } from "../types/Dumpster";

export function useDumpster()  { 
    
  // CREATE
  const createDumpster = async (dumpsterData:Dumpster) => {
    try {
      const response : Dumpster = (await api.post('/dumpsters', dumpsterData)).data;
      return response;
    } catch (error) {
      throw new Error('Error create dumpster');
    }
  };

  // READ
  const getDumpsters = async (page = 1, limit = 10,searchTerm = '',searchField= '') => {
    try {
      const response = await api.get('/dumpsters');
      let  allDumpsters:Dumpster[] = response.data;
      // Aplicar filtro de búsqueda si hay término
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        allDumpsters = allDumpsters.filter(dumpster =>
          ((searchField=="all"||searchField=="name") && dumpster.name.toLowerCase().includes(term)) ||
          ((searchField=="all"||searchField=="size") && dumpster.size.toString().toLowerCase().includes(term)) ||
          ((searchField=="all"||searchField=="description") && dumpster.description.toLowerCase().includes(term)) ||
           ((searchField=="all"||searchField=="DumpsterStatus") && searchDumpsterStatus) 
        );
      }
      // Paginación manual
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedDumpsters = allDumpsters.slice(startIndex, endIndex);
      
      return {
        data: paginatedDumpsters,
        total: allDumpsters.length,
        page,
        limit,
        totalPages: Math.ceil(allDumpsters.length / limit)
      };
    } catch (error) {
      throw new Error('Error getting dumpster');
    }
  };

   const searchDumpsterStatus = (dumpsterStatus:DumpsterStatus[], searchTerm = '') => {
    return dumpsterStatus.some(item => 
            item.status.toLowerCase() === searchTerm.toLowerCase()
        );
  };

 const getDumpstersById = async (id:number) => {
    try {
      const response = await api.get(`/dumpsters/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error getting dumpster');
    }
  };

  // UPDATE
  const updateDumpster = async (id:number, dumpsterData:Dumpster) => {
    try {
      const response = await api.put(`/dumpsters/${id}`, dumpsterData);
      return response.data;
    } catch (error) {
      throw new Error('Error update dumpster');
    }
  };

  // DELETE
  const deleteDumpster = async (id:number) => {
    try {
      const response = await api.delete(`/dumpsters/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error delete dumpster');
    }
  };

  return {createDumpster, getDumpsters, getDumpstersById, updateDumpster,deleteDumpster};
};
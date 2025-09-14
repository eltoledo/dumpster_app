export interface Dumpster {
  id: number;
  name: string;
  size: number;
  description: string;
  dumpsterStatus:DumpsterStatus;
}

export interface DumpsterStatus {
  id: number;
  status: string; 
  colorStatus:string
  description: string;
}
export interface Driver {
  id: number;
  firstName: string; 
  lastName:string;
  licenseNumber:string; 
  licenseType:string; 
  phone:string; 
  email:string; 
  isActive:boolean;  
  Transfers: Transfer[];
}
 
export interface Transfer {
  id: number;
  contractId: number;
  contractString: string; 
  driverId: number;
  driverName: string;
  paymentPercentage: number;
  transferDate:Date;
  transferType:string; 
  paymentStatus:string; 
  description:string;   
}
 
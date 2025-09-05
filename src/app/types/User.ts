export interface User {
  id: number;
  username: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
  token: string;
}
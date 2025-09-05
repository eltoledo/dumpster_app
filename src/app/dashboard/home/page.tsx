 import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function HomePage( ) {  

  return (
    <div>
       <p>esto es HomePage</p>
    </div>
  );
}

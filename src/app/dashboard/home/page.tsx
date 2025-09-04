 import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function HomePage( ) {  

  return (
    <main>
       <p>esto es HomePage</p>
    </main>
  );
}

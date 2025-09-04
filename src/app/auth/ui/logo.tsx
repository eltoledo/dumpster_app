import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from './fonts';


export default function DumpsterLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-16 w-16 rotate-[15deg]" />
      <p className="text-[38px] ">Dumpsters</p>
    </div>
  );
}

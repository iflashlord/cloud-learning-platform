import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/aws-cloud-practitioner.svg" 
            alt="AWS Cloud Practitioner" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          Cloud Practitioner
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/aws-solutions-architect.svg" 
            alt="Solutions Architect" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          Solutions Architect
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/aws-developer.svg" 
            alt="Developer Associate" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          Developer
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/aws-sysops.svg" 
            alt="SysOps Administrator" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          SysOps Admin
        </Button>
      </div>
    </footer>
  );
};

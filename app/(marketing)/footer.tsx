import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/mascot.svg" 
            alt="Cloud Fundamentals" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          Cloud Fundamentals
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/mascot.svg" 
            alt="System Architecture" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          System Architecture
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/mascot.svg" 
            alt="Software Development" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          Development
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/mascot.svg" 
            alt="DevOps & Operations" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          DevOps & Ops
        </Button>
      </div>
    </footer>
  );
};

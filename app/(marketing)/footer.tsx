import { Button } from "@/components/ui/button";
import { CloudSnow, Building, Code, Wrench } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <CloudSnow className="h-8 w-10 mr-4 text-primary" />
          Cloud Fundamentals
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Building className="h-8 w-10 mr-4 text-primary" />
          System Architecture
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Code className="h-8 w-10 mr-4 text-primary" />
          Development
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Wrench className="h-8 w-10 mr-4 text-primary" />
          DevOps & Ops
        </Button>
      </div>
    </footer>
  );
};

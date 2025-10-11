import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BRAND_CONFIG } from "@/lib/config";

export const Promo = () => {
  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image
            src="/unlimited.svg"
            alt="Pro"
            height={26}
            width={26}
          />
          <h3 className="font-bold text-lg">
            Upgrade to {BRAND_CONFIG.PLATFORM_NAME} Pro
          </h3>
        </div>
        <p className="text-muted-foreground">
          Get unlimited hearts and unlock all AWS certification paths!
        </p>
      </div>
      <Button
        asChild
        variant="super"
        className="w-full"
        size="lg"
      >
        <Link href="/shop">
          Upgrade today
        </Link>
      </Button>
    </Card>
  );
};

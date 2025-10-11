"use client";

import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { BRAND_CONFIG } from "@/lib/config";

export const QuestPageHeader = () => {
  return (
    <PageHeader
      variant="gradient"
      title={`${BRAND_CONFIG.PLATFORM_NAME} Quest Arena`}
      description="Embark on epic learning adventures! Complete quests to earn exclusive rewards, unlock achievements, and become a technology champion."
      badge={<Badge variant="warning">Adventure Mode</Badge>}
    />
  );
};
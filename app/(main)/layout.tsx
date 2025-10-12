import EnhancedGridLayout from "@/components/enhanced-grid-layout";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({
  children,
}: Props) => {
  return (
    <EnhancedGridLayout>
      {children}
    </EnhancedGridLayout>
  );
};
 
export default MainLayout;

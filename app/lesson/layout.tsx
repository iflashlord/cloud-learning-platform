type Props = {
  children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
  return ( 
    <div className="flex flex-col h-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex flex-col h-full w-full">
        {children}
      </div>
    </div>
  );
};
 
export default LessonLayout;

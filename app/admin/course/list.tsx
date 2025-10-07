import { 
  Datagrid, 
  List, 
  TextField,
  FunctionField,
  ImageField,
  TopToolbar,
  CreateButton,
  ExportButton,
  ShowButton,
  EditButton,
} from "react-admin";
import { Avatar, Chip } from "@mui/material";

const ListActions = () => (
  <TopToolbar>
    <CreateButton label="Add Certification" />
    <ExportButton />
  </TopToolbar>
);

const CourseImage = ({ record }: any) => {
  if (!record) return null;
  
  return (
    <Avatar 
      src={record.imageSrc} 
      alt={record.title}
      sx={{ width: 48, height: 48 }}
    >
      {record.title.substring(0, 2).toUpperCase()}
    </Avatar>
  );
};

export const CourseList = () => {
  return (
    <List
      actions={<ListActions />}
      title="AWS Certifications"
      perPage={10}
    >
      <Datagrid 
        rowClick="show"
        bulkActionButtons={false}
        sx={{
          '& .RaDatagrid-headerCell': {
            fontWeight: 'bold',
            backgroundColor: '#f5f5f5',
          },
          '& .RaDatagrid-rowCell': {
            paddingTop: '16px',
            paddingBottom: '16px',
          },
        }}
      >
        <TextField source="id" label="ID" />
        <FunctionField
          label="Badge"
          render={(record: any) => <CourseImage record={record} />}
          sortable={false}
        />
        <TextField 
          source="title" 
          label="Certification Name"
          sx={{ fontWeight: 'bold' }}
        />
        <FunctionField
          label="Badge Path"
          render={(record: any) => (
            <Chip 
              label={record.imageSrc.split('/').pop() || 'custom'} 
              size="small" 
              variant="outlined"
            />
          )}
        />
        <ShowButton label="View All Content" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

import { 
  Datagrid, 
  List, 
  TextField, 
  ReferenceField, 
  NumberField, 
  SelectField,
  TextInput,
  ReferenceInput,
  SelectInput,
  FilterButton,
  TopToolbar,
  CreateButton,
  ExportButton,
  ChipField,
  FunctionField,
  useGetList,
} from "react-admin";
import { Chip } from "@mui/material";

const challengeFilters = [
  <TextInput key="q" label="Search Question" source="q" alwaysOn />,
  <ReferenceInput 
    key="lessonId"
    label="Lesson" 
    source="lessonId" 
    reference="lessons"
  >
    <SelectInput optionText="title" />
  </ReferenceInput>,
  <SelectInput
    key="type"
    label="Question Type"
    source="type"
    choices={[
      { id: "SELECT", name: "Multiple Choice" },
      { id: "ASSIST", name: "Fill in the Blank" },
    ]}
  />,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton label="Add Question" />
    <ExportButton />
  </TopToolbar>
);

const QuestionPreview = ({ record }: any) => {
  if (!record) return null;
  
  return (
    <div style={{ maxWidth: 400 }}>
      <div style={{ 
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontWeight: 500 
      }}>
        {record.question}
      </div>
    </div>
  );
};

const TypeBadge = ({ record }: any) => {
  if (!record) return null;
  
  const color = record.type === "SELECT" ? "primary" : "secondary";
  const label = record.type === "SELECT" ? "Multiple Choice" : "Fill in Blank";
  
  return <Chip label={label} color={color} size="small" />;
};

const LessonInfo = ({ record }: any) => {
  if (!record || !record.lessonId) return null;
  
  return (
    <ReferenceField source="lessonId" reference="lessons" link="show">
      <FunctionField render={(lesson: any) => (
        <span style={{ fontSize: '0.875rem' }}>
          {lesson?.title || `Lesson #${record.lessonId}`}
        </span>
      )} />
    </ReferenceField>
  );
};

export const ChallengeList = () => {
  return (
    <List
      filters={challengeFilters}
      actions={<ListActions />}
      sort={{ field: 'order', order: 'ASC' }}
      perPage={25}
      title="Questions & Challenges"
    >
      <Datagrid 
        rowClick="edit"
        bulkActionButtons={false}
        sx={{
          '& .RaDatagrid-headerCell': {
            fontWeight: 'bold',
            backgroundColor: '#f5f5f5',
          },
          '& .RaDatagrid-rowCell': {
            paddingTop: '12px',
            paddingBottom: '12px',
          },
        }}
      >
        <NumberField source="id" label="ID" />
        <FunctionField 
          label="Question" 
          render={(record: any) => <QuestionPreview record={record} />}
          sortable={false}
        />
        <FunctionField
          label="Type"
          render={(record: any) => <TypeBadge record={record} />}
          source="type"
        />
        <FunctionField
          label="Lesson"
          render={(record: any) => <LessonInfo record={record} />}
          sortable={false}
        />
        <NumberField source="order" label="Order" />
      </Datagrid>
    </List>
  );
};

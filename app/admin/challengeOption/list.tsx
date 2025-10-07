import { 
  Datagrid, 
  List, 
  TextField, 
  ReferenceField, 
  FunctionField,
  TextInput,
  ReferenceInput,
  SelectInput,
  BooleanInput,
  TopToolbar,
  FilterButton,
  CreateButton,
  ExportButton,
  useListContext,
} from "react-admin";
import { Chip, Alert, Box, Typography } from "@mui/material";

const answerFilters = [
  <TextInput key="q" label="Search Answer Text" source="q" alwaysOn />,
  <ReferenceInput 
    key="challengeId"
    label="Question" 
    source="challengeId" 
    reference="challenges"
  >
    <SelectInput optionText="question" />
  </ReferenceInput>,
  <BooleanInput
    key="correct"
    label="Show Only Correct Answers"
    source="correct"
  />,
];

const ListActions = () => {
  const { filterValues } = useListContext();
  const challengeId = filterValues?.challengeId;
  
  return (
    <TopToolbar>
      <FilterButton />
      <CreateButton 
        label="Add Answer Option" 
        state={{ record: challengeId ? { challengeId: parseInt(challengeId) } : {} }}
      />
      <ExportButton />
    </TopToolbar>
  );
};

const FilterNotice = () => {
  const { filterValues, data } = useListContext();
  const challengeId = filterValues?.challengeId;
  
  if (!challengeId) return null;
  
  return (
    <Box sx={{ mb: 2 }}>
      <Alert severity="info">
        <Typography variant="body2">
          <strong>Viewing answers for Question ID {challengeId}</strong>
        </Typography>
        <Typography variant="caption">
          Showing {data?.length || 0} answer option(s) for this question. 
          Click &quot;Add Answer Option&quot; to create a new answer for this question.
        </Typography>
      </Alert>
    </Box>
  );
};

export const ChallengeOptionList = () => {
  return (
    <List
      filters={answerFilters}
      actions={<ListActions />}
      sort={{ field: 'challengeId', order: 'ASC' }}
      perPage={25}
      title="Answer Options"
    >
      <FilterNotice />
      <Datagrid 
        rowClick="edit"
        bulkActionButtons={false}
        sx={{
          '& .RaDatagrid-headerCell': {
            fontWeight: 'bold',
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <TextField source="id" label="ID" />
        <TextField source="text" label="Answer Text" />
        <FunctionField
          label="Status"
          render={(record: any) => (
            record.correct ? (
              <Chip label="✓ Correct" color="success" size="small" />
            ) : (
              <Chip label="Wrong" size="small" />
            )
          )}
        />
        <ReferenceField 
          source="challengeId" 
          reference="challenges" 
          label="Question"
          link="show"
        >
          <FunctionField 
            render={(record: any) => (
              <span style={{ fontSize: '0.875rem', maxWidth: 300, display: 'block' }}>
                {record?.question?.substring(0, 60)}
                {record?.question?.length > 60 ? '...' : ''}
              </span>
            )}
          />
        </ReferenceField>
        <FunctionField
          label="Media"
          render={(record: any) => (
            <>
              {record.imageSrc && <Chip label="📷 Image" size="small" sx={{ mr: 0.5 }} />}
              {record.audioSrc && <Chip label="🔊 Audio" size="small" />}
              {!record.imageSrc && !record.audioSrc && <span style={{ color: '#999' }}>-</span>}
            </>
          )}
        />
      </Datagrid>
    </List>
  );
};


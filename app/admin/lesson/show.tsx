import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ReferenceField,
  ReferenceManyField,
  Datagrid,
  EditButton,
  DeleteButton,
  CreateButton,
  TopToolbar,
  ListButton,
  EditButton as ShowEditButton,
  FunctionField,
  useRecordContext,
  useListContext,
} from "react-admin";
import { Box, Typography, Chip, Alert, Card, CardContent, Grid } from "@mui/material";
import { BookOpen, FileQuestion, CheckCircle2 } from "lucide-react";

const QuestionStats = () => {
  const { data, isLoading } = useListContext();
  
  if (isLoading) {
    return <Typography variant="body2">Loading statistics...</Typography>;
  }
  
  if (!data || data.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No questions in this lesson yet.
      </Typography>
    );
  }
  
  const total = data.length;
  const selectType = data.filter((r: any) => r.type === 'SELECT').length;
  const assistType = data.filter((r: any) => r.type === 'ASSIST').length;
  
  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Total Questions:</strong> {total}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        Multiple Choice (SELECT): {selectType}
      </Typography>
      <Typography variant="body2">
        Fill in the Blank (ASSIST): {assistType}
      </Typography>
    </Box>
  );
};

const ShowActions = () => (
  <TopToolbar>
    <ShowEditButton />
    <ListButton />
  </TopToolbar>
);

const LessonTitle = () => {
  const record = useRecordContext();
  return <span>Lesson: {record ? record.title : ''}</span>;
};

export const LessonShow = () => {
  return (
    <Show actions={<ShowActions />} title={<LessonTitle />}>
      <SimpleShowLayout>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#FF9900', display: 'flex', alignItems: 'center', gap: 1 }}>
            <BookOpen size={24} />
            Lesson Overview
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', borderLeft: '4px solid #FF9900' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Lesson Details
                </Typography>
                <TextField source="title" label="Title" sx={{ display: 'block', mb: 1 }} />
                <NumberField source="order" label="Order" sx={{ display: 'block', mb: 1 }} />
                <ReferenceField source="unitId" reference="units" label="Unit" link={false}>
                  <TextField source="title" />
                </ReferenceField>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Card sx={{ height: '100%', backgroundColor: '#f9f9f9' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FileQuestion size={20} />
                  Quick Stats
                </Typography>
                <ReferenceManyField
                  reference="challenges"
                  target="lessonId"
                  label={false}
                >
                  <QuestionStats />
                </ReferenceManyField>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#FF9900', display: 'flex', alignItems: 'center', gap: 1 }}>
            <FileQuestion size={20} />
            All Questions in This Lesson
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            These are the quiz questions students will answer in this lesson. Click &quot;Edit&quot; to modify questions and their answer options.
          </Alert>
        </Box>

        <ReferenceManyField
          reference="challenges"
          target="lessonId"
          label={false}
          sort={{ field: 'order', order: 'ASC' }}
        >
          <Datagrid
            bulkActionButtons={false}
            sx={{
              '& .RaDatagrid-headerCell': {
                fontWeight: 'bold',
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <NumberField source="order" label="Order" />
            <TextField source="question" label="Question" sx={{ maxWidth: 400 }} />
            <FunctionField
              label="Type"
              render={(record: any) => (
                <Chip
                  label={record.type === 'SELECT' ? 'Multiple Choice' : 'Fill in Blank'}
                  color={record.type === 'SELECT' ? 'primary' : 'secondary'}
                  size="small"
                />
              )}
            />
            <EditButton />
            <DeleteButton />
          </Datagrid>
        </ReferenceManyField>

        <FunctionField
          render={(record: any) => (
            <Box sx={{ mt: 2 }}>
              <CreateButton
                resource="challenges"
                label="Add New Question"
                variant="contained"
                state={{ record: { lessonId: record?.id } }}
              />
            </Box>
          )}
        />
      </SimpleShowLayout>
    </Show>
  );
};

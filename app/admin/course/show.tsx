import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  ReferenceManyField,
  ReferenceField,
  Datagrid,
  NumberField,
  EditButton,
  CreateButton,
  FunctionField,
  TopToolbar,
  ListButton,
  useRecordContext,
  ShowButton,
} from "react-admin";
import { Box, Typography, Alert, Chip, Paper, Card, CardContent, Grid } from "@mui/material";
import { BookOpen, FileQuestion, ListChecks, Award } from "lucide-react";

const ShowActions = () => (
  <TopToolbar>
    <EditButton />
    <ListButton />
  </TopToolbar>
);

const CourseTitle = () => {
  const record = useRecordContext();
  return <span>{record ? record.title : ''} - Overview</span>;
};

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <Card sx={{ height: '100%', backgroundColor: color + '10' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: color }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Icon size={40} color={color} />
      </Box>
    </CardContent>
  </Card>
);

export const CourseShow = () => {
  return (
    <Show actions={<ShowActions />} title={<CourseTitle />}>
      <TabbedShowLayout>
        <Tab label="Overview">
          <Box sx={{ mt: 2, mb: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#FF9900', fontWeight: 'bold' }}>
              Certification Overview
            </Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              Quick view of all content in this certification. Click on tabs to see detailed information.
            </Alert>
          </Box>

          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Certification Details
            </Typography>
            <TextField source="title" label="Certification Name" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }} />
            <TextField source="imageSrc" label="Badge Path" />
          </Paper>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
            Content Statistics
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <ReferenceManyField reference="units" target="courseId" label={false}>
                <FunctionField render={(record: any, source: any) => {
                  const units = source?.data || [];
                  return <StatCard title="Units" value={units.length} icon={BookOpen} color="#232F3E" />;
                }} />
              </ReferenceManyField>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <ReferenceManyField reference="lessons" target="courseId" label={false}>
                <FunctionField render={(record: any, source: any) => {
                  const lessons = source?.data || [];
                  return <StatCard title="Lessons" value={lessons.length} icon={ListChecks} color="#2196F3" />;
                }} />
              </ReferenceManyField>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <ReferenceManyField reference="challenges" target="courseId" label={false}>
                <FunctionField render={(record: any, source: any) => {
                  const questions = source?.data || [];
                  return <StatCard title="Questions" value={questions.length} icon={FileQuestion} color="#FF9900" />;
                }} />
              </ReferenceManyField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', backgroundColor: '#4CAF5010' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
                        Ready
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Status
                      </Typography>
                    </Box>
                    <Award size={40} color="#4CAF50" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Alert severity="success" sx={{ mt: 3 }}>
            <strong>Quick Actions:</strong> Use the tabs above to view units, lessons, and questions in detail. 
            Click the Edit button to make changes.
          </Alert>
        </Tab>

        <Tab label="Units" path="units">
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FF9900' }}>
              Learning Units
            </Typography>
          </Box>

          <ReferenceManyField
            reference="units"
            target="courseId"
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
                '& .RaDatagrid-rowCell': {
                  paddingTop: '12px',
                  paddingBottom: '12px',
                },
              }}
            >
              <NumberField source="order" label="Order" />
              <TextField source="title" label="Unit Title" sx={{ fontWeight: 'bold' }} />
              <TextField source="description" label="Description" />
              <EditButton />
            </Datagrid>
          </ReferenceManyField>

          <Box sx={{ mt: 2 }}>
            <CreateButton
              resource="units"
              label="Add New Unit"
              variant="contained"
            />
          </Box>
        </Tab>

        <Tab label="Lessons" path="lessons">
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FF9900' }}>
              All Lessons
            </Typography>
          </Box>

          <ReferenceManyField
            reference="lessons"
            target="courseId"
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
                '& .RaDatagrid-rowCell': {
                  paddingTop: '12px',
                  paddingBottom: '12px',
                },
              }}
            >
              <NumberField source="order" label="#" />
              <TextField source="title" label="Lesson Title" sx={{ fontWeight: 'bold' }} />
              <FunctionField
                label="Unit"
                render={(record: any) => (
                  <ReferenceField source="unitId" reference="units" record={record} link={false}>
                    <TextField source="title" />
                  </ReferenceField>
                )}
              />
              <EditButton />
            </Datagrid>
          </ReferenceManyField>

          <Box sx={{ mt: 2 }}>
            <CreateButton
              resource="lessons"
              label="Add New Lesson"
              variant="contained"
            />
          </Box>
        </Tab>

        <Tab label="Questions" path="questions">
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FF9900' }}>
              All Questions
            </Typography>
          </Box>

          <ReferenceManyField
            reference="challenges"
            target="courseId"
            label={false}
            perPage={50}
            sort={{ field: 'order', order: 'ASC' }}
          >
            <Datagrid
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
              <NumberField source="order" label="#" />
              <FunctionField
                label="Question"
                render={(record: any) => (
                  <div style={{ maxWidth: 400 }}>
                    {record.question?.substring(0, 80)}
                    {record.question?.length > 80 ? '...' : ''}
                  </div>
                )}
              />
              <FunctionField
                label="Type"
                render={(record: any) => (
                  <Chip 
                    label={record.type === 'SELECT' ? 'Multiple Choice' : 'Fill in Blank'} 
                    size="small" 
                    color={record.type === 'SELECT' ? 'primary' : 'secondary'}
                  />
                )}
              />
              <FunctionField
                label="Lesson"
                render={(record: any) => (
                  <ReferenceField source="lessonId" reference="lessons" record={record} link={false}>
                    <FunctionField render={(lesson: any) => (
                      <span style={{ fontSize: '0.875rem' }}>
                        {lesson?.title?.substring(0, 30)}
                        {lesson?.title?.length > 30 ? '...' : ''}
                      </span>
                    )} />
                  </ReferenceField>
                )}
              />
              <EditButton />
            </Datagrid>
          </ReferenceManyField>

          <Box sx={{ mt: 2 }}>
            <CreateButton
              resource="challenges"
              label="Add New Question"
              variant="contained"
            />
          </Box>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

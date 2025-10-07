import { 
  Edit, 
  TextInput, 
  required,
  TabbedForm,
  FormTab,
  ReferenceManyField,
  ReferenceField,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  CreateButton,
  useRecordContext,
  TopToolbar,
  ListButton,
  FunctionField,
  ShowButton,
} from "react-admin";
import { Box, Typography, Alert, Chip, Paper, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ChevronDown } from "lucide-react";

const EditActions = () => (
  <TopToolbar>
    <ListButton />
  </TopToolbar>
);

const CourseTitle = () => {
  const record = useRecordContext();
  return <span>Manage: {record ? record.title : ''}</span>;
};

export const CourseEdit = () => {
  return (
    <Edit actions={<EditActions />} title={<CourseTitle />}>
      <TabbedForm>
        <FormTab label="Certification Details" sx={{ maxWidth: 800 }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2, color: '#FF9900' }}>
            Certification Information
          </Typography>
          
          <TextInput 
            source="id" 
            label="ID"
            disabled
            helperText="Auto-generated ID (cannot be changed)"
          />
          
          <TextInput 
            source="title" 
            validate={[required()]} 
            label="Certification Name"
            fullWidth
            helperText="Example: AWS Cloud Practitioner"
          />
          
          <TextInput 
            source="imageSrc" 
            validate={[required()]} 
            label="Badge Image Path"
            fullWidth
            helperText="Path to certification badge SVG (e.g., /cloud-practitioner.svg)"
          />

          <Box sx={{ mt: 3 }}>
            <Alert severity="info">
              <strong>Tip:</strong> After updating certification details, manage units, lessons, and questions in the tabs above.
            </Alert>
          </Box>
        </FormTab>

        <FormTab label="Units & Structure" path="units">
          <Box sx={{ mt: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FF9900' }}>
              Learning Units
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              Units organize your certification content into logical sections. Each unit contains multiple lessons.
            </Alert>
          </Box>

          <ReferenceManyField
            reference="units"
            target="courseId"
            label={false}
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
              <TextField source="title" label="Unit Title" />
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
        </FormTab>

        <FormTab label="All Lessons" path="lessons">
          <Box sx={{ mt: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FF9900' }}>
              All Lessons in This Certification
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              View all lessons across all units. Each lesson contains quiz questions.
            </Alert>
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
              }}
            >
              <NumberField source="order" label="Order" />
              <TextField source="title" label="Lesson Title" />
              <FunctionField
                label="Unit"
                render={(record: any) => (
                  <ReferenceField source="unitId" reference="units" record={record} link={false}>
                    <TextField source="title" />
                  </ReferenceField>
                )}
              />
              <EditButton />
              <FunctionField
                label="Actions"
                render={(record: any) => (
                  <ShowButton
                    resource="lessons"
                    label="View Questions"
                    record={record}
                  />
                )}
              />
            </Datagrid>
          </ReferenceManyField>

          <Box sx={{ mt: 2 }}>
            <CreateButton
              resource="lessons"
              label="Add New Lesson"
              variant="contained"
            />
          </Box>
        </FormTab>

        <FormTab label="All Questions" path="questions">
          <Box sx={{ mt: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FF9900' }}>
              All Questions in This Certification
            </Typography>
            <Alert severity="warning" sx={{ mb: 2 }}>
              <strong>Note:</strong> This shows ALL questions across all lessons in this certification. 
              Use filters to find specific questions.
            </Alert>
          </Box>

          <ReferenceManyField
            reference="challenges"
            target="courseId"
            label={false}
            perPage={50}
          >
            <Datagrid
              bulkActionButtons={false}
              sx={{
                '& .RaDatagrid-headerCell': {
                  fontWeight: 'bold',
                  backgroundColor: '#f5f5f5',
                },
                '& .RaDatagrid-rowCell': {
                  maxWidth: 400,
                },
              }}
            >
              <NumberField source="order" label="#" />
              <FunctionField
                label="Question"
                render={(record: any) => (
                  <div style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {record.question?.substring(0, 60)}
                    {record.question?.length > 60 ? '...' : ''}
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
                    <TextField source="title" />
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
        </FormTab>

        <FormTab label="Content Summary" path="summary">
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FF9900', mb: 3 }}>
              Content Overview
            </Typography>

            <Paper elevation={2} sx={{ p: 3, mb: 3, backgroundColor: '#f9f9f9' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#232F3E' }}>
                Statistics
              </Typography>
              
              <ReferenceManyField reference="units" target="courseId" label={false}>
                <FunctionField render={(record: any, source: any) => {
                  const units = source?.data || [];
                  return (
                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        label={`${units.length} Units`} 
                        color="primary" 
                        sx={{ mr: 1, fontWeight: 'bold', fontSize: '1rem', p: 2 }}
                      />
                    </Box>
                  );
                }} />
              </ReferenceManyField>

              <ReferenceManyField reference="lessons" target="courseId" label={false}>
                <FunctionField render={(record: any, source: any) => {
                  const lessons = source?.data || [];
                  return (
                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        label={`${lessons.length} Lessons`} 
                        color="secondary" 
                        sx={{ mr: 1, fontWeight: 'bold', fontSize: '1rem', p: 2 }}
                      />
                    </Box>
                  );
                }} />
              </ReferenceManyField>

              <ReferenceManyField reference="challenges" target="courseId" label={false}>
                <FunctionField render={(record: any, source: any) => {
                  const questions = source?.data || [];
                  return (
                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        label={`${questions.length} Questions`} 
                        sx={{ 
                          mr: 1, 
                          fontWeight: 'bold', 
                          fontSize: '1rem', 
                          p: 2,
                          backgroundColor: '#FF9900',
                          color: 'white'
                        }}
                      />
                    </Box>
                  );
                }} />
              </ReferenceManyField>
            </Paper>

            <Alert severity="success">
              <strong>Quick Actions:</strong>
              <ul style={{ marginTop: 8, marginBottom: 0 }}>
                <li>Use the tabs above to manage units, lessons, and questions</li>
                <li>Click &quot;Edit&quot; on any item to modify it</li>
                <li>Use &quot;Add New&quot; buttons to create content</li>
              </ul>
            </Alert>
          </Box>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

import { 
  Edit, 
  TextInput, 
  ReferenceInput, 
  NumberInput, 
  required,
  SelectInput,
  TabbedForm,
  FormTab,
  ReferenceManyField,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  DeleteButton,
  CreateButton,
  useRecordContext,
  TopToolbar,
  ListButton,
  FunctionField,
  ReferenceField,
  useListContext,
} from "react-admin";
import { Box, Typography, Chip, Alert, Card, CardContent, Grid, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";
import { ChevronDown, FileQuestion, CheckCircle2, AlertCircle } from "lucide-react";

const EditActions = () => (
  <TopToolbar>
    <ListButton />
  </TopToolbar>
);

const LessonTitle = () => {
  const record = useRecordContext();
  return <span>Edit Lesson: {record ? record.title : ''}</span>;
};

// Component to display answer options for a question
const AnswerOptionsList = ({ challengeId }: { challengeId: number | string }) => {
  return (
    <ReferenceManyField
      reference="challengeOptions"
      target="challengeId"
      label={false}
      record={{ id: challengeId }}
    >
      <Datagrid
        bulkActionButtons={false}
        sx={{
          '& .RaDatagrid-headerCell': {
            fontWeight: 'bold',
            backgroundColor: '#f5f5f5',
            fontSize: '0.875rem',
          },
          '& .RaDatagrid-rowCell': {
            fontSize: '0.875rem',
          },
        }}
      >
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
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </ReferenceManyField>
  );
};

// Component to display question preview with answers
const QuestionPreview = ({ question }: { question: any }) => {
  return (
    <Card sx={{ mb: 2, border: '1px solid #e0e0e0' }}>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1, color: '#232F3E' }}>
            {question.question}
          </Typography>
          <Chip 
            label={question.type === 'SELECT' ? 'Multiple Choice' : 'Fill in Blank'} 
            size="small" 
            color={question.type === 'SELECT' ? 'primary' : 'secondary'}
            sx={{ mr: 1 }}
          />
          <Chip 
            label={`Order: ${question.order}`} 
            size="small" 
            variant="outlined"
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 1.5, color: '#666' }}>
          Answer Options:
        </Typography>

        <ReferenceManyField
          reference="challengeOptions"
          target="challengeId"
          label={false}
          record={question}
        >
          <AnswersPreview />
        </ReferenceManyField>
      </CardContent>
    </Card>
  );
};

// Component to render answer previews
const AnswersPreview = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) {
    return <Typography variant="body2">Loading answers...</Typography>;
  }

  if (!data || data.length === 0) {
    return (
      <Alert severity="warning" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AlertCircle size={18} />
        No answers yet. Add answer options to complete this question.
      </Alert>
    );
  }

  const correctAnswers = data.filter((opt: any) => opt.correct);
  const hasCorrectAnswer = correctAnswers.length > 0;
  const multipleCorrect = correctAnswers.length > 1;

  return (
    <Box>
      {data.map((option: any, index: number) => (
        <Box
          key={option.id}
          sx={{
            p: 2,
            mb: 1.5,
            border: option.correct ? '2px solid #4caf50' : '2px solid #e0e0e0',
            borderRadius: 1,
            backgroundColor: option.correct ? '#f1f8f4' : 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography 
              sx={{ 
                fontWeight: 'bold',
                color: option.correct ? '#4caf50' : '#666',
                minWidth: 30
              }}
            >
              {String.fromCharCode(65 + index)}.
            </Typography>
            <Typography>{option.text}</Typography>
            {option.imageSrc && (
              <Chip label="📷 Image" size="small" color="info" variant="outlined" />
            )}
            {option.audioSrc && (
              <Chip label="🔊 Audio" size="small" color="info" variant="outlined" />
            )}
          </Box>
          {option.correct && (
            <Chip 
              label="✓ Correct Answer" 
              color="success" 
              size="small" 
            />
          )}
        </Box>
      ))}

      {/* Validation Status */}
      <Box sx={{ mt: 2 }}>
        {!hasCorrectAnswer && (
          <Alert severity="error" icon={<AlertCircle size={18} />}>
            ⚠️ No correct answer marked! Please mark one answer as correct.
          </Alert>
        )}
        {multipleCorrect && (
          <Alert severity="error" icon={<AlertCircle size={18} />}>
            ⚠️ Multiple correct answers detected! Only one answer should be marked as correct.
          </Alert>
        )}
        {data.length < 2 && (
          <Alert severity="warning">
            ⚠️ Add at least 2 answer options for a proper question.
          </Alert>
        )}
        {hasCorrectAnswer && !multipleCorrect && data.length >= 2 && (
          <Alert severity="success" icon={<CheckCircle2 size={18} />}>
            ✓ Question is ready! It has {data.length} answer options with exactly 1 correct answer.
          </Alert>
        )}
      </Box>
    </Box>
  );
};

// Statistics component
const QuestionStats = () => {
  const { data, isLoading } = useListContext();
  
  if (isLoading) {
    return <Typography variant="body2">Loading statistics...</Typography>;
  }
  
  if (!data || data.length === 0) {
    return (
      <Alert severity="info">
        No questions in this lesson yet. Add questions in the &quot;Questions&quot; tab.
      </Alert>
    );
  }
  
  const total = data.length;
  const selectType = data.filter((r: any) => r.type === 'SELECT').length;
  const assistType = data.filter((r: any) => r.type === 'ASSIST').length;
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card sx={{ textAlign: 'center', p: 2, backgroundColor: '#e3f2fd' }}>
          <Typography variant="h3" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            {total}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Questions
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ textAlign: 'center', p: 2, backgroundColor: '#f3e5f5' }}>
          <Typography variant="h3" sx={{ color: '#9c27b0', fontWeight: 'bold' }}>
            {selectType}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Multiple Choice
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ textAlign: 'center', p: 2, backgroundColor: '#fff3e0' }}>
          <Typography variant="h3" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
            {assistType}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill in Blank
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export const LessonEdit = () => {
  return (
    <Edit actions={<EditActions />} title={<LessonTitle />}>
      <TabbedForm>
        <FormTab label="Lesson Details" sx={{ maxWidth: 800 }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2, color: '#FF9900' }}>
            Lesson Information
          </Typography>
          
          <TextInput 
            source="title" 
            validate={[required()]} 
            label="Lesson Title"
            fullWidth
            helperText="The name of this lesson that students will see"
          />
          
          <ReferenceInput
            source="unitId"
            reference="units"
            label="Parent Unit"
          >
            <SelectInput 
              optionText="title" 
              validate={[required()]}
              fullWidth
              helperText="Which unit does this lesson belong to?"
            />
          </ReferenceInput>
          
          <NumberInput
            source="order"
            validate={[required()]}
            label="Lesson Order"
            helperText="Position in the unit (1 = first lesson, 2 = second, etc.)"
            min={1}
            fullWidth
          />

          <Box sx={{ mt: 3 }}>
            <Alert severity="info">
              <strong>Tip:</strong> After updating lesson details, manage questions in the &quot;Questions&quot; tab.
            </Alert>
          </Box>
        </FormTab>

        <FormTab label="Questions" path="questions">
          <Box sx={{ mt: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FF9900', display: 'flex', alignItems: 'center', gap: 1 }}>
              <FileQuestion size={20} />
              All Questions in This Lesson
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              Manage all quiz questions for this lesson. Each question should have multiple answer options with one correct answer.
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
              expand={<QuestionExpandPanel />}
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
        </FormTab>

        <FormTab label="Preview All" path="preview">
          <Box sx={{ mt: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FF9900' }}>
              Lesson Preview with Statistics
            </Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              Review all questions and their answers. This shows how students will see the content.
            </Alert>
          </Box>

          {/* Statistics */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Statistics
            </Typography>
            <ReferenceManyField
              reference="challenges"
              target="lessonId"
              label={false}
            >
              <QuestionStats />
            </ReferenceManyField>
          </Box>

          {/* All Questions Preview */}
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
              All Questions with Answers
            </Typography>
            <ReferenceManyField
              reference="challenges"
              target="lessonId"
              label={false}
              sort={{ field: 'order', order: 'ASC' }}
            >
              <QuestionPreviewList />
            </ReferenceManyField>
          </Box>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

// Expandable panel for question details
const QuestionExpandPanel = () => {
  const record = useRecordContext();
  
  if (!record) return null;
  
  return (
    <Box sx={{ p: 3, backgroundColor: '#f9f9f9' }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold', color: '#FF9900' }}>
        Answer Options for this Question:
      </Typography>
      <AnswerOptionsList challengeId={record.id} />
      <Box sx={{ mt: 2 }}>
        <CreateButton
          resource="challengeOptions"
          label="Add Answer to This Question"
          variant="outlined"
          state={{ record: { challengeId: record.id } }}
          size="small"
        />
      </Box>
    </Box>
  );
};

// Component to list all questions with previews
const QuestionPreviewList = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) {
    return <Typography>Loading questions...</Typography>;
  }

  if (!data || data.length === 0) {
    return (
      <Alert severity="warning">
        No questions in this lesson yet. Add questions in the &quot;Questions&quot; tab.
      </Alert>
    );
  }

  return (
    <Box>
      {data.map((question: any, index: number) => (
        <Accordion key={question.id} defaultExpanded={index === 0}>
          <AccordionSummary
            expandIcon={<ChevronDown />}
            sx={{
              backgroundColor: '#f5f5f5',
              '&:hover': { backgroundColor: '#eeeeee' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Chip 
                label={`Q${question.order}`} 
                color="primary" 
                size="small" 
                sx={{ fontWeight: 'bold' }}
              />
              <Typography sx={{ fontWeight: 'bold', flex: 1 }}>
                {question.question}
              </Typography>
              <Chip 
                label={question.type === 'SELECT' ? 'Multiple Choice' : 'Fill in Blank'}
                size="small"
                variant="outlined"
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <QuestionPreview question={question} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

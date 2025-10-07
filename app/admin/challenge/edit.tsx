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
  BooleanField,
  EditButton,
  DeleteButton,
  CreateButton,
  useRecordContext,
  TopToolbar,
  ListButton,
  FunctionField,
  useListContext,
} from "react-admin";
import { Box, Typography, Chip, Alert } from "@mui/material";
import { challengeOptions } from "@/db/schema";

const PreviewAnswersList = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) {
    return <Typography variant="body2">Loading answers...</Typography>;
  }

  if (!data || data.length === 0) {
    return (
      <Alert severity="warning">
        No answer options yet. Add at least 2 answer options in the &quot;Answer Options&quot; tab.
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
              <Chip label="Has Image" size="small" color="info" />
            )}
            {option.audioSrc && (
              <Chip label="Has Audio" size="small" color="info" />
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

      {/* Validation Warnings */}
      <Box sx={{ mt: 3 }}>
        {!hasCorrectAnswer && (
          <Alert severity="error" sx={{ mb: 1 }}>
            ⚠️ No correct answer marked! Please mark one answer as correct.
          </Alert>
        )}
        {multipleCorrect && (
          <Alert severity="error" sx={{ mb: 1 }}>
            ⚠️ Multiple correct answers detected! Only one answer should be marked as correct.
          </Alert>
        )}
        {data.length < 2 && (
          <Alert severity="warning" sx={{ mb: 1 }}>
            ⚠️ Add at least 2 answer options for a proper question.
          </Alert>
        )}
        {hasCorrectAnswer && !multipleCorrect && data.length >= 2 && (
          <Alert severity="success">
            ✓ Question is ready! It has {data.length} answer options with exactly 1 correct answer.
          </Alert>
        )}
      </Box>
    </Box>
  );
};

const EditActions = () => (
  <TopToolbar>
    <ListButton />
  </TopToolbar>
);

const QuestionTitle = () => {
  const record = useRecordContext();
  return <span>Question: {record ? `"${record.question.substring(0, 50)}${record.question.length > 50 ? '...' : ''}"` : ''}</span>;
};

const AnswerStatus = ({ record }: any) => {
  if (!record) return null;
  return record.correct ? (
    <Chip label="✓ Correct Answer" color="success" size="small" />
  ) : (
    <Chip label="Wrong Answer" color="default" size="small" />
  );
};

const AnswerOptionsTab = () => {
  const record = useRecordContext();
  
  if (!record) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ mt: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#FF9900' }}>
          Answer Options
        </Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          Add multiple answer choices. Mark one as correct. Students must choose the correct answer to pass.
        </Alert>
      </Box>

      <ReferenceManyField
        reference="challengeOptions"
        target="challengeId"
        label={false}
        record={record}
        sort={{ field: 'id', order: 'ASC' }}
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
          <TextField source="text" label="Answer Text" />
          <FunctionField
            label="Correct?"
            render={(record: any) => (
              record.correct ? (
                <Chip label="✓ Correct" color="success" size="small" />
              ) : (
                <Chip label="Wrong" size="small" />
              )
            )}
          />
          <TextField source="imageSrc" label="Image URL" />
          <TextField source="audioSrc" label="Audio URL" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      </ReferenceManyField>
      
      <Box sx={{ mt: 2 }}>
        <CreateButton
          resource="challengeOptions"
          label="Add New Answer Option"
          variant="contained"
          state={{ record: { challengeId: record.id } }}
          sx={{ mt: 2 }}
        />
      </Box>
    </Box>
  );
};

export const ChallengeEdit = () => {
  return (
    <Edit actions={<EditActions />} title={<QuestionTitle />}>
      <TabbedForm>
        <FormTab label="Question Details" sx={{ maxWidth: 800 }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2, color: '#FF9900' }}>
            Question Information
          </Typography>
          
          <TextInput 
            source="question" 
            validate={[required()]} 
            label="Question Text"
            multiline
            rows={3}
            fullWidth
            helperText="Enter the question that students will see"
          />
          
          <SelectInput
            source="type"
            choices={[
              { id: "SELECT", name: "Multiple Choice" },
              { id: "ASSIST", name: "Fill in the Blank" },
            ]}
            validate={[required()]}
            label="Question Type"
            helperText="SELECT: Students choose from options | ASSIST: Students type or select words"
          />
          
          <ReferenceInput
            source="lessonId"
            reference="lessons"
            label="Lesson"
          >
            <SelectInput 
              optionText="title" 
              validate={[required()]}
              helperText="Which lesson does this question belong to?"
            />
          </ReferenceInput>
          
          <NumberInput
            source="order"
            validate={[required()]}
            label="Question Order"
            helperText="Order this question appears in the lesson (lower numbers appear first)"
            min={1}
          />
        </FormTab>

        <FormTab label="Answer Options" path="answers">
          <AnswerOptionsTab />
        </FormTab>

        <FormTab label="Preview & Test" path="preview">
          <FunctionField
            render={(record: any) => {
              if (!record) return null;
              
              return (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#FF9900' }}>
                    Question Preview
                  </Typography>
                  
                  <Alert severity="info" sx={{ mb: 3 }}>
                    This is how the question will appear to students during their lesson.
                  </Alert>

                  {/* Question Display */}
                  <Box 
                    sx={{ 
                      p: 4, 
                      backgroundColor: '#f9f9f9', 
                      borderRadius: 2,
                      border: '2px solid #e0e0e0',
                      mb: 3
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                      {record.question}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      <strong>Question Type:</strong> {record.type === 'SELECT' ? 'Multiple Choice' : 'Fill in the Blank'}
                    </Typography>

                    {/* Answers Preview */}
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle2" sx={{ mb: 2, color: '#666' }}>
                        Answer Options:
                      </Typography>
                      <ReferenceManyField
                        reference="challengeOptions"
                        target="challengeId"
                        label={false}
                        record={record}
                      >
                        <PreviewAnswersList />
                      </ReferenceManyField>
                    </Box>
                  </Box>

                  {/* Testing Tips */}
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Testing Checklist:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                        ✓ Question text is clear and grammatically correct
                      </Typography>
                      <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                        ✓ Has at least 2 answer options (recommended: 3-4)
                      </Typography>
                      <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                        ✓ Exactly ONE answer is marked as correct
                      </Typography>
                      <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                        ✓ All wrong answers are plausible (not obviously incorrect)
                      </Typography>
                      <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                        ✓ Images/audio (if used) are accessible and load correctly
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            }}
          />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

import { 
  SimpleForm, 
  Edit, 
  TextInput, 
  ReferenceInput, 
  required, 
  BooleanInput,
  SelectInput,
  TopToolbar,
  ListButton,
  useRecordContext,
} from "react-admin";
import { Box, Typography, Alert, Paper, Divider, Chip } from "@mui/material";

const EditActions = () => (
  <TopToolbar>
    <ListButton />
  </TopToolbar>
);

const AnswerTitle = () => {
  const record = useRecordContext();
  if (!record) return null;
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <span>Edit Answer: {record.text.substring(0, 40)}{record.text.length > 40 ? '...' : ''}</span>
      {record.correct && <Chip label="✓ Correct" color="success" size="small" />}
    </Box>
  );
};

export const ChallengeOptionEdit = () => {
  return (
    <Edit 
      actions={<EditActions />}
      title={<AnswerTitle />}
    >
      <SimpleForm sx={{ maxWidth: 800 }}>
        <Box sx={{ width: '100%', mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#FF9900', mb: 2 }}>
            Edit Answer Option
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ p: 3, backgroundColor: '#f9f9f9', width: '100%' }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Answer Details
          </Typography>

          <ReferenceInput
            source="challengeId"
            reference="challenges"
            label="Question"
          >
            <SelectInput 
              optionText="question" 
              validate={[required()]}
              fullWidth
              helperText="Which question does this answer belong to?"
              disabled
            />
          </ReferenceInput>

          <TextInput 
            source="text" 
            validate={[required()]} 
            label="Answer Text"
            multiline
            rows={2}
            fullWidth
            helperText="The answer choice students will see"
          />
          
          <Box sx={{ mt: 2, mb: 2, p: 2, backgroundColor: '#fff3cd', borderRadius: 1 }}>
            <BooleanInput
              source="correct"
              label="✓ This is the CORRECT answer"
              helperText="⚠️ Important: Only ONE answer per question should be marked correct"
              sx={{ 
                '& .MuiFormControlLabel-label': { 
                  fontWeight: 'bold',
                  color: '#856404'
                } 
              }}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Optional Media
          </Typography>

          <TextInput
            source="imageSrc"
            label="Image URL"
            fullWidth
            helperText="Optional: Add an image to show with this answer"
            placeholder="https://example.com/image.png"
          />
          
          <TextInput
            source="audioSrc"
            label="Audio URL"
            fullWidth
            helperText="Optional: Add audio pronunciation for this answer"
            placeholder="https://example.com/audio.mp3"
          />

          {/* Preview section */}
          <Box sx={{ mt: 3, p: 2, backgroundColor: '#e7f3ff', borderRadius: 1 }}>
            <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 'bold' }}>
              Preview:
            </Typography>
            <Typography variant="body2">
              Students will see: <strong>{useRecordContext()?.text || '[Answer text]'}</strong>
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ mt: 3 }}>
          <Alert severity="info">
            <strong>Quality Check:</strong> Make sure this answer is clear, accurate, and appropriate for the question difficulty level.
          </Alert>
        </Box>
      </SimpleForm>
    </Edit>
  );
};

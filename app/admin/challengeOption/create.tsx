import { 
  SimpleForm, 
  Create, 
  TextInput, 
  ReferenceInput, 
  required, 
  BooleanInput,
  SelectInput,
  TopToolbar,
  ListButton,
} from "react-admin";
import { Box, Typography, Alert, Paper, Divider } from "@mui/material";

const CreateActions = () => (
  <TopToolbar>
    <ListButton />
  </TopToolbar>
);

export const ChallengeOptionCreate = () => {
  return (
    <Create 
      actions={<CreateActions />}
      title="Create New Answer Option"
    >
      <SimpleForm sx={{ maxWidth: 800 }}>
        <Box sx={{ width: '100%', mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#FF9900', mb: 2 }}>
            Add Answer Option
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Remember:</strong> Each question needs multiple answer options. Mark only ONE as correct.
          </Alert>
        </Box>

        <Paper elevation={0} sx={{ p: 3, backgroundColor: '#f9f9f9', width: '100%' }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Answer Details
          </Typography>

          <ReferenceInput
            source="challengeId"
            reference="challenges"
            label="Select Question"
          >
            <SelectInput 
              optionText="question" 
              validate={[required()]}
              fullWidth
              helperText="Which question does this answer belong to?"
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
            placeholder="Example: Elastic Compute Cloud"
          />
          
          <BooleanInput
            source="correct"
            label="✓ This is the CORRECT answer"
            helperText="Toggle ON if this is the right answer (only one answer should be correct per question)"
            defaultValue={false}
          />

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Optional Media (Advanced)
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
        </Paper>

        <Box sx={{ mt: 3 }}>
          <Alert severity="warning">
            <strong>Tip:</strong> Create at least 3-4 answer options per question. Make sure only one is marked as correct!
          </Alert>
        </Box>
      </SimpleForm>
    </Create>
  );
};

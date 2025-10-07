import { 
  SimpleForm, 
  Create, 
  TextInput, 
  ReferenceInput, 
  NumberInput, 
  required, 
  SelectInput,
  TopToolbar,
  ListButton,
} from "react-admin";
import { Box, Typography, Alert, Paper } from "@mui/material";

const CreateActions = () => (
  <TopToolbar>
    <ListButton />
  </TopToolbar>
);

export const ChallengeCreate = () => {
  return (
    <Create 
      actions={<CreateActions />}
      title="Create New Question"
    >
      <SimpleForm sx={{ maxWidth: 800 }}>
        <Box sx={{ width: '100%', mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#FF9900', mb: 2 }}>
            Add New Question
          </Typography>
          <Alert severity="info" sx={{ mb: 3 }}>
            <strong>Quick Start:</strong> Create the question first, then add answer options on the edit page.
          </Alert>
        </Box>

        <Paper elevation={0} sx={{ p: 3, backgroundColor: '#f9f9f9', width: '100%' }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Question Details
          </Typography>

          <TextInput 
            source="question" 
            validate={[required()]} 
            label="Question Text"
            multiline
            rows={4}
            fullWidth
            helperText="Write the question that students will answer"
            placeholder="Example: What does EC2 stand for in AWS?"
          />
          
          <SelectInput
            source="type"
            choices={[
              { id: "SELECT", name: "Multiple Choice (recommended)" },
              { id: "ASSIST", name: "Fill in the Blank" },
            ]}
            validate={[required()]}
            label="Question Type"
            fullWidth
            helperText="Multiple Choice: Students pick from options | Fill in Blank: Students complete the sentence"
            defaultValue="SELECT"
          />
          
          <ReferenceInput
            source="lessonId"
            reference="lessons"
            label="Assign to Lesson"
          >
            <SelectInput 
              optionText="title" 
              validate={[required()]}
              fullWidth
              helperText="Which lesson should include this question?"
            />
          </ReferenceInput>
          
          <NumberInput
            source="order"
            validate={[required()]}
            label="Question Order"
            helperText="Position in the lesson (1 = first question, 2 = second, etc.)"
            defaultValue={1}
            min={1}
            fullWidth
          />
        </Paper>

        <Box sx={{ mt: 3 }}>
          <Alert severity="success">
            <strong>Next Step:</strong> After creating this question, you&apos;ll be able to add answer options (with correct/wrong marking).
          </Alert>
        </Box>
      </SimpleForm>
    </Create>
  );
};

# Question Types Documentation

This AWS Learning Platform now supports 7 different question types to create engaging and diverse learning experiences.

## Question Types Overview

### 1. Multiple Choice (SELECT)
**Type:** `SELECT`
**Description:** Traditional multiple choice questions with multiple options where only one is correct.
**Best for:** Knowledge testing, concept verification
**Example:** "What does AWS stand for?"
- A) Amazon Web Services ✓
- B) Amazon Web System
- C) Amazon Web Storage

### 2. Fill in the Blank (ASSIST)
**Type:** `ASSIST`  
**Description:** Questions where users select from options to complete a sentence or phrase.
**Best for:** Terminology, completing definitions
**Example:** "Cloud computing provides ____ access to IT resources"
- on-demand ✓
- scheduled
- limited

### 3. True/False (TRUE_FALSE)
**Type:** `TRUE_FALSE`
**Description:** Simple true or false questions.
**Best for:** Quick concept verification, fact checking
**Example:** "Cloud computing eliminates the need for physical data centers completely."
- True
- False ✓

### 4. Drag & Drop Ordering (DRAG_DROP) 
**Type:** `DRAG_DROP`
**Description:** Users drag items to arrange them in the correct order.
**Best for:** Process steps, priority ordering, sequencing
**Example:** "Arrange these AWS Well-Architected pillars in order of priority:"
1. Security
2. Reliability  
3. Performance Efficiency
4. Cost Optimization

### 5. Text Input (TEXT_INPUT)
**Type:** `TEXT_INPUT`
**Description:** Users type their answer in a text field.
**Best for:** Definitions, acronym expansion, specific terminology
**Example:** "What does AWS stand for? (Type the full name)"
**Expected Answer:** "Amazon Web Services"

### 6. Image Selection (IMAGE_SELECT)
**Type:** `IMAGE_SELECT` 
**Description:** Users select from image-based options.
**Best for:** Architecture diagrams, service icons, visual identification
**Example:** "Which AWS service icon represents Amazon S3?"
- [S3 Icon] ✓
- [EC2 Icon]
- [Lambda Icon]

### 7. Listening Comprehension (LISTENING)
**Type:** `LISTENING`
**Description:** Audio-based questions with multiple choice answers.
**Best for:** Pronunciation, audio explanations, accessibility
**Example:** [Audio clip about EC2] "What service was described in the audio?"
- Amazon S3
- Amazon EC2 ✓
- AWS Lambda

## Creating Questions in Admin Panel

### Basic Information (All Types)
- **Question**: The main question text
- **Type**: Select from the dropdown menu
- **Lesson**: Choose which lesson this belongs to
- **Order**: Question sequence within the lesson
- **Hint** (Optional): Helpful guidance for users

### Type-Specific Fields

#### For LISTENING Questions
- **Audio URL**: Required MP3/audio file URL

#### For IMAGE_SELECT Questions  
- **Question Image URL**: Optional main question image
- **Option Images**: Required for each answer option

#### For TEXT_INPUT Questions
- **Correct Answer**: The expected text answer (case-insensitive matching)

#### For DRAG_DROP Questions
- **Order Position**: Each option needs a correct order number (1, 2, 3, etc.)

### Answer Options

All types except TEXT_INPUT use answer options:

- **Option Text**: The text for this choice
- **Correct Answer**: Mark which option(s) are correct
- **Image URL**: Optional image for this option
- **Audio URL**: Optional audio for this option  
- **Explanation**: Why this answer is correct/incorrect
- **Order** (DRAG_DROP only): Correct position in sequence

## Implementation Notes

### Database Schema
The system uses these key tables:
- `challenges`: Stores question data and type
- `challenge_options`: Stores answer choices and metadata
- `challenge_progress`: Tracks user completion

### New Fields Added
**challenges table:**
- `audioSrc`: For LISTENING questions
- `imageSrc`: For IMAGE_SELECT questions  
- `correctAnswer`: For TEXT_INPUT questions

**challenge_options table:**
- `order`: For DRAG_DROP sequencing
- `value`: For additional option metadata

### Validation Rules

1. **SELECT/ASSIST/TRUE_FALSE/IMAGE_SELECT/LISTENING**: Must have at least one correct option
2. **DRAG_DROP**: Must have unique order values (1 to N)
3. **TEXT_INPUT**: Must have correctAnswer field filled
4. **IMAGE_SELECT**: All options must have image URLs
5. **LISTENING**: Must have audio source URL

### Frontend Behavior

- **SELECT/ASSIST**: Traditional option selection
- **TRUE_FALSE**: Two-button choice (optimized layout)
- **DRAG_DROP**: Draggable interface with order checking
- **TEXT_INPUT**: Text input field with submit button  
- **IMAGE_SELECT**: Grid layout emphasizing images
- **LISTENING**: Audio player with answer options below

## Best Practices

### Question Writing
1. Keep questions clear and concise
2. Avoid ambiguous wording
3. Use consistent terminology
4. Provide helpful hints when appropriate

### Media Assets
1. Use high-quality images (recommended: 400x300px)
2. Optimize audio files for web (MP3, <5MB)
3. Ensure media URLs are reliable and accessible
4. Include alt text considerations for images

### Learning Design
1. Mix question types for engagement
2. Start with easier types (SELECT, TRUE_FALSE)
3. Use complex types (DRAG_DROP, TEXT_INPUT) for assessment
4. Group related concepts together

### Accessibility
1. LISTENING questions help audio learners
2. IMAGE_SELECT supports visual learners  
3. TEXT_INPUT accommodates different input preferences
4. All types support keyboard navigation

## API Endpoints

### Creating Questions
- `POST /api/challenges` - Create new question
- `POST /api/challengeOptions` - Add answer options

### Updating Questions  
- `PUT /api/challenges/{id}` - Update question
- `PUT /api/challengeOptions/{id}` - Update options

### Supported Fields
All question types support the full range of fields, with type-specific validation applied automatically.

---

*For technical implementation details, see the source code in `/app/lesson/challenge.tsx` and `/app/admin/challenges/components/ChallengeForm.tsx`*
# ✅ Admin Panel Testing Checklist

Use this checklist to verify all admin improvements are working correctly.

## 🎨 Visual & Theme Testing

- [ ] Admin panel opens at `/admin`
- [ ] AWS Orange (#FF9900) primary color displays correctly
- [ ] AWS Dark Blue (#232F3E) appears in header
- [ ] Lucide React icons display properly
- [ ] "AWS Cloud Academy Admin" title appears in header
- [ ] Sidebar shows correct navigation labels:
  - [ ] "AWS Certifications" (not "Courses")
  - [ ] "Units"
  - [ ] "Lessons"
  - [ ] "Questions" (not "Challenges")
  - [ ] "Answer Options" (not "Challenge Options")

## 📋 Questions Management Testing

### List View
- [ ] Navigate to "Questions" in sidebar
- [ ] Search bar is always visible
- [ ] Can search for questions by text
- [ ] Filter button works
- [ ] Can filter by lesson
- [ ] Can filter by question type
- [ ] "Add Question" button visible
- [ ] "Export" button works
- [ ] Type badges display (Multiple Choice / Fill in Blank)
- [ ] Lesson information shows correctly
- [ ] Order numbers display
- [ ] Can click on question to edit

### Create Question
- [ ] Click "Add Question" button
- [ ] Orange header displays "Add New Question"
- [ ] Blue info alert shows at top
- [ ] Question text input is multiline (3 rows)
- [ ] Type selector shows "Multiple Choice (recommended)" and "Fill in the Blank"
- [ ] Lesson dropdown is searchable
- [ ] Order field accepts numbers
- [ ] All helper text displays correctly
- [ ] Green success alert shows at bottom about next steps
- [ ] Can save new question
- [ ] Redirects to edit page after saving

### Edit Question (Tabbed Interface)
- [ ] Opens with question text in title
- [ ] Three tabs visible:
  - [ ] "Question Details"
  - [ ] "Answer Options"
  - [ ] "Preview & Test"

#### Tab 1: Question Details
- [ ] Orange "Question Information" header displays
- [ ] Question text is editable (multiline)
- [ ] Type selector works
- [ ] Lesson selector is searchable
- [ ] Order field accepts numbers
- [ ] All helper text displays
- [ ] Can save changes

#### Tab 2: Answer Options ⭐ MOST IMPORTANT
- [ ] Orange "Answer Options" header displays
- [ ] Blue info alert explains purpose
- [ ] Table shows all existing answers
- [ ] Answer text column displays
- [ ] Status shows green "✓ Correct" or gray "Wrong" badges
- [ ] Image URL column shows (even if empty)
- [ ] Audio URL column shows (even if empty)
- [ ] Edit button works for each answer
- [ ] Delete button works for each answer
- [ ] "Add New Answer Option" button displays below table
- [ ] Can click to add new answer and it opens create form
- [ ] After adding answer, returns to this tab

#### Tab 3: Preview & Test
- [ ] Orange header displays
- [ ] Warning alert shows "Preview feature coming soon"
- [ ] Testing tips list displays

## 📝 Answer Options Management Testing

### List View
- [ ] Navigate to "Answer Options" in sidebar
- [ ] Search bar works (search by answer text)
- [ ] Filter button visible
- [ ] Can filter by question
- [ ] Can filter to show only correct answers
- [ ] "Add Answer Option" button works
- [ ] Export button works
- [ ] Status badges show (green "✓ Correct" or gray "Wrong")
- [ ] Question preview shows (truncated)
- [ ] Media indicators show (📷 Image, 🔊 Audio icons)
- [ ] Can click to edit answer

### Create Answer
- [ ] Click "Add Answer Option"
- [ ] Orange header shows "Add Answer Option"
- [ ] Blue info alert displays
- [ ] Question dropdown is searchable (required field)
- [ ] Answer text input is multiline (2 rows)
- [ ] "✓ This is the CORRECT answer" toggle works
- [ ] Toggle has descriptive helper text
- [ ] Image URL field optional
- [ ] Audio URL field optional
- [ ] Yellow warning alert at bottom shows tip
- [ ] Can save new answer
- [ ] Redirects to edit page after save

### Edit Answer
- [ ] Title shows answer text and status badge
- [ ] Orange header displays
- [ ] Question field shows (disabled/read-only)
- [ ] Answer text is editable (multiline)
- [ ] Correct answer toggle has yellow background highlight
- [ ] Toggle shows warning about "only ONE"
- [ ] Image URL field works
- [ ] Audio URL field works
- [ ] Blue preview box shows at bottom
- [ ] Preview displays "Students will see:" with answer text
- [ ] Info alert at bottom about quality check
- [ ] Can save changes
- [ ] Toggle changes reflected immediately

## 🎓 Courses Management Testing

### List View
- [ ] Navigate to "AWS Certifications"
- [ ] Title shows "AWS Certifications"
- [ ] "Add Certification" button works
- [ ] Export button works
- [ ] Badge column shows avatars or images
- [ ] Certification name displays in bold
- [ ] Badge path shows as a chip
- [ ] Can click to edit course

## 🔄 Workflow Testing (End-to-End)

### Complete Question Creation Workflow
1. [ ] Start: Go to Questions → Add Question
2. [ ] Fill in question text (e.g., "What does S3 stand for?")
3. [ ] Select "Multiple Choice"
4. [ ] Choose a lesson from dropdown
5. [ ] Set order to 1
6. [ ] Click Save
7. [ ] **Verify redirect to edit page**
8. [ ] Click "Answer Options" tab
9. [ ] **Verify empty table shows**
10. [ ] Click "Add New Answer Option"
11. [ ] Fill answer text: "Simple Storage Service"
12. [ ] **Toggle ON "This is CORRECT"**
13. [ ] Save
14. [ ] **Verify returns to Answer Options tab**
15. [ ] **Verify green "✓ Correct" badge shows**
16. [ ] Click "Add New Answer Option" again
17. [ ] Fill answer text: "Secure Storage Service"
18. [ ] **Leave toggle OFF**
19. [ ] Save
20. [ ] **Verify gray "Wrong" badge shows**
21. [ ] Repeat for 2 more wrong answers
22. [ ] **Final check: See 4 answers in table, 1 green, 3 gray**

### Edit Existing Question
1. [ ] Go to Questions list
2. [ ] Search for a question
3. [ ] Click to edit
4. [ ] Change question text
5. [ ] Save
6. [ ] Go to Answer Options tab
7. [ ] Edit an answer
8. [ ] Change correct status
9. [ ] Save
10. [ ] **Verify badge color changes**

### Filter and Search Testing
1. [ ] Go to Questions
2. [ ] Type in search bar
3. [ ] **Verify results filter instantly**
4. [ ] Clear search
5. [ ] Click Filter button
6. [ ] Select a lesson
7. [ ] **Verify only questions from that lesson show**
8. [ ] Select question type
9. [ ] **Verify only that type shows**

## 🎨 Responsive Design Testing

- [ ] Resize browser window to tablet size
- [ ] Verify layout adapts
- [ ] Check mobile sidebar toggles correctly
- [ ] Verify all tables are scrollable on small screens
- [ ] Check buttons remain accessible

## ⚡ Performance Testing

- [ ] List with 25+ questions loads quickly
- [ ] Filtering responds instantly
- [ ] Tab switching is smooth
- [ ] No console errors
- [ ] No layout shifts on load

## 📱 Browser Testing

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)

## 🐛 Bug Checks

- [ ] No TypeScript errors in console
- [ ] No React warnings
- [ ] All images load
- [ ] No broken links
- [ ] All tooltips/helper text display
- [ ] Form validation works (required fields)
- [ ] Can't save question without lesson
- [ ] Can't save answer without question

## 📊 Data Integrity Testing

- [ ] Create question with 4 answers
- [ ] Mark 1 as correct
- [ ] Test in actual lesson (/learn)
- [ ] Verify correct answer validates properly
- [ ] Wrong answers marked incorrect
- [ ] Points awarded correctly

## 🎉 Final Verification

- [ ] Read [Admin Guide](./guide.md)
- [ ] Review [Quick Reference](./quick-reference.md)
- [ ] Test complete workflow 3 times
- [ ] Train another person to use it
- [ ] Get feedback on ease of use

---

## 🚨 Issues Found?

Document any issues here:

### Issue 1
- **What**: [Description]
- **Steps to reproduce**: [Steps]
- **Expected**: [What should happen]
- **Actual**: [What happened]
- **Fix**: [How to fix]

### Issue 2
- **What**: 
- **Steps to reproduce**: 
- **Expected**: 
- **Actual**: 
- **Fix**: 

---

## ✅ Completion

- [ ] All tests passed
- [ ] No critical issues found
- [ ] Documentation reviewed
- [ ] Team trained on new interface
- [ ] Ready for production content creation!

**Tested by**: ________________
**Date**: ________________
**Version**: Admin Panel v2.0 (October 2025)

---

*Save this file and check off items as you test!*

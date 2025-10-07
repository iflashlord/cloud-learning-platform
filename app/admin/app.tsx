"use client";

import { Admin, Resource, defaultTheme } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { BookOpen, GraduationCap, FileQuestion, CheckCircle2, ListChecks } from "lucide-react";

import { CourseList } from "./course/list";
import { CourseEdit } from "./course/edit";
import { CourseCreate } from "./course/create";
import { CourseShow } from "./course/show";

import { UnitList } from "./unit/list";
import { UnitEdit } from "./unit/edit";
import { UnitCreate } from "./unit/create";

import { LessonList } from "./lesson/list";
import { LessonEdit } from "./lesson/edit";
import { LessonCreate } from "./lesson/create";
import { LessonShow } from "./lesson/show";

import { ChallengeList } from "./challenge/list";
import { ChallengeEdit } from "./challenge/edit";
import { ChallengeCreate } from "./challenge/create";

import { ChallengeOptionList } from "./challengeOption/list";
import { ChallengeOptionEdit } from "./challengeOption/edit";
import { ChallengeOptionCreate } from "./challengeOption/create";

const dataProvider = simpleRestProvider("/api");

// Custom AWS-themed admin
const awsTheme = {
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: {
      main: '#FF9900', // AWS Orange
    },
    secondary: {
      main: '#232F3E', // AWS Dark Blue
    },
  },
  components: {
    ...defaultTheme.components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#232F3E',
        },
      },
    },
  },
};

const App = () => {
  return (
    <Admin 
      dataProvider={dataProvider}
      theme={awsTheme}
      title="AWS Cloud Academy Admin"
    >
      <Resource
        name="courses"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
        show={CourseShow}
        recordRepresentation="title"
        icon={GraduationCap}
        options={{ label: "AWS Certifications" }}
      />
      <Resource
        name="units"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
        recordRepresentation="title"
        icon={BookOpen}
        options={{ label: "Units" }}
      />
      <Resource
        name="lessons"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
        show={LessonShow}
        recordRepresentation="title"
        icon={ListChecks}
        options={{ label: "Lessons" }}
      />
      <Resource
        name="challenges"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
        recordRepresentation="question"
        icon={FileQuestion}
        options={{ label: "Questions" }}
      />
      <Resource
        name="challengeOptions"
        list={ChallengeOptionList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
        recordRepresentation="text"
        icon={CheckCircle2}
        options={{ label: "Answer Options" }}
      />
    </Admin>
  );
};

export default App;

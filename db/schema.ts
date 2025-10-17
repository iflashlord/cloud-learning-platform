import { relations } from "drizzle-orm"
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core"

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
  category: text("category").notNull().default("General"),
  description: text("description"),
  level: text("level").default("Beginner"), // Beginner, Intermediate, Advanced
  duration: text("duration"), // e.g., "2-3 hours"
  themeConfig: jsonb("theme_config").$type<{
    themeName: string
    colors: {
      primary: Record<string, string>
      success: Record<string, string>
      error: Record<string, string>
      info: Record<string, string>
      neutral: Record<string, string>
    }
  }>(),
})

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
}))

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // Unit 1
  description: text("description").notNull(), // Learn the basics of spanish
  courseId: integer("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  order: integer("order").notNull(),
})

export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}))

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit_id")
    .references(() => units.id, { onDelete: "cascade" })
    .notNull(),
  order: integer("order").notNull(),
})

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges),
}))

export const challengesEnum = pgEnum("type", [
  "SELECT", // Multiple choice question
  "ASSIST", // Fill in the blank/matching
  "TRUE_FALSE", // True/False question
  "DRAG_DROP", // Drag and drop ordering
  "TEXT_INPUT", // Free text input
  "IMAGE_SELECT", // Select from images
  "LISTENING", // Audio-based question
  "SPEECH_INPUT", // Speech recognition input
  "VIDEO", // Video-based question
])

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id")
    .references(() => lessons.id, { onDelete: "cascade" })
    .notNull(),
  type: challengesEnum("type").notNull(),
  question: text("question").notNull(),
  hint: text("hint"), // Optional hint for users
  order: integer("order").notNull(),
  audioSrc: text("audio_src"), // For listening comprehension questions
  imageSrc: text("image_src"), // For image-based questions
  videoSrc: text("video_src"), // For video-based questions
  correctAnswer: text("correct_answer"), // For text input questions
})

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}))

export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" })
    .notNull(),
  text: text("text").notNull(),
  correct: boolean("correct").notNull(),
  imageSrc: text("image_src"),
  audioSrc: text("audio_src"),
  guide: text("guide"), // Optional explanation why this answer is correct/incorrect
  order: integer("order").default(0), // For drag-drop ordering
  value: text("value"), // For text input expected answers
})

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeOptions.challengeId],
    references: [challenges.id],
  }),
}))

export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" })
    .notNull(),
  completed: boolean("completed").notNull().default(false),
})

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeProgress.challengeId],
    references: [challenges.id],
  }),
}))

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeCourseId: integer("active_course_id").references(() => courses.id, { onDelete: "cascade" }),
  hearts: integer("hearts").notNull().default(5),
  points: integer("points").notNull().default(0),
})

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}))

export const userSubscription = pgTable("user_subscription", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
  stripePriceId: text("stripe_price_id").notNull(),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
})

export const userSettings = pgTable("user_settings", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  audioEnabled: boolean("audio_enabled").notNull().default(true),
  masterVolume: integer("master_volume").notNull().default(75), // 0-100
  soundEffectsVolume: integer("sound_effects_volume").notNull().default(75), // 0-100
  lessonsAudioVolume: integer("lessons_audio_volume").notNull().default(75), // 0-100
  autoPlayAudio: boolean("auto_play_audio").notNull().default(true),
  autoPlayVideo: boolean("auto_play_video").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  userProgress: one(userProgress, {
    fields: [userSettings.userId],
    references: [userProgress.userId],
  }),
}))

import { relations } from "drizzle-orm/relations";
import { challenges, challenge_progress, units, lessons, courses, user_progress, chests, challenge_options, chest_progress } from "./schema";

export const challenge_progressRelations = relations(challenge_progress, ({one}) => ({
	challenge: one(challenges, {
		fields: [challenge_progress.challenge_id],
		references: [challenges.id]
	}),
}));

export const challengesRelations = relations(challenges, ({one, many}) => ({
	challenge_progresses: many(challenge_progress),
	lesson: one(lessons, {
		fields: [challenges.lesson_id],
		references: [lessons.id]
	}),
	chest: one(chests, {
		fields: [challenges.chest_id],
		references: [chests.id]
	}),
	challenge_options: many(challenge_options),
}));

export const lessonsRelations = relations(lessons, ({one, many}) => ({
	unit: one(units, {
		fields: [lessons.unit_id],
		references: [units.id]
	}),
	challenges: many(challenges),
}));

export const unitsRelations = relations(units, ({one, many}) => ({
	lessons: many(lessons),
	course: one(courses, {
		fields: [units.course_id],
		references: [courses.id]
	}),
	chests: many(chests),
}));

export const coursesRelations = relations(courses, ({many}) => ({
	units: many(units),
	user_progresses: many(user_progress),
}));

export const user_progressRelations = relations(user_progress, ({one}) => ({
	course: one(courses, {
		fields: [user_progress.active_course_id],
		references: [courses.id]
	}),
}));

export const chestsRelations = relations(chests, ({one, many}) => ({
	challenges: many(challenges),
	unit: one(units, {
		fields: [chests.unit_id],
		references: [units.id]
	}),
	chest_progresses: many(chest_progress),
}));

export const challenge_optionsRelations = relations(challenge_options, ({one}) => ({
	challenge: one(challenges, {
		fields: [challenge_options.challenge_id],
		references: [challenges.id]
	}),
}));

export const chest_progressRelations = relations(chest_progress, ({one}) => ({
	chest: one(chests, {
		fields: [chest_progress.chest_id],
		references: [chests.id]
	}),
}));
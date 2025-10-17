import { pgTable, foreignKey, pgEnum, serial, text, integer, boolean, jsonb, unique, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const chest_type = pgEnum("chest_type", ['BRONZE', 'SILVER', 'GOLD', 'SPECIAL'])
export const type = pgEnum("type", ['SELECT', 'ASSIST', 'TRUE_FALSE', 'DRAG_DROP', 'TEXT_INPUT', 'IMAGE_SELECT', 'LISTENING', 'SPEECH_INPUT', 'VIDEO'])


export const challenge_progress = pgTable("challenge_progress", {
	id: serial("id").primaryKey().notNull(),
	user_id: text("user_id").notNull(),
	challenge_id: integer("challenge_id").notNull().references(() => challenges.id, { onDelete: "cascade" } ),
	completed: boolean("completed").default(false).notNull(),
});

export const lessons = pgTable("lessons", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	unit_id: integer("unit_id").notNull().references(() => units.id, { onDelete: "cascade" } ),
	order: integer("order").notNull(),
});

export const units = pgTable("units", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	course_id: integer("course_id").notNull().references(() => courses.id, { onDelete: "cascade" } ),
	order: integer("order").notNull(),
});

export const user_progress = pgTable("user_progress", {
	user_id: text("user_id").primaryKey().notNull(),
	user_name: text("user_name").default('User').notNull(),
	user_image_src: text("user_image_src").default('/mascot.svg').notNull(),
	active_course_id: integer("active_course_id").references(() => courses.id, { onDelete: "cascade" } ),
	hearts: integer("hearts").default(5).notNull(),
	points: integer("points").default(0).notNull(),
});

export const challenges = pgTable("challenges", {
	id: serial("id").primaryKey().notNull(),
	lesson_id: integer("lesson_id").references(() => lessons.id, { onDelete: "cascade" } ),
	type: type("type").notNull(),
	question: text("question").notNull(),
	order: integer("order").notNull(),
	hint: text("hint"),
	audio_src: text("audio_src"),
	image_src: text("image_src"),
	correct_answer: text("correct_answer"),
	video_src: text("video_src"),
	chest_id: integer("chest_id").references(() => chests.id, { onDelete: "cascade" } ),
});

export const courses = pgTable("courses", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	image_src: text("image_src").notNull(),
	theme_config: jsonb("theme_config"),
	category: text("category").default('General').notNull(),
	description: text("description"),
	level: text("level").default('Beginner'),
	duration: text("duration"),
});

export const user_subscription = pgTable("user_subscription", {
	id: serial("id").primaryKey().notNull(),
	user_id: text("user_id").notNull(),
	stripe_customer_id: text("stripe_customer_id").notNull(),
	stripe_subscription_id: text("stripe_subscription_id").notNull(),
	stripe_price_id: text("stripe_price_id").notNull(),
	stripe_current_period_end: timestamp("stripe_current_period_end", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		user_subscription_user_id_unique: unique("user_subscription_user_id_unique").on(table.user_id),
		user_subscription_stripe_customer_id_unique: unique("user_subscription_stripe_customer_id_unique").on(table.stripe_customer_id),
		user_subscription_stripe_subscription_id_unique: unique("user_subscription_stripe_subscription_id_unique").on(table.stripe_subscription_id),
	}
});

export const challenge_options = pgTable("challenge_options", {
	id: serial("id").primaryKey().notNull(),
	challenge_id: integer("challenge_id").notNull().references(() => challenges.id, { onDelete: "cascade" } ),
	text: text("text").notNull(),
	correct: boolean("correct").notNull(),
	image_src: text("image_src"),
	audio_src: text("audio_src"),
	guide: text("guide"),
	order: integer("order").default(0),
	value: text("value"),
});

export const user_settings = pgTable("user_settings", {
	id: serial("id").primaryKey().notNull(),
	user_id: text("user_id").notNull(),
	audio_enabled: boolean("audio_enabled").default(true).notNull(),
	master_volume: integer("master_volume").default(75).notNull(),
	sound_effects_volume: integer("sound_effects_volume").default(75).notNull(),
	lessons_audio_volume: integer("lessons_audio_volume").default(75).notNull(),
	auto_play_audio: boolean("auto_play_audio").default(true).notNull(),
	auto_play_video: boolean("auto_play_video").default(false).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		user_settings_user_id_unique: unique("user_settings_user_id_unique").on(table.user_id),
	}
});

export const chests = pgTable("chests", {
	id: serial("id").primaryKey().notNull(),
	unit_id: integer("unit_id").notNull().references(() => units.id, { onDelete: "cascade" } ),
	type: chest_type("type").notNull(),
	position: integer("position").notNull(),
	title: text("title").notNull(),
	description: text("description"),
	xp_reward: integer("xp_reward").default(50).notNull(),
	hearts_reward: integer("hearts_reward").default(0),
	has_challenge: boolean("has_challenge").default(false).notNull(),
	image_src: text("image_src"),
	unlocked_at: integer("unlocked_at"),
});

export const chest_progress = pgTable("chest_progress", {
	id: serial("id").primaryKey().notNull(),
	user_id: text("user_id").notNull(),
	chest_id: integer("chest_id").notNull().references(() => chests.id, { onDelete: "cascade" } ),
	opened: boolean("opened").default(false).notNull(),
	completed_at: timestamp("completed_at", { mode: 'string' }),
});
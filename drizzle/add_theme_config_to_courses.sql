import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";

-- Add theme_config column to courses table
ALTER TABLE courses ADD COLUMN theme_config jsonb DEFAULT NULL;

-- Update with default theme configurations
UPDATE courses SET theme_config = jsonb_build_object(
  'themeName', 'default',
  'colors', jsonb_build_object(
    'primary', jsonb_build_object('500', '#f97316'),
    'success', jsonb_build_object('500', '#22c55e'),
    'error', jsonb_build_object('500', '#ef4444'),
    'info', jsonb_build_object('500', '#3b82f6'),
    'neutral', jsonb_build_object('500', '#6b7280')
  )
) WHERE theme_config IS NULL;
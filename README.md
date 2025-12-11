-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  country TEXT NOT NULL,
  title TEXT NOT NULL,
  level TEXT NOT NULL,
  description TEXT NOT NULL,
  lessons_count INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  audio_url TEXT,
  order_index INTEGER NOT NULL,
  duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_progress table
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  score INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses (public read)
CREATE POLICY "Anyone can view courses"
ON public.courses FOR SELECT
USING (true);

-- RLS Policies for lessons (public read)
CREATE POLICY "Anyone can view lessons"
ON public.lessons FOR SELECT
USING (true);

-- RLS Policies for user_progress
CREATE POLICY "Users can view own progress"
ON public.user_progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
ON public.user_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
ON public.user_progress FOR UPDATE
USING (auth.uid() = user_id);

-- Add update triggers
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_lessons_updated_at
BEFORE UPDATE ON public.lessons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_user_progress_updated_at
BEFORE UPDATE ON public.user_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

-- Insert sample courses
INSERT INTO public.courses (country, title, level, description, lessons_count) VALUES
('Costa Rica', 'Essential Spanish for Costa Rica', 'Beginner', 'Learn practical phrases for travel, dining, and exploring Costa Rica''s natural wonders.', 12),
('Mexico', 'Mexican Spanish Basics', 'Beginner', 'Master everyday conversations and cultural insights for traveling through Mexico.', 15),
('Spain', 'Spanish for Spain', 'Intermediate', 'Navigate cities, order tapas, and connect with locals in Spain.', 18);

-- Insert sample lessons for Costa Rica course
INSERT INTO public.lessons (course_id, title, content, order_index, duration_minutes)
SELECT 
  c.id,
  'Greetings and Basic Phrases',
  'Learn how to greet people in Costa Rica with "Pura Vida" and other essential phrases.',
  1,
  5
FROM public.courses c WHERE c.country = 'Costa Rica';

INSERT INTO public.lessons (course_id, title, content, order_index, duration_minutes)
SELECT 
  c.id,
  'Ordering Food',
  'Master the art of ordering traditional Costa Rican dishes like Gallo Pinto and Casado.',
  2,
  7
FROM public.courses c WHERE c.country = 'Costa Rica';

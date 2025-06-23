
-- Créer une table pour les évaluations si elle n'existe pas déjà
CREATE TABLE IF NOT EXISTS public.evaluations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  intern_id UUID REFERENCES public.interns(id) ON DELETE CASCADE,
  grade INTEGER NOT NULL CHECK (grade >= 0 AND grade <= 20),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ajouter des colonnes manquantes aux tables existantes si nécessaire
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.interns 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Activer RLS sur toutes les tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_interns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;

-- Créer les politiques RLS pour les projets
CREATE POLICY "Users can view their own projects" 
  ON public.projects 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects" 
  ON public.projects 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" 
  ON public.projects 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" 
  ON public.projects 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Créer les politiques RLS pour les stagiaires
CREATE POLICY "Users can view their own interns" 
  ON public.interns 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own interns" 
  ON public.interns 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interns" 
  ON public.interns 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interns" 
  ON public.interns 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Créer les politiques RLS pour les tâches
CREATE POLICY "Users can view tasks for their projects" 
  ON public.tasks 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = tasks.project_id 
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can create tasks for their projects" 
  ON public.tasks 
  FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = tasks.project_id 
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update tasks for their projects" 
  ON public.tasks 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = tasks.project_id 
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete tasks for their projects" 
  ON public.tasks 
  FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = tasks.project_id 
    AND projects.user_id = auth.uid()
  ));

-- Créer les politiques RLS pour les évaluations
CREATE POLICY "Users can view evaluations for their interns" 
  ON public.evaluations 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.interns 
    WHERE interns.id = evaluations.intern_id 
    AND interns.user_id = auth.uid()
  ));

CREATE POLICY "Users can create evaluations for their interns" 
  ON public.evaluations 
  FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.interns 
    WHERE interns.id = evaluations.intern_id 
    AND interns.user_id = auth.uid()
  ));

CREATE POLICY "Users can update evaluations for their interns" 
  ON public.evaluations 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.interns 
    WHERE interns.id = evaluations.intern_id 
    AND interns.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete evaluations for their interns" 
  ON public.evaluations 
  FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM public.interns 
    WHERE interns.id = evaluations.intern_id 
    AND interns.user_id = auth.uid()
  ));

-- Politiques pour project_interns
CREATE POLICY "Users can view project_interns for their projects" 
  ON public.project_interns 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = project_interns.project_id 
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can create project_interns for their projects" 
  ON public.project_interns 
  FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = project_interns.project_id 
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update project_interns for their projects" 
  ON public.project_interns 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = project_interns.project_id 
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete project_interns for their projects" 
  ON public.project_interns 
  FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = project_interns.project_id 
    AND projects.user_id = auth.uid()
  ));

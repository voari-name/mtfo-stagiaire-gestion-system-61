-- Create profiles table to store user profile data
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text DEFAULT '',
  last_name text DEFAULT '',
  phone text DEFAULT '',
  position text DEFAULT '',
  photo_url text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true);

-- Storage RLS policies
CREATE POLICY "Users can upload their own profile photos"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'profile-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can update their own profile photos"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'profile-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete their own profile photos"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'profile-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Anyone can view profile photos"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'profile-photos');

-- Insert profile for existing user
INSERT INTO public.profiles (user_id, first_name, last_name, phone, position)
SELECT id, 'Olivier', 'RAHAJANIAINA', '038 51 621 07', 'Administrateur'
FROM auth.users
WHERE email = 'olivierrahajaniaina9@gmail.com'
ON CONFLICT (user_id) DO NOTHING;
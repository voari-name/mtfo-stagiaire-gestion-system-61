-- Supprimer la politique conflictuelle "Allow all operations" sur la table interns
DROP POLICY IF EXISTS "Allow all operations on interns" ON interns;

-- Nous gardons seulement les politiques spécifiques par utilisateur qui sont correctes
-- Les politiques existantes "Users can view/create/update/delete their own interns" restent actives
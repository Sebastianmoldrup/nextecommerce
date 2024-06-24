import { createBrowserClient } from '@supabase/ssr';

// Client
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

// Get Products
export const getProducts = async () => {
  const db = createClient();
  const { data, error } = await db.from('products').select();
  return { data, error };
};

// Upsert
export const upsert = async (
  table: string,
  { id, name }: { id: number; name: string }
) => {
  const db = createClient();
  const { data, error } = await db
    .from('sneakers')
    .upsert({ id: 1, name: 'Albania' })
    .select();
  return { data, error };
};

// Update
export const update = async (table: string, id: number) => {
  const db = createClient();
  const { error } = await db
    .from('products')
    .update({ name: 'Australia' })
    .eq('id', 1);
  return { error };
};

// Delete
export const remove = async (table: string, id: number) => {
  const db = createClient();
  const response = await db.from('products').delete().eq('id', 1);
  return response;
};

// GetSession

// Login
export const login = async (email: string, password: string) => {
  const db = createClient();
  const { data, error } = await db.auth.signInWithPassword({
    email: email,
    password: password,
  });
};

// Logout
export const logout = async () => {
  const db = createClient();
  const { error } = await db.auth.signOut();
  return error;
};

// Create Account
export const createAccount = async (email: string, password: string) => {
  const db = createClient();
  const { data, error } = await db.auth.signUp({
    email: email,
    password: password,
  });
  return { data, error };
};

// Update Password
export const updatePassword = async (email: string, password: string) => {
  const db = createClient();
  const { data, error } = await db.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://example.com/update-password',
  });
};

// Recover Password
export const recoverPassword = async (password: string) => {
  const db = createClient();
  const { data, error } = await db.auth.updateUser({
    password: password,
  });
  return { data, error };
};

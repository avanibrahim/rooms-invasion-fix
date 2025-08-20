import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://ujoezhzvqsrspkphlomo.supabase.co', // Ganti dengan Project URL kamu
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqb2V6aHp2cXNyc3BrcGhsb21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMzU0ODQsImV4cCI6MjA2NTgxMTQ4NH0.5aoMNmh2dDiqBZeJw0BN719SL-6czd2ZT9Hai1jgZsg' // Ganti dengan anon/public key dari screenshot tadi
);

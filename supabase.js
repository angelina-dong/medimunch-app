import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imcwtfmjflebvccsuyxg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltY3d0Zm1qZmxlYnZjY3N1eXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE3NTk2MTEsImV4cCI6MjAxNzMzNTYxMX0.JUfyBV-YzlxvaO9-zEc2tjZxfZLJthVjrpYOaRRRo9M';

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
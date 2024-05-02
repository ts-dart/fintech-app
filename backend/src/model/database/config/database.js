const { createClient } = require('@supabase/supabase-js');

createClient(
  'https://djxfqwkvdszmvybktbmc.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqeGZxd2t2ZHN6bXZ5Ymt0Ym1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgxNzg1ODAsImV4cCI6MjAwMzc1NDU4MH0.jvuvLb5I9HyMS90dF5dUEEle23Oc71aCiJwl9cFx5wk'
);

const config = {
  username: 'postgres',
  password: 'edusanthiago753951',
  host: 'db.djxfqwkvdszmvybktbmc.supabase.co',
  dialect: 'postgres',
  port: 5432,
}

module.exports = config;

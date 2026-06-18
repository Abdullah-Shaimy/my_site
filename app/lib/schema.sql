-- ====================================================================
-- Private Mail Dashboard Database Setup
-- Run this SQL in your Supabase SQL Editor to set up tables and RPCs
-- ====================================================================

-- 1. Create the Mail Access table
CREATE TABLE IF NOT EXISTS mail_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_key TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on mail_access
ALTER TABLE mail_access ENABLE ROW LEVEL SECURITY;

-- 2. Create the Mail Logs table (for rate limiting)
CREATE TABLE IF NOT EXISTS mail_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on mail_logs
ALTER TABLE mail_logs ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts on mail_logs (needed to log email sends from Server Actions using anon client)
CREATE POLICY "Allow anonymous insert" ON mail_logs 
  FOR INSERT TO anon 
  WITH CHECK (true);

-- Disallow standard select/update/delete for anon on both tables to prevent data leaks
CREATE POLICY "Disallow select for anon" ON mail_access FOR SELECT TO anon USING (false);
CREATE POLICY "Disallow select for anon" ON mail_logs FOR SELECT TO anon USING (false);

-- 3. Create a secure verification function (RPC)
-- This allows checking if a key matches without exposing the access_key column
CREATE OR REPLACE FUNCTION verify_mail_access_key(input_key TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM mail_access WHERE access_key = input_key
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute access to the anon and authenticated roles
GRANT EXECUTE ON FUNCTION verify_mail_access_key(TEXT) TO anon, authenticated;

-- 4. Create a secure rate limiting check function (RPC)
-- This counts email logs in the last hour for a specific hashed IP without exposing logs to SELECT
CREATE OR REPLACE FUNCTION check_mail_rate_limit(input_ip_hash TEXT)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT count(*)::integer
    FROM mail_logs
    WHERE ip_hash = input_ip_hash
      AND sent_at > now() - interval '1 hour'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute access to the anon and authenticated roles
GRANT EXECUTE ON FUNCTION check_mail_rate_limit(TEXT) TO anon, authenticated;

-- ====================================================================
-- INSERT INITIAL SEED KEY
-- Replace 'my-super-secret-key-123' with your desired access key.
-- ====================================================================
INSERT INTO mail_access (access_key)
VALUES ('my-super-secret-key-123')
ON CONFLICT (access_key) DO NOTHING;

-- ====================================================================
-- Private Mail Dashboard Database Setup
-- Run this SQL in your Supabase SQL Editor to set up tables and RPCs
-- ====================================================================

-- 1. Create the Mail Access table
CREATE TABLE IF NOT EXISTS mail_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_key TEXT UNIQUE NOT NULL,
  sender_email TEXT UNIQUE NOT NULL,
  templates JSONB NOT NULL DEFAULT '[]'::jsonb,
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

-- 4. Create a secure retrieval function to get sender email and templates
CREATE OR REPLACE FUNCTION get_mail_sender_info(input_key TEXT)
RETURNS TABLE (
  sender_email TEXT,
  templates JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT ma.sender_email, ma.templates
  FROM mail_access ma
  WHERE ma.access_key = input_key;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute access to the anon and authenticated roles
GRANT EXECUTE ON FUNCTION get_mail_sender_info(TEXT) TO anon, authenticated;

-- 5. Create a secure rate limiting check function (RPC)
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
-- INSERT INITIAL SEED KEYS & TEMPLATES
-- ====================================================================

-- Seed primary sender 'dev@abdullahshaimy.lk'
INSERT INTO mail_access (access_key, sender_email, templates)
VALUES (
  'abdullahshaimy-dev-2009-mail-access',
  'dev@abdullahshaimy.lk',
  '[
    {
      "title": "Connection Diagnostic Test",
      "description": "automated system diagnostic test to verify...",
      "subject": "Connection Diagnostic Test",
      "body": "Hi Abdullah,\n\nThis is an automated system diagnostic test to verify the secure email delivery pathway.\n\nSender: dev@abdullahshaimy.lk\nStatus: Secure / Fully Operational."
    },
    {
      "title": "Portfolio Update Notification",
      "description": "Your portfolio website contact and email...",
      "subject": "Portfolio Update Notification",
      "body": "Hi Abdullah,\n\nYour portfolio website contact and email components have been successfully configured with production settings.\n\nAll DNS records (SPF, DKIM, DMARC) are fully aligned."
    },
    {
      "title": "Scheduled Server Maintenance Alert",
      "description": "scheduled maintenance to deploy OS patches...",
      "subject": "Scheduled Server Maintenance Alert",
      "body": "Hi Abdullah,\n\nPlease be informed that the primary API routing and web servers will undergo scheduled maintenance to deploy OS patches.\n\nDate: Tomorrow\nDuration: 30 minutes (2:00 AM - 2:30 AM UTC)\nExpected Impact: Temporary routing latency."
    },
    {
      "title": "Project Discussion Follow-up",
      "description": "Roadmap proposal and schedule a quick review...",
      "subject": "Project Discussion Follow-up",
      "body": "Hi [Name],\n\nThanks for taking the time to connect today. I’ve summarized our initial ideas and drafted a roadmap proposal for your project.\n\nLet me know if this works for you, and we can schedule a quick review call to align on details.\n\nBest regards,\nAbdullah Shaimy"
    }
  ]'::jsonb
)
ON CONFLICT (sender_email) DO UPDATE 
SET access_key = EXCLUDED.access_key,
    templates = EXCLUDED.templates;

-- Seed secondary sender 'learn@abdullahshaimy.lk'
INSERT INTO mail_access (access_key, sender_email, templates)
VALUES (
  'abdullahshaimy-learn-2009-mail-access',
  'learn@abdullahshaimy.lk',
  '[
    {
      "title": "Course Registration Confirmation",
      "description": "automated confirmation for course registration...",
      "subject": "Registration Confirmed - Abdullah Shaimy Learning Portal",
      "body": "Hi Student,\n\nWelcome to the class! Your registration for the upcoming web development bootcamp has been confirmed.\n\nYou can access your class schedule, material, and student dashboard through the link below.\n\nBest regards,\nAbdullah Shaimy"
    },
    {
      "title": "Weekly Office Hours Schedule",
      "description": "Weekly schedule and join link for learners...",
      "subject": "Upcoming Weekly Q&A Session Schedule",
      "body": "Hi Student,\n\nThis is a reminder for our weekly live Q&A session.\n\nDate: Saturday\nTime: 4:00 PM UTC\nJoin Link: zoom.us/meeting-id-placeholder\n\nBring all your coding questions!"
    },
    {
      "title": "Feedback on Code Submission",
      "description": "Template to provide assessment feedback...",
      "subject": "Project Assessment & Feedback",
      "body": "Hi Student,\n\nI have reviewed your latest code submission. Great job on structuring clean components!\n\nHere are some minor refactoring tips:\n- Keep functions focused and small.\n- Clean up console.logs before production.\n\nHappy coding!"
    }
  ]'::jsonb
)
ON CONFLICT (sender_email) DO UPDATE 
SET access_key = EXCLUDED.access_key,
    templates = EXCLUDED.templates;

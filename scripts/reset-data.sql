-- Run only against the intended Issue Tracker database and schema.
BEGIN;
TRUNCATE TABLE "Issue", "accounts", "sessions", "users", "verificationtokens";
COMMIT;

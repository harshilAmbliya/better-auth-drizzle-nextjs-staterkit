-- Convert email_verified from timestamp to boolean
-- First, drop NOT NULL constraint if it exists (to allow type conversion)
ALTER TABLE "users" ALTER COLUMN "email_verified" DROP NOT NULL;

-- Change column type from timestamp to boolean
-- Convert: if timestamp is not null, set to true, else false
ALTER TABLE "users" ALTER COLUMN "email_verified" TYPE boolean USING (CASE WHEN "email_verified" IS NOT NULL THEN true ELSE false END);

-- Set default value and NOT NULL constraint
ALTER TABLE "users" ALTER COLUMN "email_verified" SET DEFAULT false;
ALTER TABLE "users" ALTER COLUMN "email_verified" SET NOT NULL;
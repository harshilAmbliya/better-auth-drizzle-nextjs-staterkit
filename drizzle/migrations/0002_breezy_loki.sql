-- Drop foreign key constraints first
DO $$ BEGIN
 IF EXISTS (
   SELECT 1 FROM pg_constraint WHERE conname = 'posts_user_id_users_id_fk'
 ) THEN
   ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_users_id_fk";
 END IF;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 IF EXISTS (
   SELECT 1 FROM pg_constraint WHERE conname = 'account_user_id_users_id_fk'
 ) THEN
   ALTER TABLE "account" DROP CONSTRAINT "account_user_id_users_id_fk";
 END IF;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 IF EXISTS (
   SELECT 1 FROM pg_constraint WHERE conname = 'session_user_id_users_id_fk'
 ) THEN
   ALTER TABLE "session" DROP CONSTRAINT "session_user_id_users_id_fk";
 END IF;
END $$;
--> statement-breakpoint
-- Convert users.id from UUID to text
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE text USING "id"::text;
ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT;
--> statement-breakpoint
-- Convert foreign key columns from UUID to text
ALTER TABLE "posts" ALTER COLUMN "user_id" SET DATA TYPE text USING "user_id"::text;
--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "user_id" SET DATA TYPE text USING "user_id"::text;
--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "user_id" SET DATA TYPE text USING "user_id"::text;
--> statement-breakpoint
-- Recreate foreign key constraints
DO $$ BEGIN
 IF NOT EXISTS (
   SELECT 1 FROM pg_constraint WHERE conname = 'posts_user_id_users_id_fk'
 ) THEN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
 END IF;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 IF NOT EXISTS (
   SELECT 1 FROM pg_constraint WHERE conname = 'account_user_id_users_id_fk'
 ) THEN
   ALTER TABLE "account" ADD CONSTRAINT "account_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
 END IF;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 IF NOT EXISTS (
   SELECT 1 FROM pg_constraint WHERE conname = 'session_user_id_users_id_fk'
 ) THEN
   ALTER TABLE "session" ADD CONSTRAINT "session_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
 END IF;
END $$;
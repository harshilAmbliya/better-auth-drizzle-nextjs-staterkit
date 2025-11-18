-- Convert verification.id from UUID to text
ALTER TABLE "verification" ALTER COLUMN "id" SET DATA TYPE text USING "id"::text;
ALTER TABLE "verification" ALTER COLUMN "id" DROP DEFAULT;
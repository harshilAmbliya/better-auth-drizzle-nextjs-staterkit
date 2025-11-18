-- Convert account.id from UUID to text
ALTER TABLE "account" ALTER COLUMN "id" SET DATA TYPE text USING "id"::text;
ALTER TABLE "account" ALTER COLUMN "id" DROP DEFAULT;
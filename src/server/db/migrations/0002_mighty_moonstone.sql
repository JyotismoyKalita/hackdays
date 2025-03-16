ALTER TABLE "item" RENAME COLUMN "expired" TO "hasExpiryDate";--> statement-breakpoint
ALTER TABLE "item" ALTER COLUMN "expiryDate" DROP NOT NULL;
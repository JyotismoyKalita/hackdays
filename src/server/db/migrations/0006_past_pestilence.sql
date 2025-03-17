ALTER TABLE "item" ALTER COLUMN "expiryDate" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "item" ADD COLUMN "manufactureDate" date NOT NULL;
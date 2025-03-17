CREATE TYPE "public"."preCategory" AS ENUM('Electronics', 'Furniture', 'Clothing', 'Food', 'Books', 'Other');--> statement-breakpoint
ALTER TABLE "item" ADD COLUMN "category" "preCategory" NOT NULL;--> statement-breakpoint
ALTER TABLE "item" ADD COLUMN "customCategory" varchar(255);--> statement-breakpoint
ALTER TABLE "item" ADD COLUMN "price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "soldItem" ADD COLUMN "soldDate" date NOT NULL;--> statement-breakpoint
ALTER TABLE "soldItem" ADD COLUMN "soldPrice" integer NOT NULL;
ALTER TABLE "ai_recommendations" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_recommendations" ADD COLUMN "category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_stock_levels" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_stock_levels" ADD COLUMN "category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "dynamic_pricing" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "dynamic_pricing" ADD COLUMN "category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "dynamic_pricing" ADD COLUMN "will_expire_in" integer;--> statement-breakpoint
ALTER TABLE "dynamic_pricing" ADD COLUMN "demand" text;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "cost_price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "cost_price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "dynamic_pricing" DROP COLUMN "reason";
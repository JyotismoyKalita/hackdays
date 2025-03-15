CREATE TABLE "company" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"model" varchar(255) NOT NULL,
	"expired" boolean NOT NULL,
	"expiryDate" date NOT NULL,
	"quantity" integer NOT NULL,
	"companyId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "soldItem" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"model" varchar(255) NOT NULL,
	"quantity" integer NOT NULL,
	"companyId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "company" ADD CONSTRAINT "company_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item" ADD CONSTRAINT "item_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "soldItem" ADD CONSTRAINT "soldItem_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;
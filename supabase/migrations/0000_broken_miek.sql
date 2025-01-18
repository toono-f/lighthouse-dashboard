CREATE TABLE "metrics" (
	"id" serial PRIMARY KEY NOT NULL,
	"page_id" varchar(50) NOT NULL,
	"measured_at" timestamp NOT NULL,
	"lcp" numeric NOT NULL,
	"fid" numeric NOT NULL,
	"cls" numeric(5, 3) NOT NULL,
	"ttfb" numeric NOT NULL,
	"inp" numeric NOT NULL,
	"fcp" numeric NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"page_id" varchar(50) NOT NULL,
	"page_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pages_page_id_unique" UNIQUE("page_id")
);

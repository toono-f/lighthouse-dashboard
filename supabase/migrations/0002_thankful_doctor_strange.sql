ALTER TABLE "pages" ALTER COLUMN "page_url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_page_url_unique" UNIQUE("page_url");
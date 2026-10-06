CREATE TABLE "access_links" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"name" text NOT NULL,
	"role" text DEFAULT 'client' NOT NULL,
	"token_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen_at" timestamp with time zone,
	"revoked_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" text PRIMARY KEY NOT NULL,
	"version_id" text NOT NULL,
	"author_link_id" text,
	"author_name" text NOT NULL,
	"from_studio" boolean DEFAULT false NOT NULL,
	"timecode_ms" integer,
	"body" text NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"reply" text,
	"round" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"submitted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"type" text NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "files" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"kind" text NOT NULL,
	"title" text NOT NULL,
	"storage_key" text NOT NULL,
	"file_name" text NOT NULL,
	"size_bytes" bigint,
	"ready" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"kind" text DEFAULT 'wedding' NOT NULL,
	"title" text NOT NULL,
	"event_date" date,
	"city" text,
	"rounds_included" integer DEFAULT 1 NOT NULL,
	"fps" integer DEFAULT 25 NOT NULL,
	"premiere_slug" text,
	"premiere_password" text,
	"premiere_version_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"archived_at" timestamp with time zone,
	CONSTRAINT "projects_code_unique" UNIQUE("code"),
	CONSTRAINT "projects_premiere_slug_unique" UNIQUE("premiere_slug")
);
--> statement-breakpoint
CREATE TABLE "questionnaires" (
	"project_id" text PRIMARY KEY NOT NULL,
	"data" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text
);
--> statement-breakpoint
CREATE TABLE "rounds" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"version_id" text NOT NULL,
	"number" integer NOT NULL,
	"notes" integer NOT NULL,
	"submitted_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stages" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"key" text NOT NULL,
	"position" integer NOT NULL,
	"title" text NOT NULL,
	"due_on" date,
	"done_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"project_id" text PRIMARY KEY NOT NULL,
	"body" text NOT NULL,
	"allow_publish" boolean DEFAULT false NOT NULL,
	"author_name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "versions" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"kind" text NOT NULL,
	"number" integer NOT NULL,
	"title" text NOT NULL,
	"video_key" text NOT NULL,
	"size_bytes" bigint,
	"status" text DEFAULT 'uploading' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"approved_at" timestamp with time zone,
	"approved_by" text
);
--> statement-breakpoint
ALTER TABLE "access_links" ADD CONSTRAINT "access_links_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_version_id_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questionnaires" ADD CONSTRAINT "questionnaires_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rounds" ADD CONSTRAINT "rounds_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rounds" ADD CONSTRAINT "rounds_version_id_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stages" ADD CONSTRAINT "stages_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "versions" ADD CONSTRAINT "versions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "access_links_token_idx" ON "access_links" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "access_links_project_idx" ON "access_links" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "comments_version_idx" ON "comments" USING btree ("version_id");--> statement-breakpoint
CREATE INDEX "events_project_idx" ON "events" USING btree ("project_id","created_at");--> statement-breakpoint
CREATE INDEX "files_project_idx" ON "files" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "rounds_project_idx" ON "rounds" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "stages_project_idx" ON "stages" USING btree ("project_id","position");--> statement-breakpoint
CREATE INDEX "versions_project_idx" ON "versions" USING btree ("project_id");
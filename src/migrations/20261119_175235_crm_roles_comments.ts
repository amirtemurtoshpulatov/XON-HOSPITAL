import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('owner', 'manager', 'editor');
  CREATE TABLE "leads_status_history" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"from" varchar,
  	"to" varchar,
  	"at" timestamp(3) with time zone,
  	"author_name" varchar
  );
  
  CREATE TABLE "lead_comments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"lead_id" integer NOT NULL,
  	"text" varchar NOT NULL,
  	"author_id" integer,
  	"author_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "leads" ADD COLUMN "assigned_to_id" integer;
  ALTER TABLE "leads" ADD COLUMN "next_contact_at" timestamp(3) with time zone;
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'manager' NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "lead_comments_id" integer;
  ALTER TABLE "leads_status_history" ADD CONSTRAINT "leads_status_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_comments" ADD CONSTRAINT "lead_comments_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lead_comments" ADD CONSTRAINT "lead_comments_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "leads_status_history_order_idx" ON "leads_status_history" USING btree ("_order");
  CREATE INDEX "leads_status_history_parent_id_idx" ON "leads_status_history" USING btree ("_parent_id");
  CREATE INDEX "lead_comments_lead_idx" ON "lead_comments" USING btree ("lead_id");
  CREATE INDEX "lead_comments_author_idx" ON "lead_comments" USING btree ("author_id");
  CREATE INDEX "lead_comments_updated_at_idx" ON "lead_comments" USING btree ("updated_at");
  CREATE INDEX "lead_comments_created_at_idx" ON "lead_comments" USING btree ("created_at");
  ALTER TABLE "leads" ADD CONSTRAINT "leads_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lead_comments_fk" FOREIGN KEY ("lead_comments_id") REFERENCES "public"."lead_comments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "leads_assigned_to_idx" ON "leads" USING btree ("assigned_to_id");
  CREATE INDEX "payload_locked_documents_rels_lead_comments_id_idx" ON "payload_locked_documents_rels" USING btree ("lead_comments_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "leads_status_history" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lead_comments" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "leads_status_history" CASCADE;
  DROP TABLE "lead_comments" CASCADE;
  ALTER TABLE "leads" DROP CONSTRAINT "leads_assigned_to_id_users_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_lead_comments_fk";
  
  DROP INDEX "leads_assigned_to_idx";
  DROP INDEX "payload_locked_documents_rels_lead_comments_id_idx";
  ALTER TABLE "leads" DROP COLUMN "assigned_to_id";
  ALTER TABLE "leads" DROP COLUMN "next_contact_at";
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "lead_comments_id";
  DROP TYPE "public"."enum_users_role";`)
}

import { ChatMemberStatus } from "$lib/core/entry/chat_member_status";
import { ChatType } from "$lib/core/entry/chat_type";
import { MessageType } from "$lib/core/entry/message_type";
import { createClient } from "@clickhouse/client";
import { sql } from "./sql";

const Enum = (enum_: Record<never, never>) =>
	"Enum("
	+ Object.keys(enum_)
		.filter((v) => typeof v === "string")
		.map((v, i) => `'${v}'${i == 0 ? " = 0" : ""}`)
		.join(", ")
	+ ")";

export const client = createClient({
	url: process.env.CLICKHOUSE_URL || "http://localhost:8123",
	clickhouse_settings: process.env.DEV
		? {}
		: {
			async_insert: 1,
			wait_for_async_insert: 0,
			date_time_output_format: "iso",
		},
});

export async function initialize(prefix = "") {
	await client.query({
		query: `
CREATE TABLE IF NOT EXISTS ${prefix}updates (
  timestamp DateTime,
  type UInt8,
  to Int64,
  from Int64,

  -- Sender
  from_bot Bool,
  from_firstname String,
  from_lastname String,
  from_username String,
  from_languagecode String,
  from_premium Bool,
  from_type ${Enum(ChatType)},
  from_title String,
  from_businessconnection String,
  from_boostcount Int32,
  from_signature String,

  -- Chat
  chat_id Int64,
  chat_username String,
  chat_title String,
  chat_firstname String,
  chat_lastname String,
  chat_type ${Enum(ChatType)},


  -- Message
  message_type ${Enum(MessageType)},
  message_id Int32,
  message_threadid Int32,
  message_date DateTime,
  message_topic Bool,
  message_automaticforward Bool,
  message_effectid String,
  message_replytomessageid Int32,
  message_quotetext String,

  -- Forward
  forward_date DateTime,
  forward_from Int64,
  forward_messageid Int32,
  forward_signature String,
  forward_bot Bool,
  forward_name String,

  -- Text message / media captions
  message_text String,

  -- Link preview-only message
  message_url String,

  -- Dice message
  dice_emoji String,
  dice_value Int32,

  -- Callback query
  callbackquery_id String,
  callbackquery_inlinemessageid String,
  callbackquery_data String,

  -- Inline query
  inlinequery_id String,
  inlinequery_text String,
  inlinequery_offset String,

  -- Chosen inline result
  inlineresultchosen_id String,
  inlineresultchosen_query String,
  inlineresultchosen_inlinemessageid String,

  -- Chat member updates
  chatmember_id Int64,
  chatmember_bot Bool,
  chatmember_firstname String,
  chatmember_lastname String,
  chatmember_username String,
  chatmember_premium Bool,
  chatmember_oldstatus ${Enum(ChatMemberStatus)},
  chatmember_newstatus ${Enum(ChatMemberStatus)},

  -- library
  payload String
)
ENGINE = MergeTree
PRIMARY KEY (timestamp, to, from)`,
	});

	// Receiver
	for (
		const query of `
ALTER TABLE ${prefix}updates ADD COLUMN IF NOT EXISTS to_bot Bool;
ALTER TABLE ${prefix}updates ADD COLUMN IF NOT EXISTS to_firstname String;
ALTER TABLE ${prefix}updates ADD COLUMN IF NOT EXISTS to_lastname String;
ALTER TABLE ${prefix}updates ADD COLUMN IF NOT EXISTS to_username String
  `.split(";")
	) {
		await client.query({ query });
	}

	const ALL_FIELDS = [
		"timestamp",
		"type",
		"to",
		"from",
		"from_bot",
		"from_firstname",
		"from_lastname",
		"from_username",
		"from_languagecode",
		"from_premium",
		"from_type",
		"from_title",
		"from_businessconnection",
		"from_boostcount",
		"from_signature",
		"to_bot",
		"to_firstname",
		"to_lastname",
		"to_username",
		"chat_id",
		"chat_username",
		"chat_title",
		"chat_firstname",
		"chat_lastname",
		"chat_type",
		"message_type",
		"message_id",
		"message_threadid",
		"message_date",
		"message_topic",
		"message_automaticforward",
		"message_effectid",
		"message_replytomessageid",
		"message_quotetext",
		"forward_date",
		"forward_from",
		"forward_messageid",
		"forward_signature",
		"forward_bot",
		"forward_name",
		"message_text",
		"message_url",
		"dice_emoji",
		"dice_value",
		"callbackquery_id",
		"callbackquery_inlinemessageid",
		"callbackquery_data",
		"inlinequery_id",
		"inlinequery_text",
		"inlinequery_offset",
		"inlineresultchosen_id",
		"inlineresultchosen_query",
		"inlineresultchosen_inlinemessageid",
		"chatmember_id",
		"chatmember_bot",
		"chatmember_firstname",
		"chatmember_lastname",
		"chatmember_username",
		"chatmember_premium",
		"chatmember_oldstatus",
		"chatmember_newstatus",
	]
		.map((v) => `"${v}"`)
		.join(", ");

	await client.query({
		query: sql`DROP VIEW IF EXISTS ${prefix}updates_view;`,
	});

	await client.query({
		query: sql`
CREATE VIEW ${prefix}updates_view
AS
SELECT ${ALL_FIELDS}
FROM updates
GROUP BY ${ALL_FIELDS}
ORDER BY "timestamp" DESC
`,
	});
}

await initialize().catch(() => {});

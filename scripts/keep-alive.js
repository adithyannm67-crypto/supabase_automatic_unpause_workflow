// scripts/keep-alive.js

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  // Replace "books" with a table that exists in your project.
  const { error } = await supabase
    .from("books")
    .select("*")
    .limit(1);

  if (error) {
    throw new Error(`Supabase query failed: ${error.message}`);
  }

  console.log("Supabase database query succeeded.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

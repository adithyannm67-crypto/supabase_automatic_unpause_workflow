// scripts/keep-alive.js

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const sendEmail = require("./send-email");

async function main() {
  try {
    const { error } = await supabase.from("books").select("*").limit(1);

    if (error) {
      throw new Error(`Supabase query failed: ${error.message}`);
    }

    console.log("Supabase database query succeeded.");

    await sendEmail({
      status: "SUCCESS",
      message: "The health check completed successfully.",
      details: "Supabase responded successfully.",
    });
  } catch (error) {
    try {
      await sendEmail({
        status: "FAILED",
        message: "The health check failed.",
        details: String(error.message || error),
      });
    } catch {
      console.error("Failed to send email:", error);
    }

    process.exitCode = 1;
  }
}

main();

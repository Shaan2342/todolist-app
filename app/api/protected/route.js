import { supabase } from "../../../lib/supabaseClient";

export async function GET(req) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  return new Response(JSON.stringify({ message: "You are authenticated!" }), { status: 200 });
}

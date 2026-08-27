import { NextResponse } from "next/server";
import { leadApiSchema } from "@/lib/validation";
import { saveLeadToAirtable } from "@/lib/airtable";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body with Zod
    const parseResult = leadApiSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, errors: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const validatedData = parseResult.data;
    
    // Run the save to Airtable and retry logic asynchronously in the background.
    // This allows the route handler to respond instantly to the client (under 5ms),
    // freeing up the server to handle the subsequent page transition immediately.
    (async () => {
      let success = false;
      let attempts = 0;
      const maxAttempts = 3;

      while (attempts < maxAttempts && !success) {
        attempts++;
        try {
          success = await saveLeadToAirtable(validatedData);
          if (success) break;
        } catch (err) {
          console.error(`Background attempt ${attempts} failed to save to Airtable:`, err);
        }
        
        // Delay before retrying (exponential backoff)
        if (!success && attempts < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 500 * attempts));
        }
      }

      if (success) {
        console.log(`Lead for ${validatedData.email} successfully saved to Airtable in background.`);
      } else {
        console.error(`Failed to save lead for ${validatedData.email} to Airtable in background after 3 attempts.`);
      }
    })();

    // Return instant success response to the client
    return NextResponse.json({ success: true, message: "Lead capture initiated" });

  } catch (error: any) {
    console.error("Unhandled API route error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", details: error?.message || "" },
      { status: 500 }
    );
  }
}

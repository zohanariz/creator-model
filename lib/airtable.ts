import { LeadApiInput } from "./validation";

export async function saveLeadToAirtable(lead: LeadApiInput): Promise<boolean> {
  const token = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Leads";

  if (!token || !baseId) {
    console.error("Missing Airtable configuration variables (AIRTABLE_API_KEY, AIRTABLE_PERSONAL_ACCESS_TOKEN or AIRTABLE_BASE_ID).");
    return false;
  }

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  const body = {
    records: [
      {
        fields: {
          "First Name": lead.firstName,
          "Email": lead.email,
        },
      },
    ],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Airtable API error: ${response.status} ${response.statusText} - ${errorText}`);
    return false;
  }

  return true;
}

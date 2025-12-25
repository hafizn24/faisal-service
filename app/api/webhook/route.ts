import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let formData: any = {};
    let receiptFile: Blob | null = null;
    let receiptFileName: string | null = null;
    const contentType = req.headers.get("content-type");

    // Handle JSON with base64 encoded file
    if (contentType?.includes("application/json")) {
      formData = await req.json();

      // If receipt is base64, we'll handle it separately
      if (formData.receipt && typeof formData.receipt === 'string') {
        const receiptData = formData.receipt as string;
        receiptFileName = formData.receiptName || 'receipt.jpg';
        const receiptType = formData.receiptType || 'image/jpeg';

        // Convert base64 to buffer for Discord upload
        // Handle both 'data:' prefixed and plain base64 strings
        const base64String = receiptData.includes(',')
          ? receiptData.split(',')[1]
          : receiptData;

        try {
          const buffer = Buffer.from(base64String, 'base64');

          // Create a Blob for Discord
          receiptFile = new Blob([buffer], { type: receiptType });
        } catch (e) {
          console.error("Failed to parse base64 receipt:", e);
        }
      }
    }
    // Handle FormData with actual file
    else if (contentType?.includes("multipart/form-data")) {
      const data = await req.formData();

      // Extract file separately
      const file = data.get("receipt");
      if (file && file instanceof File) {
        receiptFile = file;
        receiptFileName = file.name;
      }

      // Convert rest of form data
      data.forEach((value, key) => {
        if (key !== "receipt") {
          formData[key] = value;
        }
      });
    }

    const { name, email, phone, hostel, numberPlate, brandModel, productPackage, timeslot } = formData;

    // Validate required fields
    if (!name || !email || !phone || !hostel || !numberPlate || !brandModel || !productPackage || !timeslot) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if Discord webhook URL is configured
    if (!process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL) {
      console.error("DISCORD_WEBHOOK_URL is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Format message for Discord
    const messageContent = `
    ==============================
    📋 **APPOINTMENT DETAILS**
    👤 **Name:** ${name}
    📧 **Email:** ${email}
    📱 **Phone:** ${phone}
    🏢 **Hostel:** ${hostel}
    🚗 **Number Plate:** ${numberPlate}
    🔧 **Brand/Model:** ${brandModel}
    📦 **Package:** ${productPackage}
    ⏰ **Timeslot:** ${timeslot}
    ${receiptFile ? `📄 **Receipt:** Attached below` : "⚠️ **Receipt:** Not provided"}
    ==============================
    `.trim();

    // Prepare Discord webhook payload with file attachment
    const discordFormData = new FormData();

    // Add the message payload
    discordFormData.append('payload_json', JSON.stringify({
      content: messageContent,
    }));

    // Add file if it exists
    if (receiptFile && receiptFileName) {
      discordFormData.append('file', receiptFile, receiptFileName);
    }

    // Send to Discord webhook
    const discordResponse = await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL, {
      method: "POST",
      body: discordFormData,
      // Don't set Content-Type header, let fetch set it with boundary
    });

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text();
      console.error(
        "Discord webhook failed:",
        discordResponse.status,
        errorText
      );
      return NextResponse.json(
        { error: "Failed to process request" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
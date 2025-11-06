// romoso-ceramica/app/api/contact_us/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT_EMAIL = "kk23223511@gmail.com";

export async function POST(req: Request) {
    // 1. ⚠️ Move API Key CHECK/INITIALIZATION HERE ⚠️
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error("RESEND_API_KEY is not set in environment variables!");
        // Return a 500 status with an explicit error message
        return NextResponse.json(
            { success: false, error: "API Key is missing on the server." }, 
            { status: 500 }
        );
    }
    const resend = new Resend(apiKey);
    
    // The rest of your existing logic
    try {
        const { name, email, subject, message } = await req.json();

        // Basic validation
        if (!email || !message) {
            return NextResponse.json({ success: false, error: "Email and message fields are required." }, { status: 400 });
        }

        // Sending the email to the specified recipient
        const result = await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>", 
            to: RECIPIENT_EMAIL, 
            replyTo: email, 
            subject: subject || `New Contact Inquiry from ${name}`,
              html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Client Inquiry - Romoso Ceramica</title>
        </head>
        <body style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f7f7f7;">
            
            <div style="max-width: 600px; margin: 30px auto; padding: 0; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden;">
                
                <div style="text-align: left; padding: 20px 30px; border-bottom: 2px solid #000;">
                    <img src="YOUR_LOGO_URL" alt="Romoso Ceramica Logo" style="width: 150px; height: auto; display: block; margin-bottom: 10px;">
                    <h1 style="color: #000; font-size: 20px; margin: 0; font-weight: 500;">
                        NEW CLIENT INQUIRY
                    </h1>
                </div>

                <div style="padding: 30px;">
                    
                    <p style="font-size: 14px; margin-bottom: 30px; color: #555;">
                        A new customer request has been submitted through the Romoso Ceramica contact form.
                    </p>

                    <div style="margin-bottom: 30px;">
                        
                        <div style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                            <p style="font-size: 14px; color: #888; margin: 0;">CUSTOMER NAME:</p>
                            <p style="font-size: 16px; color: #000; font-weight: 600; margin: 4px 0 0 0;">${name || 'N/A'}</p>
                        </div>
                        
                        <div style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                            <p style="font-size: 14px; color: #888; margin: 0;">EMAIL ADDRESS:</p>
                            <p style="font-size: 16px; color: #000; font-weight: 600; margin: 4px 0 0 0;">
                                <a href="mailto:${email}" style="color: #000; text-decoration: none;">${email}</a>
                            </p>
                        </div>

                        <div style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                            <p style="font-size: 14px; color: #888; margin: 0;">SUBJECT:</p>
                            <p style="font-size: 16px; color: #000; font-weight: 600; margin: 4px 0 0 0;">${subject || "General Website Inquiry"}</p>
                        </div>
                        
                    </div>

                    <h3 style="font-size: 18px; color: #000; margin-top: 10px; margin-bottom: 15px; font-weight: 600;">Message Content:</h3>
                    
                    <div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 4px; background-color: #fafafa; margin-bottom: 30px;">
                        <p style="white-space: pre-wrap; margin: 0; font-size: 15px; color: #333;">${message}</p>
                    </div>

                    <div style="text-align: center; padding: 15px; background-color: #f0f0f0; border-radius: 4px; border: 1px solid #e0e0e0;">
                        <p style="font-size: 14px; color: #000; margin: 0;">
                            <strong style="font-weight: 700;">ACTION:</strong> Please click **Reply** to respond directly to the client.
                        </p>
                    </div>
                </div>

                <div style="border-top: 1px solid #e0e0e0; padding: 20px 30px; text-align: center; font-size: 11px; color: #888; background-color: #f7f7f7;">
                    <p style="margin: 0 0 5px 0;">Romoso Ceramica - Tiles & Slabs</p>
                    <p style="margin: 0;">This email was generated by the automated contact system. &copy; ${new Date().getFullYear()}</p>
                </div>
            </div>
        </body>
        </html>
    `,
        });
        
        if (result.error) {
            console.error("Resend Error:", result.error);
            return NextResponse.json({ success: false, error: `Email service failed: ${result.error.message}` }, { status: 500 });
        }

        // Success response
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("API critical error during processing:", error);
        // Generic error message for the client
        return NextResponse.json({ success: false, error: "Internal server error. Check the API route logic and environment variables." }, { status: 500 });
    }
}
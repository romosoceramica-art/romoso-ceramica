// app/api/contact_us/route.ts
// IMPROVED VERSION with better error handling and debugging

import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT_EMAIL = "info@romosoceramica.com";

// Enable dynamic rendering for API routes
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  // ===== STEP 1: VALIDATE API KEY =====
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error("🔴 CRITICAL ERROR: RESEND_API_KEY is not set");
    console.error("Missing environment variable in production");
    console.error("Action: Add RESEND_API_KEY to Vercel Environment Variables");
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Email service not configured on server",
        code: "NO_API_KEY"
      },
      { status: 500 }
    );
  }

  console.log("✅ RESEND_API_KEY found");

  // ===== STEP 2: INITIALIZE RESEND =====
  const resend = new Resend(apiKey);

  try {
    // ===== STEP 3: PARSE REQUEST =====
    const { name, email, subject, message } = await req.json();

    console.log("📨 Contact form received:");
    console.log("  - Name:", name || "NOT PROVIDED");
    console.log("  - Email:", email);
    console.log("  - Subject:", subject || "NOT PROVIDED");
    console.log("  - Message length:", message?.length || 0);

    // ===== STEP 4: VALIDATE INPUT =====
    if (!email || !message) {
      console.warn("⚠️ Validation failed: missing email or message");
      return NextResponse.json(
        { 
          success: false, 
          error: "Email and message are required",
          code: "MISSING_FIELDS"
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn("⚠️ Validation failed: invalid email format");
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid email format",
          code: "INVALID_EMAIL"
        },
        { status: 400 }
      );
    }

    // ===== STEP 5: FORMAT TIMESTAMPS =====
    const currentYear = new Date().getFullYear();
    const submittedAt = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });

    console.log("📅 Formatted timestamp:", submittedAt);

    // ===== STEP 6: SEND EMAIL TO YOUR BUSINESS =====
    console.log("📤 Sending email to business...");

    const businessEmailResult = await resend.emails.send({
      from: "Romoso Ceramica <onboarding@resend.dev>",
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: subject || `New Inquiry from ${name} — Romoso Ceramica`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Client Inquiry — Romoso Ceramica</title>
</head>
<body style="margin:0; padding:0; background-color:#F0EDE8; font-family:'Helvetica Neue', Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F0EDE8; padding: 40px 0;">
    <tr>
      <td align="center">

        <!-- Outer container -->
        <table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px; width:100%;">

          <!-- ===== TOP GOLD ACCENT BAR ===== -->
          <tr>
            <td style="background: linear-gradient(90deg, #B58E5E 0%, #D4AF7A 50%, #B58E5E 100%); height:4px; border-radius:4px 4px 0 0;"></td>
          </tr>

          <!-- ===== HEADER ===== -->
          <tr>
            <td style="background-color:#1A1A1A; padding: 36px 48px 30px 48px; border-radius:0;">
              
              <!-- Logo area -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <!-- Logo image -->
                    <img src="https://romosoceramica.com/assets/images/company_logo/logo_white.png" alt="Romoso Ceramica" width="140" style="display:block; width:140px; height:auto;" onerror="this.style.display='none'">
                    <!-- Fallback text logo -->
                    <p style="margin:0; font-size:22px; font-weight:300; color:#FFFFFF; letter-spacing:4px; text-transform:uppercase;">
                      ROMOSO <span style="color:#B58E5E; font-weight:700;">CERAMICA</span>
                    </p>
                    <p style="margin:4px 0 0 0; font-size:10px; color:#888; letter-spacing:3px; text-transform:uppercase;">
                      Tiles &amp; Slabs
                    </p>
                  </td>
                  <td align="right" valign="middle">
                    <div style="border:1px solid #B58E5E; padding: 6px 14px; display:inline-block; border-radius:2px;">
                      <p style="margin:0; font-size:9px; color:#B58E5E; letter-spacing:2px; text-transform:uppercase; white-space:nowrap;">
                        New Inquiry
                      </p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height:1px; background:linear-gradient(90deg, #B58E5E, transparent); margin-top:24px;"></div>

              <!-- Headline -->
              <p style="margin:20px 0 0 0; font-size:28px; font-weight:700; color:#FFFFFF; letter-spacing:1px; line-height:1.2;">
                Client Message Received
              </p>
              <p style="margin:8px 0 0 0; font-size:13px; color:#999; letter-spacing:0.5px;">
                ${submittedAt}
              </p>
            </td>
          </tr>

          <!-- ===== BODY ===== -->
          <tr>
            <td style="background-color:#FFFFFF; padding: 40px 48px;">

              <!-- Intro text -->
              <p style="margin:0 0 28px 0; font-size:14px; color:#666; line-height:1.8;">
                A new inquiry has been submitted through the <strong style="color:#333;">Romoso Ceramica</strong> contact form. The client details are listed below. You may reply directly to this email to respond to the client.
              </p>

              <!-- ===== CLIENT DETAILS CARD ===== -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E8E2DA; border-radius:6px; overflow:hidden; margin-bottom:28px;">
                
                <!-- Card header -->
                <tr>
                  <td colspan="2" style="background-color:#FAF8F5; padding:14px 24px; border-bottom:1px solid #E8E2DA;">
                    <p style="margin:0; font-size:10px; color:#B58E5E; letter-spacing:3px; text-transform:uppercase; font-weight:700;">
                      Client Information
                    </p>
                  </td>
                </tr>

                <!-- Name row -->
                <tr>
                  <td width="140" style="padding:16px 24px; border-bottom:1px solid #F5F0EA; vertical-align:top;">
                    <p style="margin:0; font-size:10px; color:#B58E5E; letter-spacing:2px; text-transform:uppercase; font-weight:600;">Name</p>
                  </td>
                  <td style="padding:16px 24px; border-bottom:1px solid #F5F0EA; border-left:1px solid #F5F0EA;">
                    <p style="margin:0; font-size:15px; color:#1A1A1A; font-weight:600;">${name || "Not provided"}</p>
                  </td>
                </tr>

                <!-- Email row -->
                <tr>
                  <td width="140" style="padding:16px 24px; border-bottom:1px solid #F5F0EA; vertical-align:top; background-color:#FDFCFB;">
                    <p style="margin:0; font-size:10px; color:#B58E5E; letter-spacing:2px; text-transform:uppercase; font-weight:600;">Email</p>
                  </td>
                  <td style="padding:16px 24px; border-bottom:1px solid #F5F0EA; border-left:1px solid #F5F0EA; background-color:#FDFCFB;">
                    <p style="margin:0; font-size:15px; font-weight:600;">
                      <a href="mailto:${email}" style="color:#B58E5E; text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>

                <!-- Subject row -->
                <tr>
                  <td width="140" style="padding:16px 24px; vertical-align:top;">
                    <p style="margin:0; font-size:10px; color:#B58E5E; letter-spacing:2px; text-transform:uppercase; font-weight:600;">Subject</p>
                  </td>
                  <td style="padding:16px 24px; border-left:1px solid #F5F0EA;">
                    <p style="margin:0; font-size:15px; color:#1A1A1A; font-weight:600;">${subject || "General Website Inquiry"}</p>
                  </td>
                </tr>

              </table>

              <!-- ===== MESSAGE BLOCK ===== -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td>
                    <p style="margin:0 0 12px 0; font-size:10px; color:#B58E5E; letter-spacing:3px; text-transform:uppercase; font-weight:700;">
                      Message
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color:#FAF8F5; border-left:3px solid #B58E5E; border-radius:0 6px 6px 0; padding:24px 28px;">
                    <p style="margin:0; font-size:15px; color:#333; line-height:1.9; white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>

              <!-- ===== CTA REPLY BUTTON ===== -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || `Your Inquiry — Romoso Ceramica`)}"
                       style="display:inline-block; background:linear-gradient(135deg, #B58E5E, #C9A87A); color:#FFFFFF; text-decoration:none; padding:14px 44px; border-radius:3px; font-size:13px; font-weight:700; letter-spacing:2px; text-transform:uppercase;">
                      Reply to Client
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ===== FOOTER ===== -->
          <tr>
            <td style="background-color:#1A1A1A; padding: 28px 48px; border-radius:0 0 4px 4px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0; font-size:12px; color:#FFFFFF; font-weight:600; letter-spacing:2px; text-transform:uppercase;">
                      Romoso <span style="color:#B58E5E;">Ceramica</span>
                    </p>
                    <p style="margin:4px 0 0 0; font-size:11px; color:#666;">
                      Premium Tiles &amp; Slabs — Crafted for Elegant Spaces
                    </p>
                  </td>
                  <td align="right" valign="middle">
                    <p style="margin:0; font-size:10px; color:#555; text-align:right; line-height:1.8;">
                      Automated system notification<br>
                      &copy; ${currentYear} Romoso Ceramica
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div style="height:1px; background:linear-gradient(90deg, #B58E5E, transparent); margin:20px 0 16px 0;"></div>
                    <p style="margin:0; font-size:10px; color:#444; line-height:1.7;">
                      This email was automatically generated by the Romoso Ceramica contact system. Do not reply to this notification — instead, use the <strong style="color:#B58E5E;">Reply to Client</strong> button above to respond directly.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== BOTTOM GOLD ACCENT BAR ===== -->
          <tr>
            <td style="background:linear-gradient(90deg, #B58E5E 0%, #D4AF7A 50%, #B58E5E 100%); height:4px; border-radius:0 0 4px 4px;"></td>
          </tr>

        </table>
        <!-- End outer container -->

      </td>
    </tr>
  </table>

</body>
</html>
      `,
    });

    // ===== STEP 7: CHECK FOR EMAIL ERRORS =====
    if (businessEmailResult.error) {
      console.error("❌ Resend API returned error:", businessEmailResult.error);
      console.error("Error message:", businessEmailResult.error.message);
      
      return NextResponse.json(
        { 
          success: false, 
          error: "Failed to send email",
          code: "EMAIL_SEND_FAILED",
          details: businessEmailResult.error.message
        },
        { status: 500 }
      );
    }

    console.log("✅ Business email sent successfully. ID:", businessEmailResult.data?.id);

    // ===== STEP 8: SEND CONFIRMATION EMAIL TO USER =====
    console.log("📤 Sending confirmation email to user...");

    try {
      const confirmationResult = await resend.emails.send({
        from: "Romoso Ceramica <onboarding@resend.dev>",
        to: email,
        subject: "We received your message - Romoso Ceramica",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#F0EDE8; font-family:'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F0EDE8; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px; width:100%;">
          
          <tr>
            <td style="background:linear-gradient(90deg, #B58E5E 0%, #D4AF7A 50%, #B58E5E 100%); height:4px; border-radius:4px 4px 0 0;"></td>
          </tr>

          <tr>
            <td style="background-color:#1A1A1A; padding: 36px 48px 30px 48px;">
              <h2 style="margin:0; font-size:28px; font-weight:700; color:#FFFFFF; letter-spacing:1px;">Thank You, ${name}!</h2>
              <p style="margin:8px 0 0 0; font-size:13px; color:#999;">We received your message</p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#FFFFFF; padding: 40px 48px;">
              <p style="margin:0 0 20px 0; font-size:14px; color:#666; line-height:1.8;">
                We have received your inquiry and will respond to you as soon as possible. Our team typically replies within <strong>24 hours on business days</strong>.
              </p>

              <div style="background-color:#FAF8F5; padding:20px; border-left:3px solid #B58E5E; border-radius:0 6px 6px 0; margin:30px 0;">
                <p style="margin:0; font-size:10px; color:#B58E5E; letter-spacing:2px; text-transform:uppercase; font-weight:700; margin-bottom:10px;">Your Message:</p>
                <p style="margin:0; font-size:14px; color:#333; white-space:pre-wrap; line-height:1.8;">${message}</p>
              </div>

              <hr style="border:none; border-top:1px solid #E8E2DA; margin:30px 0;">

              <h3 style="margin:20px 0 15px 0; font-size:14px; color:#B58E5E; font-weight:700; letter-spacing:1px;">Contact Romoso Ceramica:</h3>
              <p style="margin:6px 0; font-size:13px; color:#333;"><strong> Location:</strong> Warehouse-16, Al Sajja, Sharjah, UAE</p>
              <p style="margin:6px 0; font-size:13px; color:#333;"><strong>Phone:</strong> <a href="tel:+971567027043" style="color:#B58E5E; text-decoration:none;">+971 56 702 7043</a></p>
              <p style="margin:6px 0; font-size:13px; color:#333;"><strong>Email:</strong> <a href="mailto:info@romosoceramica.com" style="color:#B58E5E; text-decoration:none;">info@romosoceramica.com</a></p>
              <p style="margin:6px 0; font-size:13px; color:#333;"><strong>Hours:</strong> Monday - Friday, 9AM - 6PM</p>

            </td>
          </tr>

          <tr>
            <td style="background:linear-gradient(90deg, #B58E5E 0%, #D4AF7A 50%, #B58E5E 100%); height:4px; border-radius:0 0 4px 4px;"></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      });

      if (confirmationResult.error) {
        console.warn("⚠️ Confirmation email failed (non-critical):", confirmationResult.error.message);
      } else {
        console.log("✅ Confirmation email sent successfully. ID:", confirmationResult.data?.id);
      }
    } catch (confirmError) {
      console.warn("⚠️ Confirmation email error (non-critical):", confirmError);
    }

    // ===== STEP 9: SUCCESS RESPONSE =====
    console.log("🎉 Contact form submission completed successfully");
    
    return NextResponse.json(
      { 
        success: true,
        message: "Message sent successfully. We'll be in touch soon!"
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("🔴 CRITICAL ERROR in contact form handler:", error);
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal server error. Please try again or contact us directly.",
        code: "INTERNAL_ERROR",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function OPTIONS(req: Request) {
  return NextResponse.json({}, { status: 200 });
}
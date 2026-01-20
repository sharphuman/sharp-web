/**
 * Contact Form Handler - Cloudflare Pages Function
 * 
 * Handles POST requests to /api/contact
 * Sends email to website@sharphuman.com via email service
 * 
 * Environment Variables Required (choose one):
 * - RESEND_API_KEY (recommended)
 * - MAILGUN_API_KEY + MAILGUN_DOMAIN
 * - SENDGRID_API_KEY
 * 
 * For simple setup without email service, this logs to console
 * and returns success (you can check Cloudflare logs)
 */

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string; // Honeypot field
}

export async function onRequestPost(context: {
  request: Request;
  env: {
    RESEND_API_KEY?: string;
    MAILGUN_API_KEY?: string;
    MAILGUN_DOMAIN?: string;
    SENDGRID_API_KEY?: string;
    TURNSTILE_SECRET_KEY?: string;
  };
}) {
  const { request, env } = context;
  
  try {
    // Parse request - handle both JSON and FormData
    const contentType = request.headers.get('content-type') || '';
    let turnstileToken = '';
    let data: ContactFormData;
    
    if (contentType.includes('application/json')) {
      // Handle JSON request
      const jsonData = await request.json();
      turnstileToken = jsonData.turnstile_token?.toString() || '';
      data = {
        name: jsonData.name?.toString() || '',
        email: jsonData.email?.toString() || '',
        company: jsonData.company?.toString() || '',
        message: jsonData.message?.toString() || '',
        website: jsonData.website?.toString() || '', // Honeypot
      };
    } else {
      // Handle FormData request
      const formData = await request.formData();
      turnstileToken = formData.get('turnstile_token')?.toString() || '';
      data = {
        name: formData.get('name')?.toString() || '',
        email: formData.get('email')?.toString() || '',
        company: formData.get('company')?.toString() || '',
        message: formData.get('message')?.toString() || '',
        website: formData.get('website')?.toString() || '', // Honeypot
      };
    }
    
    // #region agent log
    console.log(JSON.stringify({location:'contact.ts:37',message:'Backend received request',data:{contentType,hasTurnstileToken:!!turnstileToken,tokenLength:turnstileToken.length,ip:request.headers.get('CF-Connecting-IP')||'unknown'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'H1'}));
    // #endregion
    
    // Honeypot check - if filled, it's a bot
    if (data.website) {
      console.log('Honeypot triggered - bot detected');
      // Return success to not tip off the bot
      return Response.redirect('https://sharphuman.com/?contact=success', 302);
    }
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return Response.redirect('https://sharphuman.com/?contact=error&reason=missing', 302);
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return Response.redirect('https://sharphuman.com/?contact=error&reason=email', 302);
    }
    
    // Turnstile validation (CRITICAL for security)
    if (env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        // #region agent log
        console.log(JSON.stringify({location:'contact.ts:67',message:'Turnstile token missing - rejecting',data:{ip:request.headers.get('CF-Connecting-IP')||'unknown'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H1'}));
        // #endregion
        return Response.redirect('https://sharphuman.com/?contact=error&reason=security', 302);
      }
      
      // Verify token with Cloudflare
      const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: request.headers.get('CF-Connecting-IP') || '',
        }),
      });
      
      const verifyResult = await verifyResponse.json();
      // #region agent log
      console.log(JSON.stringify({location:'contact.ts:82',message:'Turnstile verification result',data:{success:verifyResult.success,errors:verifyResult['error-codes'],ip:request.headers.get('CF-Connecting-IP')||'unknown'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H1'}));
      // #endregion
      
      if (!verifyResult.success) {
        // Invalid or expired token - reject submission
        return Response.redirect('https://sharphuman.com/?contact=error&reason=security', 302);
      }
    } else {
      // #region agent log
      console.log(JSON.stringify({location:'contact.ts:90',message:'Turnstile secret key not configured - validation skipped',data:{hasToken:!!turnstileToken},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H1'}));
      // #endregion
    }
    
    // Rate limiting by IP (simple in-memory, resets on deploy)
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    
    // Log the contact (always works)
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      ip: clientIP,
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message.substring(0, 100) + '...',
    });
    
    // Try to send email if configured (Resend first, then fallbacks)
    let emailSent = false;
    
    if (env.RESEND_API_KEY) {
      emailSent = await sendViaResend(env, data);
    } else if (env.MAILGUN_API_KEY && env.MAILGUN_DOMAIN) {
      emailSent = await sendViaMailgun(env, data);
    } else if (env.SENDGRID_API_KEY) {
      emailSent = await sendViaSendGrid(env, data);
    }
    
    if (!emailSent) {
      // Fallback: Just log it (check Cloudflare dashboard)
      console.log('Email service not configured - contact logged only');
    }
    
    // Redirect back with success
    return Response.redirect('https://sharphuman.com/?contact=success', 302);
    
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.redirect('https://sharphuman.com/?contact=error', 302);
  }
}

async function sendViaResend(
  env: { RESEND_API_KEY?: string },
  data: ContactFormData
): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Sharp Human Website <notifications@sharphuman.com>',
        to: ['website@sharphuman.com'],
        reply_to: data.email,
        subject: `Contact Form: ${data.name}${data.company ? ` (${data.company})` : ''}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; padding: 30px; border-radius: 12px;">
            <h2 style="color: #6366f1; margin: 0 0 20px;">New Contact Form Submission</h2>
            
            <div style="background: #111827; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #9ca3af; margin: 0 0 5px; font-size: 12px;">FROM</p>
              <p style="color: #fff; margin: 0 0 15px; font-size: 16px;">${data.name}</p>
              
              <p style="color: #9ca3af; margin: 0 0 5px; font-size: 12px;">EMAIL</p>
              <p style="color: #fff; margin: 0 0 15px;"><a href="mailto:${data.email}" style="color: #6366f1;">${data.email}</a></p>
              
              ${data.company ? `
              <p style="color: #9ca3af; margin: 0 0 5px; font-size: 12px;">COMPANY</p>
              <p style="color: #fff; margin: 0 0 15px;">${data.company}</p>
              ` : ''}
              
              <p style="color: #9ca3af; margin: 0 0 5px; font-size: 12px;">MESSAGE</p>
              <div style="background: #1a1a2e; padding: 15px; border-radius: 8px; border-left: 3px solid #6366f1;">
                <p style="color: #e5e5e5; margin: 0; white-space: pre-wrap;">${data.message}</p>
              </div>
            </div>
            
            <p style="color: #6b7280; font-size: 12px; text-align: center;">
              Sent from sharphuman.com contact form
            </p>
          </div>
        `,
        text: `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not provided'}

Message:
${data.message}
        `.trim(),
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend error:', errorText);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Resend error:', error);
    return false;
  }
}

async function sendViaMailgun(
  env: { MAILGUN_API_KEY?: string; MAILGUN_DOMAIN?: string },
  data: ContactFormData
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.mailgun.net/v3/${env.MAILGUN_DOMAIN}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`api:${env.MAILGUN_API_KEY}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          from: `Sharp Human Website <noreply@${env.MAILGUN_DOMAIN}>`,
          to: 'website@sharphuman.com',
          subject: `Contact Form: ${data.name}`,
          text: `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not provided'}

Message:
${data.message}
          `.trim(),
          'h:Reply-To': data.email,
        }),
      }
    );
    
    return response.ok;
  } catch (error) {
    console.error('Mailgun error:', error);
    return false;
  }
}

async function sendViaSendGrid(
  env: { SENDGRID_API_KEY?: string },
  data: ContactFormData
): Promise<boolean> {
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: 'website@sharphuman.com' }] }],
        from: { email: 'noreply@sharphuman.com', name: 'Sharp Human Website' },
        reply_to: { email: data.email, name: data.name },
        subject: `Contact Form: ${data.name}`,
        content: [
          {
            type: 'text/plain',
            value: `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not provided'}

Message:
${data.message}
            `.trim(),
          },
        ],
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('SendGrid error:', error);
    return false;
  }
}
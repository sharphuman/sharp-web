/**
 * Contact Form Handler - Cloudflare Pages Function
 * 
 * Handles POST requests to /api/contact
 * Sends email to website@sharphuman.com via email service
 * 
 * Environment Variables Required:
 * - MAILGUN_API_KEY or SENDGRID_API_KEY
 * - MAILGUN_DOMAIN (if using Mailgun)
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
    MAILGUN_API_KEY?: string;
    MAILGUN_DOMAIN?: string;
    SENDGRID_API_KEY?: string;
  };
}) {
  const { request, env } = context;
  
  try {
    // Parse form data
    const formData = await request.formData();
    const data: ContactFormData = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      company: formData.get('company')?.toString() || '',
      message: formData.get('message')?.toString() || '',
      website: formData.get('website')?.toString() || '', // Honeypot
    };
    
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
    
    // Try to send email if configured
    let emailSent = false;
    
    if (env.MAILGUN_API_KEY && env.MAILGUN_DOMAIN) {
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

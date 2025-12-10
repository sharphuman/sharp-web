/**
 * Sharp Human - Blog Proxy Worker
 * 
 * This worker proxies your Ghost blog (sharphuman.ghost.io) 
 * to appear as sharphuman.com/blog for optimal SEO.
 * 
 * DEPLOYMENT:
 * 1. Go to Cloudflare Dashboard → Workers & Pages → Create Worker
 * 2. Name it: sharp-blog-proxy
 * 3. Paste this code
 * 4. Deploy
 * 5. Go to Workers Routes and add: sharphuman.com/blog/* → sharp-blog-proxy
 */

const GHOST_URL = 'https://sharphuman.ghost.io';
const YOUR_DOMAIN = 'https://sharphuman.com';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle /blog paths
    if (url.pathname.startsWith('/blog')) {
      return handleBlogRequest(request, url);
    }
    
    // Handle /rss
    if (url.pathname === '/rss' || url.pathname === '/rss/') {
      return proxyToGhost(request, '/rss/');
    }
    
    // Handle sitemap
    if (url.pathname.includes('sitemap')) {
      return proxyToGhost(request, url.pathname);
    }
    
    // Pass through other requests
    return fetch(request);
  }
};

async function handleBlogRequest(request, url) {
  // Remove /blog prefix for Ghost
  let ghostPath = url.pathname.replace(/^\/blog/, '') || '/';
  
  // Preserve query string
  if (url.search) {
    ghostPath += url.search;
  }
  
  return proxyToGhost(request, ghostPath);
}

async function proxyToGhost(request, path) {
  const ghostUrl = GHOST_URL + path;
  
  // Create new request to Ghost
  const ghostRequest = new Request(ghostUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'manual' // Handle redirects ourselves
  });
  
  // Fetch from Ghost
  let response = await fetch(ghostRequest);
  
  // Handle Ghost redirects - rewrite them to your domain
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('Location');
    if (location) {
      const newLocation = rewriteUrl(location);
      return Response.redirect(newLocation, response.status);
    }
  }
  
  // Get response body
  let body = await response.text();
  
  // Rewrite Ghost URLs to your domain in HTML content
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    body = rewriteHtml(body);
  }
  
  // Build new response with modified headers
  const newHeaders = new Headers(response.headers);
  
  // Remove headers that might cause issues
  newHeaders.delete('content-security-policy');
  newHeaders.delete('x-frame-options');
  
  // Add SEO-friendly headers
  newHeaders.set('X-Robots-Tag', 'index, follow');
  
  // Add cache headers for performance
  if (contentType.includes('text/html')) {
    newHeaders.set('Cache-Control', 'public, max-age=300'); // 5 min for HTML
  } else if (contentType.includes('image') || contentType.includes('font')) {
    newHeaders.set('Cache-Control', 'public, max-age=31536000'); // 1 year for assets
  }
  
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

function rewriteUrl(url) {
  // Convert Ghost URLs to your domain
  return url
    .replace(GHOST_URL, YOUR_DOMAIN + '/blog')
    .replace('sharphuman.ghost.io', 'sharphuman.com/blog');
}

function rewriteHtml(html) {
  // Rewrite all Ghost URLs to your domain
  return html
    // Absolute URLs
    .replace(/https:\/\/sharphuman\.ghost\.io/g, YOUR_DOMAIN + '/blog')
    // Protocol-relative URLs
    .replace(/\/\/sharphuman\.ghost\.io/g, '//sharphuman.com/blog')
    // Add canonical tag if not present (helps SEO)
    .replace(
      /<head>/i, 
      '<head>\n<link rel="canonical" href="' + YOUR_DOMAIN + '/blog" />'
    )
    // Add Open Graph site name
    .replace(
      /<meta property="og:site_name"[^>]*>/gi,
      '<meta property="og:site_name" content="Sharp Human" />'
    )
    // Rewrite any remaining ghost.io references in meta tags
    .replace(/content="https:\/\/sharphuman\.ghost\.io([^"]*)"/g, 
      'content="' + YOUR_DOMAIN + '/blog$1"');
}

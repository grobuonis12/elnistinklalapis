# WordPress API Configuration

This document explains how to configure the WordPress API integration for the Elnis website.

## Environment Variables

The website uses environment variables to configure the WordPress API URL. This allows for different configurations in development and production environments.

### Required Environment Variables

- `WORDPRESS_API_URL`: The URL of the WordPress REST API endpoint for posts
  - Format: `https://your-wordpress-site.com/wp-json/wp/v2/posts`
  - Default: `https://www.elnis.lt/wp-json/wp/v2/posts`

## Local Development

1. Create a `.env.local` file in the root directory of the project
2. Add the following line to the file:
   ```
   WORDPRESS_API_URL=https://www.elnis.lt/wp-json/wp/v2/posts
   ```
3. Restart your development server

## Deployment

When deploying the website, you need to set the environment variables in your deployment platform:

### Vercel

1. Go to your project settings in the Vercel dashboard
2. Navigate to the "Environment Variables" section
3. Add a new environment variable:
   - Name: `WORDPRESS_API_URL`
   - Value: `https://www.elnis.lt/wp-json/wp/v2/posts`
4. Save the changes and redeploy your project

### Netlify

1. Go to your site settings in the Netlify dashboard
2. Navigate to the "Build & deploy" > "Environment" section
3. Add a new environment variable:
   - Key: `WORDPRESS_API_URL`
   - Value: `https://www.elnis.lt/wp-json/wp/v2/posts`
4. Save the changes and redeploy your site

### Other Platforms

For other deployment platforms, refer to their documentation on how to set environment variables.

## Troubleshooting

If the blog page is not displaying posts after deployment:

1. Check if the WordPress API URL is correctly set in your deployment platform
2. Verify that the WordPress site is accessible from your deployment server
3. Check the server logs for any errors related to the API requests
4. Try accessing the WordPress API URL directly in a browser to confirm it works
5. Check if there are any CORS issues by looking at the browser console

## CORS Configuration

If you're experiencing CORS issues, you may need to configure your WordPress site to allow requests from your deployed domain:

1. Install a CORS plugin like "CORS Enabler" on your WordPress site
2. Configure the plugin to allow requests from your deployed domain
3. Alternatively, add the following to your WordPress site's `.htaccess` file:

```
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "https://your-deployed-domain.com"
</IfModule>
```

Replace `https://your-deployed-domain.com` with your actual deployed domain. 
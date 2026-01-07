# How to Update Contentful Changes to Live Site

## Quick Steps:

1. **Make sure your `.env.local` file has Contentful credentials:**
   ```
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_access_token
   CONTENTFUL_ENVIRONMENT=master
   ```

2. **Rebuild the site:**
   ```bash
   npm run export
   ```

3. **Upload the new `out` folder contents to your server:**
   - Replace all files in `public_html` with contents from `out` folder
   - Make sure to upload all files (HTML, CSS, JS, images, etc.)

4. **Clear browser cache** (optional but recommended):
   - Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
   - Or use incognito/private browsing mode

## Note:
Every time you update content in Contentful, you need to repeat steps 2-3 to see changes on your live site.


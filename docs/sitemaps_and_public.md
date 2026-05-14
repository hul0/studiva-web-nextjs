# Search Engine Indexing & Public Metadata API

## Overview

Studiva includes a public indexing and metadata system to ensure that public user profiles and approved public study content are easily discoverable via external search engines (like Google) while maintaining strict privacy over the actual file assets.

## Architecture

1. **Sitemap Generation (`utils/sitemap_worker.js`)**
   - A Cloudflare worker cron job runs daily at `00:00 UTC`.
   - It queries the Turso database for all active users (`deleted=FALSE`, `is_banned=FALSE`) and all public content (`visibility='public'`, `moderation_status='approved'`).
   - Sitemaps are chunked into files containing a maximum of 5,000 URLs each (e.g., `users-1.xml`, `content-1.xml`).
   - A master `sitemap-index.xml` is generated pointing to all the individual chunks.
   - Files are uploaded directly to the Cloudflare R2 bucket under the `/sitemaps/` prefix.

2. **SEO & Metadata Inclusion**
   - The XML sitemaps utilize the **Google Image Sitemap** extension.
   - User sitemaps include the user's `avatar_url`.
   - Content sitemaps include the content's `preview_link` and `title`.
   - **Privacy Guard:** The actual underlying asset links (such as raw PDF URLs or video files) are never exposed to the sitemap XML.

3. **Endpoints**

> [!IMPORTANT]
> All endpoints below require a valid `Authorization` header utilizing a secret key configured via `wrangler secret put INTERNAL_API_KEY`.
> **Example Header:** `Authorization: Bearer <your_internal_api_key>`

### Trigger Sitemap Generation
- **Endpoint:** `GET /admin/trigger-sitemap`
- **Description:** Manually triggers the sitemap generation process. Used for easier maintenance, allowing CI/CD or admins to quickly refresh the R2 index. Requires the internal API key.

### Public Content Metadata
- **Endpoint:** `GET /public/content/:id`
- **Description:** Returns non-sensitive public metadata for a specific content item.
- **Response Format:**
  ```json
  {
    "success": true,
    "data": {
      "id": "content_id",
      "title": "Content Title",
      "description": "Content Description",
      "content_type": "note",
      "preview_link": "https://cdn.crine.in/preview.jpg",
      "views": 150,
      "sparks_received": 20,
      "saves": 5,
      "created_at": 1698765432,
      "creator_id": "user_id",
      "creator_username": "johndoe",
      "creator_name": "John Doe",
      "creator_avatar": "https://cdn.crine.in/avatar.jpg"
    }
  }
  ```

### Public User Metadata
- **Endpoint:** `GET /public/user/:username`
- **Description:** Returns non-sensitive public metadata for a specific user profile.
- **Response Format:**
  ```json
  {
    "success": true,
    "data": {
      "id": "user_id",
      "username": "johndoe",
      "full_name": "John Doe",
      "avatar_url": "https://cdn.crine.in/avatar.jpg",
      "bio": "Study enthusiast",
      "created_at": 1698765432,
      "follower_count": 10,
      "following_count": 5,
      "content_count": 3
    }
  }
  ```

## Privacy & Security Considerations
- The public endpoints (`/public/content/:id`, `/public/user/:username`, and `/admin/trigger-sitemap`) are strictly authorized via an internal API key to prevent unintended public scraping, ensuring only your frontend can utilize them securely.
- Sitemaps and public endpoints strictly filter for items marked as `public` and `approved`.
- Original file assets (`pdf_url`, `video_url`, etc.) are hidden from public indexing.
- The privacy policy has been updated (Section 3.4) to explicitly state this indexing functionality to users.
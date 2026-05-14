# Studiva API Documentation

Welcome to the Studiva API documentation. This API allows external applications to interact with Studiva's backend services, including feature suggestions, support tickets, and application submissions.

## Base URL

- **Production:** `https://studiva.crine.in/api`
- **Local Development:** `http://localhost:3001/api`

## Authorization

All API requests require a Bearer token for authorization. This token is configurable via the `API_SECRET_TOKEN` environment variable.

| Header | Value |
| :--- | :--- |
| `Authorization` | `Bearer <YOUR_SECRET_TOKEN>` |

---

## Endpoints

### 1. Feature Suggestions
Manage community feature ideas and suggestions.

**`GET /suggestions`**
- **Description:** Retrieve all feature suggestions.
- **Response:** `200 OK` (Array of suggestion objects)

**`POST /suggestions`**
- **Description:** Submit a new feature suggestion.
- **Request Body:**
```json
{
  "full_name": "string",
  "email": "string",
  "feature_title": "string",
  "description": "string",
  "category": "New Feature | UI/UX Improvement | Performance | Bug Report | Other"
}
```

---

### 2. Support Tickets
Manage help requests and technical support.

**`GET /support`**
- **Description:** Retrieve all support tickets.
- **Response:** `200 OK` (Array of ticket objects)

**`POST /support`**
- **Description:** Create a new support ticket.
- **Request Body:**
```json
{
  "full_name": "string",
  "email": "string",
  "subject": "string",
  "message": "string",
  "category": "General | Technical | Account | Billing | Feature"
}
```

---

### 3. Campus Representatives
Manage applications for the Campus Representative programme.

**`GET /campus-reps`**
- **Description:** Retrieve all campus representative applications.
- **Response:** `200 OK` (Array of application objects)

**`POST /campus-reps`**
- **Description:** Submit a new campus representative application.
- **Request Body:**
```json
{
  "full_name": "string",
  "email": "string",
  "phone": "string",
  "college_name": "string",
  "year_of_study": "1st | 2nd | 3rd | 4th | other",
  "why_join": "string"
}
```

---

### 4. Verified Creators
Manage applications for the Verified Creator partner program.

**`GET /creators`**
- **Description:** Retrieve all creator applications.
- **Response:** `200 OK` (Array of application objects)

**`POST /creators`**
- **Description:** Submit a new verified creator application.
- **Request Body:**
```json
{
  "full_name": "string",
  "email": "string",
  "phone": "string",
  "weekly_uploads": number,
  "social_links": "string (optional)",
  "has_team": boolean,
  "team_size": number (required if has_team is true)
}
```

---

### 5. Material Requests
Submit and manage requests for study materials.

**`GET /material-requests`**
- **Description:** Retrieve all material requests.
- **Response:** `200 OK` (Array of request objects)

**`POST /material-requests`**
- **Description:** Submit a new material request.
- **Request Body:**
```json
{
  "full_name": "string",
  "material_name": "string",
  "category": "string (optional)",
  "description": "string (optional)"
}
```

---

### 6. System Health

**`GET /health`**
- **Description:** Check if the API server is online.
- **Response:** `200 OK`
```json
{
  "status": "ok",
  "timestamp": "2026-04-25T00:00:00.000Z"
}
```

---

## Response Status Codes

| Code | Description |
| :--- | :--- |
| `200` | Success |
| `201` | Created Successfully |
| `401` | Unauthorized (Missing or invalid token) |
| `405` | Method Not Allowed |
| `500` | Internal Server Error (Supabase or logic error) |

## Example Usage (cURL)

```bash
curl -X POST https://your-domain.com/api/suggestions \
  -H "Authorization: Bearer hello-my-token" \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Alex Smith",
    "email": "alex@university.edu",
    "feature_title": "AI Study Planner",
    "description": "An automated planner based on syllabus.",
    "category": "New Feature"
  }'
```

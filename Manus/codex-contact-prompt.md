# Vercel Contact Form API Route - Comprehensive Generation Prompt

You are an expert full-stack developer specializing in Vercel serverless functions, Airtable integrations, and Resend email services. Generate a production-ready Next.js API route for a contact form that reliably sends data to both Airtable and Resend email service.

## Requirements

### Core Functionality
- Create a POST endpoint at `/api/contact` that accepts contact form submissions
- Validate all incoming form data before processing
- Send validated data to Airtable base as a new record
- Send confirmation email via Resend to the user's provided email address
- Return success/error responses to the frontend

### Execution Order - CRITICAL
**Execute ALL external API calls (Airtable + Resend) BEFORE sending the HTTP response back to the client.** This is essential for Vercel serverless functions, which terminate after the response is sent. Use `Promise.all()` to execute both calls in parallel for performance.

### Environment Variables Required
The function must use these environment variables (provided via Vercel dashboard):
- `AIRTABLE_TOKEN`: Airtable personal access token
- `AIRTABLE_BASE_ID`: Base ID (starts with "app")
- `AIRTABLE_TABLE_NAME`: Table name (e.g., "Contacts")
- `RESEND_API_KEY`: Resend API key (starts with "re_")
- `FROM_EMAIL`: Verified sender email for Resend (e.g., noreply@bespokeethos.com)
- `FRONTEND_URL`: Frontend domain for redirects (e.g., https://bespokeethos.com)

### Form Field Mapping
Incoming request body structure:
```
{
  "firstName": string (required),
  "lastName": string (required),
  "email": string (required, valid email),
  "phone": string (optional),
  "company": string (optional),
  "message": string (required, min 10 chars)
}
```

Airtable column names (CASE-SENSITIVE - must match exactly):
- "First Name" → maps to firstName
- "Last Name" → maps to lastName
- "Email" → maps to email
- "Phone" → maps to phone
- "Company" → maps to company
- "Message" → maps to message
- "Submitted At" → auto-populate with current ISO timestamp
- "Status" → auto-populate with "New"

### Airtable API Integration
- Use Airtable Records API v0
- Endpoint: `https://api.airtable.com/v0/{BASE_ID}/{TABLE_NAME}`
- Authentication: Bearer token in Authorization header
- Request body must wrap fields in `{ "fields": { ... } }` structure
- Handle rate limiting (429 errors) with appropriate response
- Parse and validate Airtable responses

### Resend Email Integration
- Use Resend API v0
- Endpoint: `https://api.resend.com/emails`
- Authentication: Bearer token in Authorization header
- Send HTML confirmation email with:
  - Professional template including submitted data
  - Confirmation message
  - Timestamp of submission
  - Contact information
- From address: `FROM_EMAIL` environment variable
- Reply-to: `noreply@bespokeethos.com`

### Error Handling
- Validate all required fields exist and are non-empty
- Validate email format using standard regex or built-in validation
- Validate message length (minimum 10 characters)
- Catch errors from both Airtable and Resend API calls
- Log detailed error information including response bodies
- Return appropriate HTTP status codes:
  - 200: Success (both Airtable and Resend completed)
  - 400: Invalid input/validation error
  - 401: API authentication failure
  - 429: Rate limit exceeded
  - 500: Server error (Airtable or Resend failure)
- Return error messages to client in response body

### Logging & Debugging
- Log the start of function execution with timestamp
- Log validated form data (exclude sensitive info in production)
- Log Airtable request details and response status
- Log Resend request details and response status
- Log any errors with full stack trace
- Use `console.log()` and `console.error()` for Vercel logs

### Security & Best Practices
- Validate and sanitize all user input
- Never log API keys or sensitive tokens
- Use HTTPS only
- Add CORS headers if needed:
  - `Access-Control-Allow-Origin: https://bespokeethos.com`
  - `Access-Control-Allow-Methods: POST, OPTIONS`
  - `Access-Control-Allow-Headers: Content-Type`
- Implement rate limiting logic (optional: return 429 after X submissions per IP in time window)
- Set appropriate Content-Type headers (application/json)

### Response Format
Success response (200):
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "recordId": "[Airtable record ID]",
  "timestamp": "[ISO timestamp]"
}
```

Error response (400, 401, 429, 500):
```json
{
  "success": false,
  "error": "[Specific error message]",
  "code": "[ERROR_CODE]",
  "timestamp": "[ISO timestamp]"
}
```

### Testing Expectations
- Function works locally with `vercel dev` and real credentials
- Function works in production on Vercel deployment
- Both Airtable and Resend receive data simultaneously
- No data loss if one service has temporary latency
- Graceful degradation if one service fails (inform user in response)
- Frontend receives proper status codes for conditional handling

### Code Quality
- Use async/await syntax throughout
- Implement proper try/catch blocks
- Add JSDoc comments for function documentation
- Handle edge cases (empty strings, null values, special characters)
- Use const/let appropriately (no var)
- Follow Next.js API route conventions
- Structure code for readability and maintainability

## Generate the Complete Function

Create the full production-ready Next.js API route handler that satisfies all requirements above. Include all necessary imports, environment variable access, validation logic, error handling, external API calls in correct order, logging statements, and response formatting. The code should be copy-paste ready for `/api/contact.js` in a Next.js project.

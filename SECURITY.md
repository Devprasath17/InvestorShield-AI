# Security Document

## Input Validation
* **Text Input**: Validated for existence, non-empty, and limited to 50,000 characters to prevent excessive memory and token usage.
* **Image Input**: Uses Multer file filtering to accept only `image/jpeg`, `image/png`, and `image/webp`.

## Upload Security
* **File Types**: Restricted strictly to standard image types.
* **Size Limits**: Hard limit of 5 MB enforced per upload via Express request size limit (100kb for JSON) and Multer limits (5MB for images).
* **Cleanup**: Uses `try/finally` in controllers to ensure temporary files are deleted (`fs.unlink`) immediately after OCR completes or if it fails, preventing disk storage accumulation.

## AI Safety
* **Prompt Injection Handling**: The Gemini text prompt includes explicit framing and instructions to treat user content strictly as untrusted data. End-of-content delimiters prevent the model from interpreting user inputs as instructions.
* **Output Validation**: Responses from Gemini are parsed, validated, and normalized before reaching the frontend. Output is typed and structured safely.

## Evidence Integrity
* **Grounding Sources**: Uses Google Search grounding inside Gemini.
* **URL Validation**: Strict `new URL(chunk.web.uri).hostname` checks verify whether sources match official Indian domains (`*.gov.in`, `*.nic.in`, `sebi.gov.in`, `rbi.org.in`). 
* **Evidence Status**: Ensures that "No Evidence Found" is safely represented, and not mapped to "False" incorrectly.

## Database Security
* **Queries**: Result size limits enforced (max 50, default 20) in history endpoints to prevent denial of service through large lookups.
* **No Raw Queries**: No dynamic filter execution or raw user queries passed to MongoDB.
* **Validation**: Validates input types and required fields for analysis records before saving.
* **Safe Errors**: DB failures return 503 instead of crashing the process or returning raw MongoDB stack traces.

## Secrets
* **Environment Variables**: The `.env` file containing `GEMINI_API_KEY` and `MONGODB_URI` is excluded from git via `.gitignore`.
* **Frontend**: No backend secrets are exposed to Vite or the frontend build.

## CORS
* **Allowed Origins**: `cors` middleware is configured to check `NODE_ENV`. In production, it only allows the designated `CLIENT_URL`.

## Rate Limiting
* **Protected Endpoints**: A rate limiter (`express-rate-limit`) limits requests to `/api/analyze`, `/api/verify`, and `/api/history` to 100 requests per 15 minutes per IP to mitigate abuse of expensive OCR/AI/DB operations.

## Privacy
* **Storage**: Uploaded images are strictly temporary and unlinked synchronously after OCR processing. They are not stored permanently.
* **Logging**: Application logs are sanitized and do not output full messages, passwords, API keys, or raw image content to standard output.

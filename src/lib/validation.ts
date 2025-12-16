import { z } from 'zod';

// Checkout validation schema
export const checkoutSchema = z.object({
  plan: z.string().min(1).max(100),
  amount: z.number().positive().max(1000000),
  email: z.string().email(),
  name: z.string().min(1).max(200),
});

// OSINT - Email breaches validation
export const emailBreachesSchema = z.object({
  email: z.string().email(),
});

// OSINT - Company search validation
export const companySearchSchema = z.object({
  siret: z.string().regex(/^\d{14}$/, 'SIRET must be 14 digits').optional(),
  name: z.string().min(2).max(200).optional(),
  domain: z.string().min(2).max(200).optional(),
}).refine(
  (data) => data.siret || data.name || data.domain,
  { message: 'At least one search parameter is required' }
);

// Proposal validation
export const proposalSchema = z.object({
  companyName: z.string().min(1).max(200),
  email: z.string().email(),
  siret: z.string().regex(/^\d{14}$/, 'SIRET must be 14 digits'),
});

// File upload validation schema
export const uploadFileSchema = z.object({
  filename: z.string().min(1).max(255),
  mimeType: z.string().refine(
    (mime) => {
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ];
      return allowedTypes.includes(mime);
    },
    { message: 'File type not allowed' }
  ),
  size: z.number().positive().max(10 * 1024 * 1024), // 10MB max
});

// Dangerous file extensions to block
export const BLOCKED_EXTENSIONS = [
  '.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js', '.jar',
  '.app', '.deb', '.rpm', '.dmg', '.pkg', '.run',
  '.html', '.htm', '.svg', '.xml',
  '.sh', '.bash', '.ps1', '.psm1',
];

// Check if filename has blocked extension
export function hasBlockedExtension(filename: string): boolean {
  const lowerFilename = filename.toLowerCase();
  return BLOCKED_EXTENSIONS.some((ext) => lowerFilename.endsWith(ext));
}

// Validate MIME type matches file extension
export function validateMimeType(filename: string, mimeType: string): boolean {
  const ext = filename.toLowerCase().split('.').pop();
  
  const mimeMap: Record<string, string[]> = {
    'pdf': ['application/pdf'],
    'jpg': ['image/jpeg'],
    'jpeg': ['image/jpeg'],
    'png': ['image/png'],
    'gif': ['image/gif'],
    'doc': ['application/msword'],
    'docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    'xls': ['application/vnd.ms-excel'],
    'xlsx': ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  };

  if (!ext || !mimeMap[ext]) {
    return false;
  }

  return mimeMap[ext].includes(mimeType);
}

// Sanitize filename
export function sanitizeFilename(filename: string): string {
  // Remove path separators and null bytes
  let clean = filename.replace(/[/\\:\0]/g, '_');
  
  // Remove leading dots
  clean = clean.replace(/^\.+/, '');
  
  // Limit length
  if (clean.length > 255) {
    const ext = clean.split('.').pop();
    const nameWithoutExt = clean.substring(0, clean.lastIndexOf('.'));
    clean = nameWithoutExt.substring(0, 250 - (ext?.length || 0)) + '.' + ext;
  }
  
  return clean;
}

// Generate secure random filename
export function generateSecureFilename(originalFilename: string): string {
  const ext = originalFilename.split('.').pop();
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}_${random}.${ext}`;
}

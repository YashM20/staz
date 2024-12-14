# Database Schema Documentation

## Overview
The Staz database schema is designed for efficient bookmark management with support for multi-user environments, collections, and social features.

## Core Tables

### Users Table
Primary user table with moderation-related fields:
```typescript
{
  // Core user fields
  id: uuid
  username: string
  email: string
  role: 'user' | 'admin'
  
  // Moderation fields
  isBlocked: boolean
  blockedAt: timestamp
  blockedBy: uuid (references users)
  blockReason: string
  trustScore: number
  warningCount: number
  lastWarningAt: timestamp
  isSuspended: boolean
  suspendedUntil: timestamp
  suspendedBy: uuid (references users)
  suspensionReason: string
}
```

### Reports (`reports`)
Tracks user reports for content moderation:
```typescript
{
  id: uuid
  reportingUserId: uuid
  reportedEntityId: uuid
  entityType: 'user' | 'link' | 'collection' | 'stash' | 'comment'
  reason: string
  details: string
  status: 'pending' | 'under_review' | 'reviewed' | 'action_taken' | 'dismissed'
  priority: number
  reviewedBy: uuid
  reviewNotes: string
  reviewedAt: timestamp
  actionTaken: string
}
```

### Moderation Actions (`moderation_actions`)
Records moderation actions taken:
```typescript
{
  id: uuid
  userId: uuid
  contentId: uuid
  actionType: 'block' | 'delete' | 'warn' | 'archive' | 'suspend' | 'restore'
  actionReason: string
  moderatorId: uuid
  metadata: jsonb
  createdAt: timestamp
}
```

### Spam Detection (`spam_detection`)
Automated content moderation:
```typescript
{
  id: uuid
  userId: uuid
  contentId: uuid
  contentType: string
  detectedViolation: string
  violationScore: number
  confidence: number
  actionTaken: string
  isAutoResolved: boolean
  metadata: jsonb
  reviewedBy: uuid
  createdAt: timestamp
  resolvedAt: timestamp
}
```

### User Violations (`user_violations`)
Tracks user violation history:
```typescript
{
  id: uuid
  userId: uuid
  violationType: string
  severity: number
  description: string
  actionTaken: string
  expiresAt: timestamp
  createdAt: timestamp
  createdBy: uuid
}
```
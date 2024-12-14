# Content Moderation System

## Overview
Staz includes a comprehensive moderation system to maintain content quality and community standards.

## Features

### 1. User Moderation
- Block/Suspend users with reason tracking
- Warning system with count and timestamp tracking
- Trust score management (0-100)
- Temporary and permanent suspensions with expiration dates
- Complete moderation action history

### 2. Content Reporting
- Multi-category reporting system for users, links, collections, stashes, and comments
- Priority levels (0-5) for reports
- Detailed report tracking with status workflow
- Review notes and status updates by moderators
- Action tracking with timestamps

### 3. Automated Protection
- Spam detection with confidence scoring (0-100)
- Violation scoring system with severity levels
- Auto-resolution capabilities for high-confidence detections
- Manual review system for borderline cases
- Metadata tracking for pattern detection

### 4. User Violations
- Severity-based violation tracking (1-5)
- Time-bound violations with expiration
- Detailed action history with moderator tracking
- Expiration system for temporary actions
- Appeal process tracking

## Implementation

### Database Schema
The moderation system is implemented across several tables:

#### Users Table Extensions
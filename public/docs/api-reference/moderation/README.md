# Moderation API Reference

## Endpoints

### Reports
- `POST /api/moderation/reports`
  Create new content report
- `GET /api/moderation/reports`
  List reports with filtering
- `PATCH /api/moderation/reports/:id`
  Update report status
- `GET /api/moderation/reports/stats`
  Get reporting statistics

### Actions
- `POST /api/moderation/actions`
  Take moderation action
- `GET /api/moderation/actions`
  List moderation actions
- `GET /api/moderation/actions/user/:id`
  Get user's moderation history

### Automated
- `POST /api/moderation/scan`
  Trigger content scan
- `GET /api/moderation/scan/results`
  Get scan results
- `POST /api/moderation/auto-resolve`
  Auto-resolve detected issues

For detailed request/response examples, see [API Examples](./examples.md). 
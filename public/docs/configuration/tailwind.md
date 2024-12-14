# Tailwind Configuration

## Theme Configuration
The project uses a custom Tailwind theme with the following key features:

### Custom Colors
```typescript
colors: {
  cp: {
    paper: {
      DEFAULT: 'hsl(var(--cp-paper))',
      light: 'hsl(var(--cp-paper-light))',
    },
    red: 'hsl(var(--cp-red))',
    yellow: 'hsl(var(--cp-yellow))',
    blue: 'hsl(var(--cp-blue))',
    green: 'hsl(var(--cp-green))',
  }
}
```

### Design System Colors
- Background/Foreground
- Card variants
- Primary/Secondary
- Accent colors
- Destructive states
- Sidebar theming

### Components
The theme extends for component-specific styling:
- Sidebar customization
- Chart colors
- Border radius variants
- Animation utilities 
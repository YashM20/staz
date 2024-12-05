import { ThemeProvider as NextThemeProvider } from 'next-themes'

export function ThemeProvider({ children, ...props }: { children: React.ReactNode, [key: string]: any }) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}


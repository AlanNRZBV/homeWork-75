'use client'
import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import theme from "../theme";
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const queryClient = new QueryClient()

  return (
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline/>
            <html lang="en">
            <body>
            <header>
            </header>
            <main>
              <Container maxWidth="xl" sx={{paddingTop:2}}>
                {children}
              </Container>
            </main>
            </body>
            </html>
          </QueryClientProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
  )
}

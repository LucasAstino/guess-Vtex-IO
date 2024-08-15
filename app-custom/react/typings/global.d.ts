interface Runtime {
  account: string
  culture: {
    country: string
  }
  query: Record<string, string> | undefined
  rootPath: string | undefined
}

export default ({ config }) => {
  return {
    ...config,
    extra: {
      backendUrl: 'http://localhost:8080',
    },
  }
}

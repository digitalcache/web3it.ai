const basePath = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_ROOT_DOMAIN : 'localhost:3000'
export const routes = {
  homePath: process.env.NODE_ENV === "production" ? `https://${basePath}` : `http://${basePath}`,
  viewProjectsPath: '/ideas',
  projectDetailPath: process.env.NODE_ENV === "production" ? `https://%subdomain%.${basePath}` : `http://%subdomain%.${basePath}`,
  createProjectPath: '/generate',
  newIdeaPath: '/new',
}

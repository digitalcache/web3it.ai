const basePath = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_ROOT_DOMAIN : 'localhost:3000'
export const routes = {
  homePath: '/',
  viewProjectsPath: '/ideas',
  projectDetailPath: process.env.NODE_ENV === "production" ? `https://%subdomain%.${basePath}?%query%` : `http://%subdomain%.${basePath}?%query%`,
  createProjectPath: '/create',
  newIdeaPath: '/new-idea',  
}

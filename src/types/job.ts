export interface JobInfo {
  id: string
  title: string
  company: string
  location: string
  salary: string
  province: string
  city: string
  district: string
  region: string
  publishTime: string
  isCollected: boolean
  jobType: string
  requirements: string
  description: string
  end: boolean
}

export interface RegionOption {
  id: string
  name: string
}

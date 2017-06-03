export interface IBlogPost {
  title: string
  url: string
  category?: string // TODO: could come always
  pub_date?: string // TODO: could come always
}

export interface ITogglWorkspace {
}

export interface ITogglUser {
  id: number
  api_token: string
  default_wid: number
  email: string
  fullname: string
  jquery_timeofday_format: string
  jquery_date_format: string
  timeofday_format: string
  date_format: string
  store_start_and_stop_time: boolean
  beginning_of_week: number
  language: string
  image_url: string
  sidebar_piechart: boolean
  at: string
  created_at: string
  retention: number
  record_timeline: boolean
  render_timeline: boolean
  timeline_enabled: boolean
  timeline_experiment: boolean
  newBlogPost?: IBlogPost
  should_upgrade: boolean
  achievements_enabled: boolean
  timezone: string
  openid_enabled: boolean
  send_product_emails: boolean
  send_weekly_report: boolean
  send_timer_notifications: boolean
  last_blog_entry: string
  invitation: {} // TODO: update interface
  workspaces?: ITogglWorkspace[]
  duration_format: string
  obm: {
    included: boolean
    nr: number
    actions: string
  }
}

export interface ITogglAuthenticationResponse {
  since: number
  data: ITogglUser
}

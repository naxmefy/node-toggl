import {defaults, find, has, map} from 'lodash'
import * as cookie from 'cookie'
import * as requestPromise from 'request-promise'
import * as ToggleConstants from './TogglConstants'

export class Toggl {
  private requestOptions: requestPromise.RequestPromiseOptions

  constructor (requestOptions?: requestPromise.RequestPromiseOptions) {
    this.requestOptions = requestOptions || {}
  }

  basicAuth (email: string, password: string, withRelatedData?: boolean) {
    return this.queryAPI({
      uri: 'me',
      method: 'get',
      auth: { username: email, password },
      qs: withRelatedData ? {with_related_data: withRelatedData} : {}
    })
  }

  apiAuth (apiToken: string, withRelatedData?: boolean) {
    return this.basicAuth(apiToken, ToggleConstants.TogglAPITokenPassword)
  }

  apiAuthWithSession (apiToken: string): Promise<any> {
    return this.queryAPI({
      uri: 'sessions',
      method: 'post',
      auth: { username: apiToken, password: ToggleConstants.TogglAPITokenPassword },
      resolveWithFullResponse: true
    })
      .then(response => {
        const cookies = map(response.headers['set-cookie'], cookie.parse)
        return {
          cookie: find(cookies, c => has(c, 'toggl_api_session_new')),
          body: response.body
        }
      })
  }

  private queryAPI (options: requestPromise.OptionsWithUri) {
    options.baseUrl = ToggleConstants.TogglAPIV8URL
    return requestPromise(defaults(options, this.requestOptions, {
      headers: {
        'Content-Type': 'application/json'
      }
    }))
  }
}

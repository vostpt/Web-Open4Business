class Url {
  protocol: string;
  host: string;
  port: number;
  path: string;
  pathParams: object;
  queryParams: object;
  body: object;
}

export class UrlModel extends Url {

  constructor(url?: string) {
    super();

    this.protocol = 'http';
    this.host = '';
    this.port = null;
    this.path = '';
    this.pathParams = {};
    this.queryParams = {};
    this.body = {};

    if (url) {
      this.parseUrl(url);
    }

    return this;
  }


  private clearStartAndEndSlashes(s: string) {
    return s.replace(/(^\/+|\/+$)/g, '');
  }


  getProtocol() {
    return this.protocol;
  }
  setProtocol(protocol: string) {
    this.protocol = protocol.replace(/[^a-zA-Z]+/g, ''); // Keep only letters.
    return this;
  }


  getHost() {
    return this.host;
  }
  setHost(host: string) {
    this.host = this.clearStartAndEndSlashes(host);
    return this;
  }


  getPort() {
    return this.port;
  }
  setPort(port: number) {
    this.port = port;
    return this;
  }


  getPath() {
    return this.path;
  }
  setPath(path: string) {
    this.path += (this.path ? '/' : '') + this.clearStartAndEndSlashes(path);
    return this;
  }

  getPathParams() {
    return this.pathParams;
  }
  setPathParams(params: object) {
    this.pathParams = params;
    return this;
  }


  getQueryParams() {
    return this.queryParams;
  }
  setQueryParams(queryParams: object) {
    this.queryParams = queryParams;
    return this;
  }


  getBody() {
    return this.body;
  }
  setBody(body: object) {
    this.body = body;
    return this;
  }


  buildUrl() {
    // Replace pathParams.
    Object.keys(this.pathParams).forEach(param => {
      this.path = this.path.replace(`:${param}`, this.pathParams[param]);
    });

    // Apply queryParams.
    let queryParams = '';
    queryParams = Object.keys(this.queryParams).filter(key => this.queryParams[key] !== undefined).map(key => key + '=' + this.queryParams[key]).join('&');
    queryParams = (queryParams ? '?' : '') + queryParams;

    return this.protocol + '://' + this.host + (this.port ? ':' + this.port : '') + '/' + this.path + queryParams;
  }


  parseUrl(s: string) {
    const url = new URL(s);
    this.protocol = url.protocol.replace(/[^a-zA-Z]+/g, ''); // Keep only letters.
    this.host = url.hostname;
    this.port = parseInt(url.port, 10);
    this.path = decodeURI(this.clearStartAndEndSlashes(url.pathname));
    this.queryParams = ( url.search ? JSON.parse('{"' + url.search.replace(/&/g, '","').replace(/=/g, '":"').replace('?', '') + '"}', (key, value) => key === '' ? value : decodeURIComponent(value)) : {} );
  }

}

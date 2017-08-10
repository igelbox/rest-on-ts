import * as http from 'http';

export type ResourceKind = 'Namespace' | 'Deployment';

export interface Metadata {
  [details: string]: string,
}

export interface Resource {
  kind: ResourceKind,
  metadata: Metadata,
}

interface AnyMap {
  [key: string]: any,
}

export interface Namespace extends Resource {
  spec: AnyMap,
  status: AnyMap,
}

class KubernetesClient {
  async getNamespace(name: string): Promise<Namespace> {
    return request('GET', ['api', 'v1', 'namespaces', name]);
  }
}

function request(method: string, path: string | string[], data?: any): Promise<any> {
  return new Promise((ff, rj) => {
    const req = http.request({
      host: 'localhost',
      port: 8001,
      path: (path instanceof Array ? '/' + path.map(encodeURIComponent).join('/') : path),
      method,
    }, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk: string) => {
        ff(JSON.parse(chunk));
      });
    });
    req.on('error', rj);
    if (data !== undefined) {
      req.write(data)
    }
    req.end();
  });
}

export default new KubernetesClient();

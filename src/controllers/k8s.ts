import { Route, Get, Example, SuccessResponse } from 'tsoa';

import kc, { Namespace } from '../services/KubernetesClient';

@Route('k8s/namespaces')
export class K8sController {
  @Get('{name}')
  async getNamespace(name: string): Promise<Namespace> {
    return kc.getNamespace(name);
  }
}

import { observable, action, computed, toJS } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { IReactComponent } from 'mobx-react/dist/types/IReactComponent';
import { computedFn } from 'mobx-utils';
import Chance from 'chance';
import 'mobx-react-lite/batchingForReactDom';

type TResourceChildren = Map<string, Resource | Resource[]>;

export type TLoadResourceAction = (
  setData: (data: any) => void,
) => Promise<TResourceChildren | void>;

export type TResourceComponentProps = {
  resource: {
    data: any;
    children: Map<string, Resource | Resource[]>;
    getChildComponent: (
      childName: string,
    ) => {
      Component: IReactComponent<any>;
      resourceId: string;
      isReady: boolean;
    };
    getChildComponents: (
      childName: string,
    ) => {
      Component: IReactComponent<any>;
      resourceId: string;
      isReady: boolean;
    }[];
    isReady: () => boolean;
    id: () => string;
  };
};

export class Resource {
  private component: IReactComponent<any>;

  resourceId: string;

  get id() {
    return this.resourceId;
  }

  @observable
  resourceReady: boolean = false;

  @observable
  children: TResourceChildren = new Map();

  @observable
  data: any;

  @action
  setData(data: any) {
    this.data = data;
  }

  @action
  setChildren(children: TResourceChildren) {
    this.children = children;
  }

  @action
  setResourceReady() {
    this.resourceReady = true;
  }

  constructor(
    loadAction: TLoadResourceAction,
    component: IReactComponent<any>,
  ) {
    this.resourceId = new Chance().hash({ length: 5 });
    loadAction(this.setData.bind(this)).then(children => {
      this.setChildren(children || new Map());
      this.setResourceReady();
    });
    this.component = component;
  }

  @computed
  get isReady(): boolean {
    let flat: Resource[] = [];
    this.children.forEach((resources: Resource | Resource[]) => {
      flat = [
        ...flat,
        ...(Array.isArray(resources) ? resources.slice() : [resources]),
      ];
    });
    const isReady =
      this.resourceReady &&
      flat.every((resource: Resource) => resource.isReady);
    return isReady;
  }

  getChildComponent = computedFn((childName: string) => {
    const resource = this.children.get(childName) as Resource;
    return {
      Component: resource?.getComponent(),
      resourceId: resource?.resourceId,
      isReady: resource?.isReady,
    };
  });

  getChildComponents = computedFn(
    (childName: string) =>
      (this.children.get(childName) as Resource[])?.map(childResource => ({
        Component: childResource.getComponent(),
        resourceId: childResource.resourceId,
        isReady: childResource.isReady,
      })) || [],
  );

  getComponent() {
    const ObserverComponet = observer(this.component);
    return (props: any) => (
      <ObserverComponet key={this.resourceId} resource={this} {...props} />
    );
  }
}

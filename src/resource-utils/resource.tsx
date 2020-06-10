import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { IReactComponent } from 'mobx-react/dist/types/IReactComponent';
import { computedFn } from 'mobx-utils';

export type TLoadResourceAction = (
  setData: (data: any) => void,
  setChildren: (childName: string, children: Resource | Resource[]) => void,
  setResourceReady: () => void,
) => void;

export type TResourceComponentProps = {
  resource: {
    data: any;
    children: Map<string, Resource | Resource[]>;
    getChildComponent: (childName: string) => IReactComponent<any>;
    getChildComponents: (childName: string) => IReactComponent<any>[];
  };
};

export class Resource {
  private component: IReactComponent<any>;

  @observable
  resourceReady: boolean = false;

  @observable
  children: Map<string, Resource | Resource[]> = new Map();

  @observable
  data: any;

  @action
  setData(data: any) {
    this.data = data;
  }

  @action
  setChildren(childName: string, children: Resource | Resource[]) {
    this.children.set(childName, children);
  }

  @action
  setResourceReady() {
    this.resourceReady = true;
  }

  constructor(
    loadAction: TLoadResourceAction,
    component: IReactComponent<any>,
  ) {
    loadAction(
      this.setData.bind(this),
      this.setChildren.bind(this),
      this.setResourceReady.bind(this),
    );
    this.component = component;
  }

  getChildComponent = computedFn((childName: string) =>
    (this.children.get(childName) as Resource)?.getComponent(),
  );

  getChildComponents = computedFn(
    (childName: string) =>
      (this.children.get(childName) as Resource[])?.map(childResource =>
        childResource.getComponent(),
      ) || [],
  );

  getComponent() {
    const ObserverComponet = observer(this.component);
    return (props: any) => <ObserverComponet resource={this} {...props} />;
  }
}

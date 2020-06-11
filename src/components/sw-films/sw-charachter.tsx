import React from 'react';
import {
  Resource,
  TLoadResourceAction,
  TResourceComponentProps,
} from '../../resource-utils/resource';
import { api } from '../../api';

const getCharacther = (charactherUrl: string) =>
  api.get(charactherUrl).then(({ data }) => {
    return data;
  });

export const loadSWCharactherResource = (charactherUrl: string) => {
  const loadAction: TLoadResourceAction = async setData => {
    const characther = await getCharacther(charactherUrl);
    setData(characther);
  };

  interface SWCharactherProps extends TResourceComponentProps {}

  const SWCharacther = ({ resource }: SWCharactherProps) => {
    if (!resource.data) {
      return null;
    }
    return (
      <div>
        <div>{resource.data.name}</div>
      </div>
    );
  };

  return new Resource(loadAction, SWCharacther);
};

import React from 'react';
import {
  Resource,
  TLoadResourceAction,
  TResourceComponentProps,
} from '../../resource-utils/resource';
import axios from 'axios';

const getCharacther = (charactherUrl: string) =>
  axios.get(charactherUrl).then(({ data }) => data);

export const loadSWCharactherResource = (charactherUrl: string) => {
  const loadAction: TLoadResourceAction = async (
    setData,
    setChildren,
    setResourceReady,
  ) => {
    const characther = await getCharacther(charactherUrl);
    setData(characther);
    setResourceReady();
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

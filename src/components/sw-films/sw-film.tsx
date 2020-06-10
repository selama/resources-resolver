import React from 'react';
import {
  Resource,
  TLoadResourceAction,
  TResourceComponentProps,
} from '../../resource-utils/resource';

export const loadSWFilmResource = (film: any) => {
  const loadAction: TLoadResourceAction = async (
    setData,
    setChildren,
    setResourceReady,
  ) => {
    setData(film);
    setResourceReady();
  };

  interface SWFilmProps extends TResourceComponentProps {}

  const SWFilm = ({ resource }: SWFilmProps) => {
    if (!resource.data) {
      return null;
    }
    return <div>{resource.data.title}</div>;
  };

  return new Resource(loadAction, SWFilm);
};

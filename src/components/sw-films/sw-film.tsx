import React from 'react';
import {
  Resource,
  TLoadResourceAction,
  TResourceComponentProps,
} from '../../resource-utils/resource';
import { loadSWCharactherResource } from './sw-charachter';

export const loadSWFilmResource = (film: any) => {
  const loadAction: TLoadResourceAction = (
    setData,
    setChildren,
    setResourceReady,
  ) => {
    setData(film);
    setResourceReady();
    const childResources = film.characters.map(loadSWCharactherResource);
    setChildren('characters', childResources);
  };

  interface SWFilmProps extends TResourceComponentProps {}

  const SWFilm = ({ resource }: SWFilmProps) => {
    return (
      <div>
        <h2>{resource.data.title}</h2>
        <div>
          {resource
            .getChildComponents('characters')
            .map(({ Component: Charachter, resourceId, isReady }) => (
              <div key={resourceId}>
                {isReady ? <Charachter /> : <div>loading charecther</div>}
              </div>
            ))}
        </div>
      </div>
    );
  };

  return new Resource(loadAction, SWFilm);
};

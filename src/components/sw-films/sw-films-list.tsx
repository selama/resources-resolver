import React from 'react';
import { IReactComponent } from 'mobx-react/dist/types/IReactComponent';
import {
  Resource,
  TLoadResourceAction,
  TResourceComponentProps,
} from '../../resource-utils/resource';
import axios from 'axios';
import { loadSWFilmResource } from './sw-film';

const getFilms = () =>
  axios.get(`https://swapi.dev/api/films/`).then(({ data }) => data);

export const loadSWFilmsListResource = () => {
  const loadAction: TLoadResourceAction = async (
    setData,
    setChildren,
    setResourceReady,
  ) => {
    const films = await getFilms();
    const childResources = films.results.map(loadSWFilmResource);
    setChildren('films', childResources);
    setData(films);
    setResourceReady();
  };

  interface SWFilmsListProps extends TResourceComponentProps {}

  const SWFilmsList = ({ resource }: SWFilmsListProps) => {
    return (
      <div>
        <h1>films count: {resource.data?.count}</h1>
        {resource
          .getChildComponents('films')
          .map((Film: IReactComponent<any>) => {
            return (
              <div>
                <Film />
                <hr />
              </div>
            );
          })}
      </div>
    );
  };

  return new Resource(loadAction, SWFilmsList);
};

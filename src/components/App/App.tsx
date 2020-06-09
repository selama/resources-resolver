import React from 'react';
import { withTranslation, WithTranslation } from '@wix/wix-i18n-config';
import s from './App.scss';

interface AppProps extends WithTranslation {}

class App extends React.Component<AppProps> {
  render() {
    const { t } = this.props;

    return (
      <div className={s.root}>
        <h2 className={s.title} data-hook="app-title">
          {t('app.title', { who: 'Yoshi' })}
        </h2>
      </div>
    );
  }
}

export default withTranslation()(App);

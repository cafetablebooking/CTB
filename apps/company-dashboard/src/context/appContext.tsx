import React from 'react';
import { AppContextPropsType } from '@ctb/types';
import defaultConfig from './ThemeSetting/defaultConfig';

export default React.createContext<AppContextPropsType>(defaultConfig);

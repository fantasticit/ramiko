import { Tracking } from './functions/Tracking';

import { plugins } from 'views/editor';

plugins.functions.register('Tracking', Tracking);

plugins.functions.addToGroup('埋点', ['Tracking']);

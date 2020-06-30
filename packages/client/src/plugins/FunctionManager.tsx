import { plugins } from '@/views/editor';
import { Tracking } from './functions/Tracking';

plugins.functions.register('Tracking', Tracking);

plugins.functions.addToGroup('埋点', ['Tracking']);

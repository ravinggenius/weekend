import hyper from 'hyperhtml';

import tick from './components/tick';

setInterval(tick, 1000 / 20, hyper(document.querySelector('main')));

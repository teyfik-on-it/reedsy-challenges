import dev from './dev';
import prod from './prod';

let env;

if (process.env.NODE_ENV === 'production') {
  env = Object.freeze(prod);
} else {
  env = Object.freeze(dev);
}

export default env;

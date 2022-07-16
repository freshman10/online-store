import { buildPage } from './components/buildPage';
import '../src/global.css';
import { runController } from './components/controller/runController';
import { selfCheck } from './constants/constants';

buildPage();
runController();
console.log(selfCheck);

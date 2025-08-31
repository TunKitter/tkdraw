import './css/main.css'
import { initMoveable } from './models/enities/Moveable'
import { initSelecto } from './models/enities/Selecto';
import { initInfiniteView } from './models/enities/InfiniteView';
import createTextSkeleton from './models/skeleton/Text';
import { initToolbar } from './models/Toolbar';
import createSkeletonFromToolbar from './flow/createSkeletonFromToolbar';
import { initBody } from './general';

initBody()
initMoveable()
initSelecto()
initInfiniteView()
initToolbar()
createSkeletonFromToolbar(0, () => createTextSkeleton('Hello'))
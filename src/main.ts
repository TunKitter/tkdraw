import './css/main.css'
import { initMoveable } from './models/enities/Moveable'
import { initSelecto } from './models/enities/Selecto';
import { initInfiniteView } from './models/enities/InfiniteView';
import createTextSkeleton from './models/skeletons/Text';
import { initToolbar } from './models/Toolbar';
import createSkeletonFromToolbarAndProperty from './flow/createSkeletonFromToolbar';
import { initBody } from './general';
import SkeletonProperty from './models/enities/SkeletonProperty';

initBody()
initMoveable()
initSelecto()
initInfiniteView()
initToolbar()
createSkeletonFromToolbarAndProperty(0, () => createTextSkeleton('Hello'), new SkeletonProperty())
import './css/main.css'
import { initMoveable } from './models/enities/Moveable'
import { initSelecto } from './models/enities/Selecto';
import { initInfiniteView } from './models/enities/InfiniteView';
import { initToolbar } from './models/Toolbar';
import { initBody, initSkeletonProperty } from './general';
import createSkeletonFromToolbarAndProperty from './flow/createSkeletonFromToolbar';
import SkeletonProperty from './models/enities/SkeletonProperty';
import createTextSkeleton from './models/skeletons/Text';

(async () => {
    initBody()
    initMoveable()
    initSelecto()
    initInfiniteView()
    initToolbar()
    await initSkeletonProperty()
    createSkeletonFromToolbarAndProperty(0, () => createTextSkeleton('Hello'), new SkeletonProperty())

})()
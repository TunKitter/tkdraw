import './css/main.css'
import { initMoveable } from './models/enities/Moveable'
import { initSelecto } from './models/enities/Selecto';
import { initInfiniteView } from './models/enities/InfiniteView';
import { initToolbar } from './models/Toolbar';
import { initBody, initSkeletonProperty } from './general';
import createTextSkeletonAndPropertyFlow from './models/skeletons/Text';
import createShapeSkeletonAndPropertyFlow from './models/skeletons/Shape';

(async () => {
    initBody()
    initMoveable()
    initSelecto()
    initInfiniteView()
    initToolbar()
    await initSkeletonProperty()
    createTextSkeletonAndPropertyFlow()
    createShapeSkeletonAndPropertyFlow()
})()
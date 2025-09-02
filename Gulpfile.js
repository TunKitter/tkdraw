import { src } from "gulp";
import through2 from "through2";
import fs from "fs";
function mergePropertyItem() {
    let html = ''
    return src('./src/html/property_items/*.html').pipe(through2.obj(function (file, _, cb) {
        html += (file.contents.toString());
        cb(null, html);
    })).pipe(through2.obj(function (file, _, cb) {
        fs.writeFileSync('./src/html/bundles/property_item.html', html);
        cb()
    }))
}

export default mergePropertyItem

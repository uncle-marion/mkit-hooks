import { useState } from "react";
var useUpdate = function () {
    var _a = useState(), setFlag = _a[1];
    var update = function () {
        setFlag(Date.now());
    };
    return update;
};
export default useUpdate;

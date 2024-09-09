import { useState } from "react";


/*좋아요 */
export function useLike() { //custom hook
    let [like, setLike] = useState(0);
    function addLike() {
        setLike(a => a + 1)
    }

    return [like, addLike];
}
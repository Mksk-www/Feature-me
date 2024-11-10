export default (conditionFunction:()=>boolean)=> {
    return new Promise<void>((resolve) => {
        function checkCondition() {
            if (conditionFunction()) {
                resolve();
            } else {
                requestAnimationFrame(checkCondition);
            }
        }
        checkCondition();
    });
}





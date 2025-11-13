window.addEventListener('load', function () {
    const holeBlack = document.getElementById('holeBlack');
    let w='';
    let h='';
    let centerX='';
    let centerY='';
    const maxorbit = 255;

    const ResizeObserverHole = new ResizeObserver(entries => {
        for (let entry of entries) {
            const div= entry.target;
            const rect= div.getBoundingClientRect();
            requestAnimationFrame(() => {
                console.log(rect.width, rect.height);
                w=`${rect.width}px`;
                h=`${rect.height}px`;
                centerX=`${rect.width / 2}px`;
                centerY=`${rect.height / 2}px`;
            });
        } 
    });
    ResizeObserverHole.observe(holeBlack);
});
(()=>{

    let yOffset = 0;

    const sectionSet = [
        {
            height: 0,            
            hMultiple: 2,

            objs : {
                container : document.querySelector('#section-0'),


            },
        },
        {

            height: 0,
            hMultiple: 2,
            objs : {
                container : document.querySelector('#section-1'),


            },

        }
    ];

    const setLayout = function()
    {
        for (let i = 0; i < sectionSet.length; i++)
        {
            sectionSet[i].height = window.innerHeight * sectionSet[i].hMultiple;
            sectionSet[i].objs.container.style.height = `${sectionSet[0].height}px`;
        }

    }


    window.addEventListener('scroll', ()=>{
        yOffset = window.scrollY;

    });

    window.addEventListener('load', ()=>{
        console.log('CALL load()');
        setLayout();

    });

    window.addEventListener('resize', ()=>{
        console.log('resize()');
        setLayout();
        console.log(sectionSet[0].height);

    });




})();
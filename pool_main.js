(()=>{

    let yOffset = 0;
    let sectionYOffset = 0;  
    let currentSection = 0;

    const sectionSet = [
        {
            height: 0,            
            hMultiple: 5,

            objs : {
                container : document.querySelector('#section-0'),
                messageA : document.querySelector('.section0-message.a'),
                messageB : document.querySelector('.section0-message.b'),
                messageC : document.querySelector('.section0-message.c'),
                messageD : document.querySelector('.section0-message.d'),

            },
            vals : {
                messageA_opacity_in     : [0, 1, {start: 0.09, end: 0.19}],
                messageA_opacity_out    : [1, 0, {start: 0.21, end: 0.29}],
                messageA_translateY_in  : [0, -15, {start: 0.09, end: 0.19}],
                messageA_translateY_out : [-15, -30, {start: 0.21, end: 0.29}],
            
                messageB_opacity_in     : [0, 1, {start: 0.31, end: 0.39}],
                messageB_opacity_out    : [1, 0, {start: 0.41, end: 0.49}],
                messageB_translateY_in  : [0, -15, {start: 0.31, end: 0.39}],
                messageB_translateY_out : [-15, -30, {start: 0.41, end: 0.49}],
           
                messageC_opacity_in     : [0, 1, {start: 0.51, end: 0.59}],
                messageC_opacity_out    : [1, 0, {start: 0.61, end: 0.69}],
                messageC_translateY_in  : [0, -15, {start: 0.51, end: 0.59}],
                messageC_translateY_out : [-15, -30, {start: 0.61, end: 0.69}],

                messageD_opacity_in     : [0, 1, {start: 0.71, end: 0.79}],
                messageD_opacity_out    : [1, 0, {start: 0.81, end: 0.85}],
                messageD_translateY_in  : [0, -15, {start: 0.71, end: 0.79}],
                messageD_translateY_out : [-15, -30, {start: 0.81, end: 0.85}],

            }
        },
        {

            height: 0,
            hMultiple: 5,
            objs : {
                container : document.querySelector('#section-1'),
            },
            vals : {
            }

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

      // ?????? ????????? ???????????? ??????.
      const getCurrentSection = function()
      {
          let section = 0;
  
          if (yOffset <= sectionSet[0].height)
          {
              section = 0;
  
          }
          else if ((yOffset > sectionSet[0].height) && 
                   (yOffset <= sectionSet[0].height + sectionSet[1].height))        
          {
              section = 1;
          }
          else
          {
  
          }
  
          return section;
  
      }
  
      // body????????? ???????????? ???????????? ??????
      const setBodyID = function(section)
      {
          document.body.setAttribute('id', `show-section${section}`);
  
      }
  
      const setLocalnavMenu = function(offset)
      {
          if (offset > 44)
          {
              document.body.classList.add('main-nav-sticky');
              
          }
          else
          {
              document.body.classList.remove('main-nav-sticky');
  
          }
  
      }
  
      // ?????? ????????? ?????? ?????????
      const getPrevSectionHeight = function()
      {
          let prevHeight = 0;
  
          for (let i = 0; i < currentSection; i++)
          {
              prevHeight = prevHeight + sectionSet[i].height;
          }
          
          return prevHeight;
      }
  
  
      const calcValue = function(values)
    {
        let result;

        const height = sectionSet[currentSection].height;
        let rate;

        let partStart;      // ?????? start???
        let partEnd;        // ?????? end???
        let partHeight;     // ??????.

        if (values.length == 2)
        {
            rate = sectionYOffset / height;
            result = (rate * (values[1] - values[0])) + values[0];

        }
        // start, end?????? ????????? ??????. [0, 1, {start: 0.1, end: 0.2}],
        else if (values.length === 3) 
        {
            partStart = values[2].start * height;
            partEnd   = values[2].end * height;
            partHeight = partEnd - partStart;

            if (sectionYOffset < partStart)
            {
                result = values[0];

            }
            else if (sectionYOffset > partEnd)
            {
                result = values[1];

            }
            else
            {
                rate = (sectionYOffset - partStart) / partHeight;
                result = (rate * (values[1] - values[0])) + values[0]
               
            }
           
        }

        return result;

    }


    const playAnimation = function()
    {
        const values  = sectionSet[currentSection].vals;
        const objects = sectionSet[currentSection].objs;
        const scrollRate = sectionYOffset / sectionSet[currentSection].height;
        let transY = 0;

        switch(currentSection)
        {
            case 0 :
                objects.messageA.style.opacity = 0;
                objects.messageB.style.opacity = 0;
                objects.messageC.style.opacity = 0;
                objects.messageD.style.opacity = 0;


                if (scrollRate <= 0.2)
                {
                    // messageA
                    // [0, 1, {start: 0.09, end: 0.19}],
                    objects.messageA.style.opacity = calcValue(values.messageA_opacity_in);

                    transY = calcValue(values.messageA_translateY_in);
                    objects.messageA.style.transform = `translateY(${transY}%)`;
                

                }
                else if ((scrollRate > 0.2) && (scrollRate <= 0.3))
                {
                    //[1, 0, {start: 0.21, end: 0.29}],
                    objects.messageA.style.opacity = calcValue(values.messageA_opacity_out);
                   
                    transY = calcValue(values.messageA_translateY_out);
                    objects.messageA.style.transform = `translateY(${transY}%)`;
                

                }
                else if ((scrollRate > 0.3) && (scrollRate <= 0.4))
                {
                    // [0, 1, {start: 0.31, end: 0.39}]            
                    objects.messageB.style.opacity = calcValue(values.messageB_opacity_in);
                
                    transY = calcValue(values.messageB_translateY_in);
                    objects.messageB.style.transform = `translateY(${transY}%)`;
                

                }
                else if ((scrollRate > 0.4) && (scrollRate <= 0.5))
                {
                    // [1, 0, {start: 0.41, end: 0.49}],
                    objects.messageB.style.opacity = calcValue(values.messageB_opacity_out);

                    transY = calcValue(values.messageB_translateY_out);
                    objects.messageB.style.transform = `translateY(${transY}%)`;
                
                }
                else if ((scrollRate > 0.5) && (scrollRate <= 0.6))
                {
                    // [0, 1, {start: 0.51, end: 0.59}]
                    objects.messageC.style.opacity = calcValue(values.messageC_opacity_in);

                    transY = calcValue(values.messageC_translateY_in);
                    objects.messageC.style.transform = `translateY(${transY}%)`;
                

                }
                else if ((scrollRate > 0.6) && (scrollRate <= 0.7))
                {                    
                    // [1, 0, {start: 0.61, end: 0.69}]            
                    objects.messageC.style.opacity = calcValue(values.messageC_opacity_out);

                    transY = calcValue(values.messageC_translateY_out);
                    objects.messageC.style.transform = `translateY(${transY}%)`;
                
                }
                else if ((scrollRate > 0.7) && (scrollRate <= 0.8))                
                {   
                    // [0, 1, {start: 0.71, end: 0.79}]
                    objects.messageD.style.opacity = calcValue(values.messageD_opacity_in);

                    transY = calcValue(values.messageD_translateY_in);
                    objects.messageD.style.transform = `translateY(${transY}%)`;
                
                
                }
                else if ((scrollRate > 0.8) && (scrollRate <= 0.9))                
                {
                    // [1, 0, {start: 0.81, end: 0.85}            
                    objects.messageD.style.opacity = calcValue(values.messageD_opacity_out);
                    transY = calcValue(values.messageD_translateY_out);

                    objects.messageD.style.transform = `translateY(${transY}%)`;
                
                }
                

                break;


            case 1 :
                // 1??? ????????? ??????????????? ??????                             
                break;


        }

    }

    // ???????????? ?????? ???????????? ????????? ?????????...
    const scrollProc = function()
    {
        playAnimation();

    }

    ///////////////////////////////////////////////////////////////////////////////
    // Event Handler

    // ????????? ?????????
    window.addEventListener('scroll', ()=>{

        yOffset = window.scrollY;
        currentSection = getCurrentSection();
        sectionYOffset = yOffset - getPrevSectionHeight();

        setBodyID(currentSection);        
        setLocalnavMenu(yOffset);

        scrollProc();   

    });

    // ?????? ????????? (???????????? ?????? ????????? ???)
    window.addEventListener('load', ()=>{        
        setLayout();

        currentSection = getCurrentSection();
        sectionYOffset = yOffset - getPrevSectionHeight();

        setBodyID(currentSection);
        setLocalnavMenu(yOffset);

    });

    // ???????????? ????????? ?????? ???
    window.addEventListener('resize', ()=>{       
        setLayout();        
        
        currentSection = getCurrentSection();
        sectionYOffset = yOffset - getPrevSectionHeight();
        
        setBodyID(currentSection);
        setLocalnavMenu(yOffset);

    });


})();

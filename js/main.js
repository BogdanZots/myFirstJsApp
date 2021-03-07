
window.addEventListener('DOMContentLoaded',()=>{
//TABS
const tabs = document.querySelectorAll('.tabheader__item'),
tabsContent = document.querySelectorAll('.tabcontent'), 
tabsPartent = document.querySelector('.tabheader__items');
    function hideTabs(){
        tabsContent.forEach((item,i)=>{
            item.style.display="none";
        })
    tabs.forEach(tab=>{
        if(tab.classList.contains('tabheader__item_active')){
            tab.classList.remove('tabheader__item_active')
        }
    })
    }
    function showTabs(i=0){
    tabsContent[i].style.display="block";
    tabs[i].classList.add('tabheader__item_active')
    }
    hideTabs();
    showTabs();
    tabsPartent.addEventListener("click",(e)=>{
        const target = e.target;
        tabs.forEach((item,i)=>{
            if(target == item){
                hideTabs();
                showTabs(i);
            }
        })
    }) 
// Timer
//Я нихуя не понял что тут написано !!!
const deadline = "2021-05-11";
console.log(new Date())
function getTimeRemaining(endtime){
const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t/(1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 *60) % 24)),
      minutes = Math.floor((t/1000/60) % 60),
      seconds = Math.floor((t/1000) % 60);
      return{
      'total':t,
      'days':days,
      'hours':hours,
      'minutes':minutes,
      'seconds':seconds,
      };
  }
   function setClock(selector,endtime){
  const timer = document.querySelector(selector);
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock,1000);
        function updateClock(){
            const t = getTimeRemaining(endtime);
            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;
            if(t.total <= 0 ){
                clearInterval(timeInterval);
            }
        }
   }
   setClock('.timer',deadline);
   //Modal window
   const modalTrigger = document.querySelectorAll('[data-modal]'),
         modal = document.querySelector('.modal');
         function closeModal(){
            modal.style.display="none";
         };
         function showModal(){
            modal.style.display="block";
            clearInterval(modalTimerId);
         };
         function showModalOnce(){
            if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
                showModal();
                window.removeEventListener('scroll',showModalOnce);
            }
        }
        document.addEventListener('scroll',showModalOnce);
         modalTrigger.forEach(btn=>{
           btn.addEventListener('click',showModal);
         });
         modal.addEventListener('click',(e)=>{
             if(e.target == modal || e.target.getAttribute('data-close') == '' ){
                 closeModal();
             document.removeEventListener('scroll',showModalOnce);
             }
         });
         document.addEventListener('keydown',(e)=>{
             if(e.code === "Escape"){
                document.removeEventListener('scroll',showModalOnce);
                closeModal();
             } 

         });
    const modalTimerId = setTimeout(showModal,15000)

    // AJAX--SERVER
    
    const forms = document.querySelectorAll('form');
    const message = {
        loading : 'img/form/spinner.svg',
        success : 'Thank you , see you soon',
        failure : 'Ooopss.. Somthing went wrong..'
    }
    forms.forEach(item =>{
        postData(item);
    })
    function postData(form){
     form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
     display:block;
     margin:0 auto;
      `
      form.append(statusMessage);
      const formData = new FormData(form);
    //   const request = new XMLHttpRequest();
    //   request.open('POST','server.php');
    //   request.setRequestHeader('Content-type','application/json');
    //   const formData = new FormData(form);
    //   const object = {};
    //   formData.forEach(function(value,key){
    //       object[key]=value;
    //   });
    //   JSON.stringify(object);
    //   request.send(JSON.stringify(object));
      fetch('server.php',{
        method:'POST',
        // headers:{
        //   'Content-type':'application/json'
        // },
        body:formData
    }).then(data=>data.text())
    .then(data =>{
            console.log(data)
                console.log(data);
                showThanksModal(message.success);
                
                 statusMessage.remove();
        }).catch(()=>{
            showThanksModal(message.failure);
        }).finally(()=>{
            form.reset();
        })
  
    //   request.addEventListener('load',()=>{
    //       console.log(request.status)
    //       if(request.status === 200){
    //           console.log(request.response);
    //           showThanksModal(message.success);
    //           form.reset();
    //            statusMessage.remove();
    //       }
    //       else{
    //           showThanksModal(message.failure);
    //       }
    //   });
      })
     }
//FETCh
// fetch('https://jsonplaceholder.typicode.com/posts',{
//     method :'POST',
//     body:JSON.stringify({name:'Alex'}),
//     headers:{
//         'Content-type':'application/json'
//     }
// })
// .then(response => response.json())
// .then(json => console.log(json));
///////////////////
//     function User(name,id){ // +- понял
//         this.name = name;
//         this.id = id;
//         this.human = true;
//     }
//     let ivan = new User('i',2)
//    console.log(ivan);
// нихуя не понял 
//    class Rectangle{
//        constructor(heigth,width){
//         this.heigth = heigth;
//         this.width = width;
//        }
//        calcArea(){
//            return this.heigth * this.width;
//        }
//    }
//    class ColoredRectangleWithText extends Rectangle{
//        constructor(heigth,width,text,bgColor){
//         super(heigth,width);
//         this.text = text;
//        }
//    }
//    const squary = new Rectangle(10,20);
//    console.log(squary.calcArea());
// const persone = {
//     name:"alex",
//     tel:"+4444444"
// };
// console.log(JSON.parse(JSON.stringify(persone)));
// const req = new Promise(function(resolve,reject){
//  setTimeout(() => {
//      console.log('Подготовка данных');
//      const product = {
//          name :'TV',
//          price:2000
//      };
//      resolve(product);
//      console.log(resolve.state);

//  }, 2000);
// })
// req.then((product)=>{
//  const req2= new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         product.status='order';
//         resolve(product); 
//     }, 2000);
//  });
//  req2.then(data=>{
//      console.log(data);
//  });
// })
// Методы массиовов

//Filter

// const names = ['Ivan','Ann','Ksenia','Voldemart'];
// const shortNames = names.filter(function(name){
// return name.length < 5;
// });
// console.log(names)
// console.log(shortNames);

// MAP

// let answers = ['Ivan','AnnA','Hello'];
// const toLowwerCase = answers.map(item =>{
// return item.toLowerCase();
// });
// console.log(toLowwerCase)
// console.log(answers)

//EVERY/SOME
// const some = [4,'q3q3','3q3q'];
// console.log(some.some(item=>{
//     return typeof(item) === 'number';
// }))
// const every = [4,'eqeq','eqeq'];
// console.log(every.every(item=>{
//     return typeof(item) === 'number';
// }))
//REDUCE
// const arr = [4,5,6,1,3,2,6];
//                           //0    //4
//                           //4    //5
//                           //9    //1
// const result = arr.reduce((sum,currect) => sum + currect);
// console.log(result)
// const arr = ['apple','pear','plum'];
// const result = arr.reduce((sum,current)=> `${sum} , ${current}`)
// console.log(result)
 function showThanksModal(message){
     const prevModalDialog = document.querySelector('.modal__dialog');
     prevModalDialog.style.display="none";
     showModal();
     const thanksModal = document.createElement('div');
     thanksModal.classList.add('modal__dialog');
     thanksModal.innerHTML=`
     <div class="modal__content">
     <div class="modal__close" data-close>×</div>
     <div class="modal__title">${message}</div>
     </div>
     `;
     document.querySelector('.modal').append(thanksModal);
     setTimeout(() => {
     thanksModal.remove();
     prevModalDialog.style.display="block";
     closeModal();
     },4000);
 }
 fetch('http://localhost:3000/menu',{
     mode:'cors',
     headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://jsonplaceholder.typicode.com/todos/1',
'Access-Control-Expose-Headers': 'Content-Length,API-Key',
        "Access-Control-Allow-Origin" : "*", 
"Access-Control-Allow-Credentials" : true 
      }
    })
    .then(data=>data.json())
 .then(res=>console.log(res));





 const slideButtonNext = document.querySelector('.offer__slider-next'),
       slideButtonPrev = document.querySelector('.offer__slider-prev'),
       currentSliderNumber = document.querySelector('#current'),
       slides = document.querySelectorAll('.offer__slide'),
       slideWrapper  = document.querySelector('.offer__slider-wrapper'),
       sliderField = document.querySelector('.offer__slider-inner'),
       width = window.getComputedStyle(slideWrapper).width;
     let slideIndex = 1;
     let offset = 0;
     currentSliderNumber.innerHTML = `${slideIndex}`;
     sliderField.style.width=100 * slides.length + '%';
     sliderField.style.display='flex';
     sliderField.style.transition='0.5s all';


     slideWrapper.style.overflow='hidden';
     slides.forEach(slide =>{
         slide.style.width = width;
     })

     slideButtonPrev.addEventListener('click',()=>{
         console.log(slideIndex)
        currentSliderNumber.innerHTML = `${--slideIndex}`;
        if(slideIndex <= 1 ) slideIndex = 4;
        if(offset == 0){
            offset = +width.slice(0,width.length - 2) * (slides.length - 1);
        }
        else{
            offset -= +width.slice(0,width.length - 2);
        }
     sliderField.style.transform = `translateX(-${offset}px)`;
    })
    slideButtonNext.addEventListener('click',()=>{
        currentSliderNumber.innerHTML = `${slideIndex++}`;
        if(slideIndex > slides.length) slideIndex = 1;
        if(offset == +width.slice(0,width.length - 2) * (slides.length - 1)){
            offset = 0;
        }
        else{
            offset += +width.slice(0,width.length - 2);
        }
     sliderField.style.transform = `translateX(-${offset}px)`;
    }) 
/*      currentSliderNumber.innerHTML = `${slideIndex}`;
     showSlide(slideIndex)
   function showSlide(n){
       if(n > slides.length){
           slideIndex = 1;
        }
        if( n < 1 ){
            slideIndex = slides.length;
        }
        slides.forEach(item => item.style.display='none');
        slides[slideIndex - 1].style.display='block';
        currentSliderNumber.innerHTML = `${slideIndex}`;
   }
   function plusSlides(n){
       showSlide(slideIndex += n);
   }
   slideButtonPrev.addEventListener('click',()=>{
       plusSlides(-1);
   })
   slideButtonNext.addEventListener('click',()=>{
       plusSlides(1);
   }) */ 

   //Calc

   const result = document.querySelector('.calculating__result span');
   let sex,heigth,weight,age,ratio;

   function calcTotal(){
    if(!sex || !heigth || !weight || !age || !ratio){
        result.textContent = "Введены не все данные";
        return;
    }
    if(sex === 'female'){
        result.innerHTML = (447.6 * (9.2 * weight) + (3.1 * heigth) - (4.3 * age)) * ratio;
    }
    else{
        result.innerHTML = (88.36 + (13.4 * weight) + (4.8 * heigth) - (5.7 * age)) * ratio;
    }
   }
   calcTotal();

   function getStaticInformation(parentSelector,activeClass){
    const elements = document.querySelectorAll(`${parentSelector} div`);

    document.querySelector(parentSelector).addEventListener('click',(e)=>{
    if(e.target.getAttribute('data-ratio')){
        ratio = +e.target.getAttribute('data-ratio');
    } 
    })
   }
});
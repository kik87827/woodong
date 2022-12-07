document.addEventListener("DOMContentLoaded", function() {
  commonInit();
  commonEvent();
  commonForm();
  bottomLayer();
});
window.addEventListener("load", function() {});

function commonInit() {
  let touchstart = "ontouchstart" in window;
  let userAgent = navigator.userAgent.toLowerCase();
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf('samsung') > -1) {
    browserAdd("samsung");
  }

  if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }


  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}

function commonEvent() {
  const page_wrap2 = document.querySelector(".page_wrap.layout_type2");
  let windowWidth = 0;
  window.addEventListener("resize", () => {
    if (windowWidth === window.innerWidth) {
      return;
    }
    setVh();
    windowWidth = window.innerWidth;
  });
  window.addEventListener("touchmove",()=>{
    if(window.scrollY === 0){
      setVh();
    }
  });

  commonTitle();

  function setVh(){
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    function action(){
      if(page_wrap2 == null){return;}
      page_wrap2.style.minHeight = `${window.innerHeight}px`;
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    action();
  };

  
  function commonTitle(){
    const header_wrap = document.querySelector(".header_wrap");
    const headerTitle = document.querySelector(".header_title");
    if(header_wrap === null ){return}
    const headerElements = [].slice.call(header_wrap.children);
    let headerElementsWid = [];
    let headerElementsWidMax = 0;
    headerElements.forEach((element)=>{
      if(element.classList.contains("header_title")){
        return;
      }
      headerElementsWid.push(element.getBoundingClientRect().width)
    });
    headerElementsWidMax = Math.max.apply(null,headerElementsWid);
    if(headerTitle !== null){
      headerTitle.style.paddingLeft = headerElementsWidMax + "px";
      headerTitle.style.paddingRight = headerElementsWidMax + "px";
    }
  }
}

function DesignModal(option) {
  this.message = option.message;
  this.domHtml = document.querySelector("html");
  this.domBody = document.querySelector("body");
  this.pagewrap = document.querySelector(".page_wrap");
  this.design_modal_wrap = null;
  this.btn_dmsmidentify = null;
  this.btn_dmsmcancel = null;
  this.duration = option.duration !== undefined ? option.duration : 400;

  this.initShow(option);
}

DesignModal.prototype.initShow = function(option) {
  var innerPublish = '';
  var objThis = this;

  // innerPublish += "<div class='design_modal_wrap'>";
  // innerPublish += "  <div class='bg_design_modal'></div>";
  // innerPublish += "  <div class='design_modal_w'>";
  // innerPublish += "          <div class='design_modal'>";
  // innerPublish += "              <div class='design_modal_cont_w'><div class='design_modal_text'></div></div>";
  // innerPublish += "              <div class='btn_dmsm_wrap'>";
  // innerPublish += "                  <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmidentify'>확인</a>";
  // if (option.type === "confirm") {
  //   innerPublish += "              <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmcancel'>취소</a>";
  // }
  // innerPublish += "              </div>";
  // innerPublish += "          </div>";
  // innerPublish += "  </div>";
  // innerPublish += "</div>";



  this.modalparent = document.createElement('div');
  this.pagewrap.appendChild(this.modalparent);
  this.modalparent.classList.add("design_modal_insert_wrap");
  let btnCloseText = option.btnCloseText !== undefined ? option.btnCloseText : '닫기';
  let btnMainText = option.btnMainText !== undefined ? option.btnMainText : '확인';
  this.modalparent.innerHTML = `
    <div class='design_modal_wrap'>
        <div class='bg_design_modal'></div>
        <div class='design_modal_w'>
            <div class='design_modal'>
                <div class='design_modal_cont_w'>
                    <div class='design_modal_text'></div>
                </div>
                <div class='btn_dmsm_wrap'>
                    <a href='javascript:;' class='btn_dmsm close_dmtrigger'>${btnCloseText}</a>
                    ${option.type === "confirm" ? `<a href='javascript:;' class='btn_dmsm close_dmtrigger btn_main'>${btnMainText}</a>` : ``}
                </div>
            </div>
        </div>
    </div>`;

  if (option.type === "confirm" || option.type === "alert") {
    this.design_modal_text = document.querySelector(".design_modal_text");
    this.design_modal_text.innerHTML = option.message;
  }
  if (option.type === "confirm") {
  }
  this.btn_main = this.modalparent.querySelector(".btn_main");
  this.pagewrap.style.zIndex = 0;
  this.domBody.setAttribute("data-scr", window.pageYOffset);
  this.domBody.style.marginTop = -window.pageYOffset + "px";
  this.domHtml.classList.add("touchDis");
  this.design_modal_wrap = document.querySelector(".design_modal_wrap");
  this.closetrigger = document.querySelectorAll(".close_dmtrigger");
  this.design_modal_wrap.classList.add("active");
  setTimeout(function() {
    objThis.design_modal_wrap.classList.add("motion");
  }, 30);
  this.bindEvent(option);
}
DesignModal.prototype.removeHide = function(option) {
  var objThis = this;
  this.design_modal_wrap.classList.remove("motion");
  setTimeout(()=>{
    objThis.design_modal_wrap.classList.remove("active");
    document.querySelector(".design_modal_insert_wrap").remove();
    objThis.design_modal_wrap.remove();
    objThis.domHtml.classList.remove("touchDis");
    objThis.domBody.style.marginTop = 0;

    window.scrollTo(0, Number(objThis.domBody.getAttribute("data-scr")));

    if( option !== undefined){
      if("closeCallback" in option){
        option.closeCallback();
      }
    }
  }, 530);
}
DesignModal.prototype.bindEvent = function(option) {
  var objThis = this;
  for (var i = 0; i < this.closetrigger.length; i++) {
    this.closetrigger[i].addEventListener("click", function() {
      objThis.removeHide(option);
    }, false);
  }
  if (this.btn_main !== null) {
    this.btn_main.addEventListener("click", function() {
      setTimeout(()=>{
        if ("btnMainCallback" in option) {
          option.btnMainCallback();
        }
      },530);
    }, false);
  }
}




function DesignPopup(option) {
  this.selector = null;
  if (option.selector !== undefined) {
      this.selector = document.querySelector(option.selector);
  }
  this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
  this.domHtml = document.querySelector("html");
  this.domBody = document.querySelector("body");
  this.pagewrap = document.querySelector(".page_wrap");
  this.btn_closeTrigger = null;
  this.btn_close = null;
  this.bg_design_popup = null;
  this.scrollValue = 0;
  this.popupShow(option);
}

DesignPopup.prototype.popupShow = function (option) {
  var objThis = this;
  this.selector = document.querySelector(option.selector);
  if (this.selector == null) {
      return;
  }
  this.domBody.setAttribute("data-scr", window.pageYOffset);
  this.domBody.style.marginTop = -window.pageYOffset+"px";
  this.scrollValue = window.pageYOffset;
  this.domHtml.classList.add("touchDis");
  this.selector.classList.add("active");
  setTimeout(function(){
    objThis.selector.classList.add("motion");
    if("callback" in option){
      option.callback();
    }
  },30);


  this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
  this.btn_close = this.selector.querySelectorAll(".popup_close");
  this.bg_design_popup = this.selector.querySelector(".popup_wrap .bg_dim");
  this.domBody.append(this.selector);
  this.bindEvent(this.selector);
  commonForm();
}
DesignPopup.prototype.popupHide = function (target) {
  var objThis = this;
  if (target !== undefined) {
      if (typeof target =="object"){
          this.selector = target;
      }else{
          this.selector = document.querySelector(target);
      }
      this.selector.classList.remove("motion");
      setTimeout(function(){
          //remove
          objThis.selector.classList.remove("active");
          objThis.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
          if (objThis.design_popup_wrap_active.length==0){
              objThis.domHtml.classList.remove("touchDis");
              objThis.domBody.style.marginTop = 0;
              window.scrollTo(0, parseInt(objThis.domBody.getAttribute("data-scr")));
          }
      },420);
  }
}

DesignPopup.prototype.bindEvent = function () {
  var objThis = this;
  var closeItemArray = [...this.btn_closeTrigger,...this.btn_close];
  if(this.bg_design_popup !== null){
    closeItemArray.push(this.bg_design_popup);
  }
  if (closeItemArray.length) {
    closeItemArray.forEach((element)=>{
      element.addEventListener("click", (e)=>{
        e.preventDefault();
        this.popupHide(objThis.selector);
        console.log(element)
      }, false);
    });
  }
};





function commonForm() {
  
  let form_input = document.querySelectorAll(".form_input");
  if(form_input.length){
    form_input.forEach(function(elem,index){
          elem.addEventListener("focus",function(e){
              focusInAction(e.currentTarget);
          },false);
          elem.addEventListener("keydown",function(e){
              focusInAction(e.currentTarget);
          },false);
          elem.addEventListener("keypress",function(e){
              focusInAction(e.currentTarget);
          },false);
          
          elem.addEventListener("focusout",function(e){
              focusOutAction(e.currentTarget);
          },false);
      });
  }
  function focusInAction(target){
      let currentTarget = target;
      let currentParent = currentTarget.closest(".form_element_group");
      if(currentParent !== null){
        currentParent.classList.add("active");
      }
  }

  function focusOutAction(target){
      let currentTarget = target;
      let currentParent = currentTarget.closest(".form_element_group");
      if(currentParent !== null){
        currentParent.classList.remove("active");
      }
  }
}




function bottomLayer(){
  const bottom_layer = document.querySelector(".bottom_layer");
  const page_wrap = document.querySelector(".page_wrap");
  const middle_wrap = document.querySelector(".middle_wrap");
  
  action();
  window.addEventListener("resize",()=>{
    action();
  });

  function action(){
    if(bottom_layer !== null){
      if(page_wrap.classList.contains("flex_layout")){
        middle_wrap.style.paddingBottom = `${bottom_layer.getBoundingClientRect().height}px`;
      }else{
        page_wrap.style.paddingBottom = `${bottom_layer.getBoundingClientRect().height}px`;
      }
    }
  }
}


function bannerSwiperFunc(target){
	var mid_banner_target = document.querySelector(target);
	var mid_banner_slide = document.querySelectorAll(`${target} .swiper-slide`);
  console.log(target);
	var count_length = mid_banner_target.querySelector(".count_length");
	var count_current = mid_banner_target.querySelector(".count_current");
  var mid_banner_swiper = null;
  count_length.innerHTML = mid_banner_slide.length;
	if(mid_banner_slide.length){
		mid_banner_swiper = new Swiper(`${target} .banner-container`, {
			speed : 800,
			loop : true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			}
		});
    mid_banner_swiper.on("slideChange",()=>{
      count_current.innerHTML = mid_banner_swiper.realIndex+1;
    });
	}
}

function orderSwiperFunc(target){
	var order_target = document.querySelector(target);
	var order_slide = document.querySelectorAll(`${target} .swiper-slide`);
  var order_swiper = null;
	if(order_slide.length){
		order_swiper = new Swiper(target, {
			speed : 800,
			loop : true,
      pagination: {
        clickable: true,
        el: `${target} .swiper-pagination`,
      }
		});
	}
}

function moreDataLayer(){
  const btn_data_more = document.querySelectorAll(".btn_data_more");
  const edit_layer = document.querySelectorAll(".edit_layer");
  btn_data_more.forEach((element)=>{
    element.addEventListener("click",(e)=>{
      let thisEventObj = e.currentTarget;
      let thisEventTarget = thisEventObj.nextElementSibling;
      thisEventTarget.classList.toggle("active");
    });
  });
  document.addEventListener("click",(e)=>{
    if(e.target.closest(".edit_layer") !== null || e.target.classList.contains("btn_data_more")){
      return;
    }
    edit_layer.forEach((element)=>{
      element.classList.remove("active");
    });
  });
}


function toggleTerms(){
  const emp_props_checkbox = document.querySelector(".agree_total_row .emp_props_checkbox");
  const agree_tail_checkbox = document.querySelectorAll(".agree_tail_row .props_checkbox");
  const btn_form_toggle = document.querySelectorAll(".btn_form_toggle");
  emp_props_checkbox.addEventListener("click",(e)=>{
      agree_tail_checkbox.forEach((element)=>{
        element.checked = e.currentTarget.checked;
      });
  });
  btn_form_toggle.forEach((element)=>{
    element.addEventListener("click",(e)=>{
      e.preventDefault();
      let thisEventObj = e.currentTarget;
      let thisEventParent = thisEventObj.closest("li");
      let thisEventTarget = thisEventParent.querySelector(".props_terms_low");
      thisEventObj.classList.toggle("active");
      thisEventTarget.classList.toggle("active");
    });
  });
}

function toggleDataFunc(){
  let data_text_item = document.querySelectorAll(".data_text_item");
  data_text_item.forEach((element)=>{
    element.addEventListener("click",(e)=>{
      e.preventDefault();
      let thisEventObj = e.currentTarget;
      let thisEventParent = thisEventObj.closest("li");
      thisEventParent.classList.toggle("active");
    });
  });
}
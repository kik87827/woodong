document.addEventListener("DOMContentLoaded", function() {
  commonInit();
  commonEvent();
  commonForm();
  bottomLayer();
  dataPicker();
  commonTitle();
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
  const page_wrap2 = document.querySelector(".page_wrap.full_height");
  let windowWidth = 0;
  window.addEventListener("resize", () => {
    if (windowWidth === window.innerWidth) {
      return;
    }
    setVh();
    windowWidth = window.innerWidth;
  });
  window.addEventListener("touchmove", () => {
    if (window.scrollY === 0) {
      setVh();
    }
  });


  function setVh() {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    function action() {
      if (page_wrap2 == null) {
        return;
      }
      page_wrap2.style.minHeight = `${window.innerHeight}px`;
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    action();
  };
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
  if (option.type === "confirm") {}
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
  setTimeout(() => {
    objThis.design_modal_wrap.classList.remove("active");
    document.querySelector(".design_modal_insert_wrap").remove();
    objThis.design_modal_wrap.remove();
    objThis.domHtml.classList.remove("touchDis");
    objThis.domBody.style.marginTop = 0;

    window.scrollTo(0, Number(objThis.domBody.getAttribute("data-scr")));

    if (option !== undefined) {
      if ("closeCallback" in option) {
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
      setTimeout(() => {
        if ("btnMainCallback" in option) {
          option.btnMainCallback();
        }
      }, 530);
    }, false);
  }
}




function DesignPopup(option) {
  this.selector = null;
  this.option = option;
  if (this.option.selector !== undefined) {
    this.selector = document.querySelector(this.option.selector);
  }

  this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
  this.domHtml = document.querySelector("html");
  this.domBody = document.querySelector("body");
  this.pagewrap = document.querySelector(".page_wrap");
  this.btn_closeTrigger = null;
  this.btn_close = null;
  this.bg_design_popup = null;
  this.scrollValue = 0;
  // this.popupShow(option);
}

DesignPopup.prototype.popupShow = function() {
  var objThis = this;
  //this.selector = document.querySelector(option.selector);
  if (this.selector == null) {
    return;
  }
  this.domBody.setAttribute("data-scr", window.pageYOffset);
  this.domBody.style.marginTop = -window.pageYOffset + "px";
  this.scrollValue = window.pageYOffset;
  this.domHtml.classList.add("touchDis");
  this.selector.classList.add("active");
  setTimeout(() => {
    this.selector.classList.add("motion");
    if ("callback" in this.option) {
      this.option.callback();
    }
  }, 30);


  this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
  this.btn_close = this.selector.querySelectorAll(".popup_close");
  this.bg_design_popup = this.selector.querySelector(".popup_wrap .bg_dim");
  this.domBody.append(this.selector);
  this.bindEvent(this.selector);
  commonForm();
}
DesignPopup.prototype.popupHide = function() {
  this.selector.classList.remove("motion");
  setTimeout(() => {
    //remove
    this.selector.classList.remove("active");
    this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
    if (this.design_popup_wrap_active.length == 0) {
      this.domHtml.classList.remove("touchDis");
      this.domBody.style.marginTop = 0;
      window.scrollTo(0, parseInt(this.domBody.getAttribute("data-scr")));
    }
  }, 420);
}

DesignPopup.prototype.bindEvent = function() {
  var objThis = this;
  var closeItemArray = [...this.btn_closeTrigger, ...this.btn_close];
  if (this.bg_design_popup !== null) {
    closeItemArray.push(this.bg_design_popup);
  }
  if (closeItemArray.length) {
    closeItemArray.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        this.popupHide(objThis.selector);
      }, false);
    });
  }
};





function commonForm() {

  let form_input = document.querySelectorAll(".form_input");
  if (form_input.length) {
    form_input.forEach(function(elem, index) {
      elem.addEventListener("focus", function(e) {
        focusInAction(e.currentTarget);
      }, false);
      elem.addEventListener("keydown", function(e) {
        focusInAction(e.currentTarget);
      }, false);
      elem.addEventListener("keypress", function(e) {
        focusInAction(e.currentTarget);
      }, false);

      elem.addEventListener("focusout", function(e) {
        focusOutAction(e.currentTarget);
      }, false);
    });
  }

  function focusInAction(target) {
    let currentTarget = target;
    let currentParent = currentTarget.closest(".form_element_group");
    if (currentParent !== null) {
      currentParent.classList.add("active");
    }
  }

  function focusOutAction(target) {
    let currentTarget = target;
    let currentParent = currentTarget.closest(".form_element_group");
    if (currentParent !== null) {
      currentParent.classList.remove("active");
    }
  }
}




function bottomLayer() {
  const bottom_layer = document.querySelector(".bottom_layer_wrap");
  const bottom_quickitem_list = document.querySelector(".bottom_quickitem_list");
  var bottom_quickitem_list_height = bottom_quickitem_list !== null ? bottom_quickitem_list.getBoundingClientRect().height : 0;
  const page_wrap = document.querySelector(".page_wrap");
  const middle_wrap = document.querySelector(".middle_wrap");

  if (bottom_quickitem_list !== null) {
    if (bottom_quickitem_list.classList.contains("type2")) {
      bottom_quickitem_list_height += 48;
    } else {
      bottom_quickitem_list_height += 24;
    }
  }

  action();
  window.addEventListener("resize", () => {
    action();
  });

  function action() {
    if (bottom_layer !== null) {
      middle_wrap.style.paddingBottom = `0px`;
      page_wrap.style.paddingBottom = `${bottom_layer.getBoundingClientRect().height + bottom_quickitem_list_height}px`;
    }
  }
}




function moreDataLayer() {
  const btn_data_more = document.querySelectorAll(".btn_data_more");
  const edit_layer = document.querySelectorAll(".edit_layer");
  btn_data_more.forEach((element) => {
    element.addEventListener("click", (e) => {
      let thisEventObj = e.currentTarget;
      let thisEventTarget = thisEventObj.nextElementSibling;
      thisEventTarget.classList.toggle("active");
    });
  });
  document.addEventListener("click", (e) => {
    if (e.target.closest(".edit_layer") !== null || e.target.classList.contains("btn_data_more")) {
      return;
    }
    edit_layer.forEach((element) => {
      element.classList.remove("active");
    });
  });
}


function toggleTerms() {
  const emp_props_checkbox = document.querySelector(".agree_total_row .emp_props_checkbox");
  const agree_tail_checkbox = document.querySelectorAll(".agree_tail_row .props_checkbox");
  const btn_form_toggle = document.querySelectorAll(".btn_form_toggle");
  emp_props_checkbox.addEventListener("click", (e) => {
    agree_tail_checkbox.forEach((element) => {
      element.checked = e.currentTarget.checked;
    });
  });
  btn_form_toggle.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      let thisEventObj = e.currentTarget;
      let thisEventParent = thisEventObj.closest("li");
      let thisEventTarget = thisEventParent.querySelector(".props_terms_low");
      thisEventObj.classList.toggle("active");
      thisEventTarget.classList.toggle("active");
    });
  });
}

function toggleDataFunc() {
  let data_text_item = document.querySelectorAll(".data_text_item");
  data_text_item.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      let thisEventObj = e.currentTarget;
      let thisEventParent = thisEventObj.closest("li");
      thisEventParent.classList.toggle("active");
    });
  });
}


function toggleItem(target) {
  const targetItem = target !== undefined ? document.querySelectorAll(target) : null;
  if (targetItem.length > 0) {
    targetItem.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        let thisEventObj = e.currentTarget;
        thisEventObj.classList.toggle("active");
      });
    })
  }
}

function accordianItem(target) {
  let getTarget = target;
  const targetItem = getTarget !== undefined ? document.querySelectorAll(getTarget) : null;
  targetItem.forEach((element) => {
    let thisTarget = element;
    let thisTargetBar = thisTarget.querySelector(".tbox_bar");
    thisTargetBar.addEventListener("click", (e) => {
      e.preventDefault();
      let thisEventObj = e.currentTarget;
      thisTarget.classList.toggle("active");
    });
  })
}


function activeToggle(target) {
  const targetItem = target !== undefined ? document.querySelectorAll(target) : null;
  var d_call_more_parent = document.querySelectorAll(".d_call_more_parent");
  if (targetItem.length > 0) {
    targetItem.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        let thisEventObj = e.currentTarget;
        let thisEventObjHeadParent = thisEventObj.closest(".d_call_more_parent");
        let thisEventObjSiblings = siblings(thisEventObj);
        if (thisEventObjHeadParent !== null) {
          d_call_more_parent.forEach((element) => {
            if (thisEventObjHeadParent === element) {
              return;
            }
            element.classList.remove("active");
          });
          thisEventObjHeadParent.classList.toggle("active");
          return;
        }
        thisEventObjSiblings.forEach((element) => {
          element.classList.remove("active");
        })

        thisEventObj.classList.toggle("active");
      });
    });
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn_box_more") || e.target.closest(".d_call_more_parent") !== null) {
        return;
      }
      targetItem.forEach((element) => {
        let thisEventObjHeadParent = element.closest(".d_call_more_parent");
        if (thisEventObjHeadParent !== null) {
          thisEventObjHeadParent.classList.remove("active");
        }
        element.classList.remove("active");
      });
    });
  }
}

function dataPicker() {
  $(function() {
    $(".define_calendar").datepicker({
      monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
      changeMonth: true,
      changeYear: true,
      dateFormat: 'yy-mm-dd'
    });
  });
}

function siblings(t) {
  var children = t.parentElement.children;
  var tempArr = [];

  for (var i = 0; i < children.length; i++) {
    tempArr.push(children[i]);
  }

  return tempArr.filter(function(e) {
    return e != t;
  });
}


function commonTitle() {
  const headerTitle = document.querySelector(".header_sub_title.has_pd");
  const pos_left = document.querySelector(".header_else_layer.pos_left");
  const pos_right = document.querySelector(".header_else_layer.pos_right");
  let pos_left_wid = pos_left !== null ? pos_left.getBoundingClientRect().width : 0;
  let pos_right_wid = pos_right !== null ? pos_right.getBoundingClientRect().width : 0;
  let max_wid = Math.max.apply(null, [pos_left_wid, pos_right_wid]);
  if (headerTitle !== null) {
    headerTitle.style.paddingLeft = max_wid + "px";
    headerTitle.style.paddingRight = max_wid + "px";
  }
}



function mainbannerFunc() {
  const mvbannerWrap = document.querySelector(".mv-banner-wrap");
  const mvbanner = mvbannerWrap.querySelectorAll(".swiper-slide");
  let mvbannerObj = null;
  if (mvbannerWrap !== null && mvbanner.length > 0) {
    mvbannerObj = new Swiper(".mv-banner-wrap", {
      speed: 800,
      loop: true,
      pagination: {
        clickable: true,
        el: ".mv-banner-wrap .swiper-pagination",
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    });
  }
}

function inputBoxEvent(target) {
  const targetItem = target !== undefined ? document.querySelectorAll(target) : null;
  targetItem.forEach((element) => {
    let thisElement = element;
    let thisEventTarget = thisElement.querySelector("input.d_event");
    currentAction(thisEventTarget, thisElement);
    thisEventTarget.addEventListener("keyup", (e) => {
      currentAction(thisEventTarget, thisElement);
    });
    thisEventTarget.addEventListener("focusout", (e) => {
      currentAction(thisEventTarget, thisElement);
    });
  });

  function currentAction(target, parent) {
    if (target.value.length > 0) {
      parent.classList.add("key_active");
    } else {
      parent.classList.remove("key_active");
    }
  }
}

function responTextarea() {
  const respon_ta = document.querySelector(".respon_ta");
  const bottom_layer_wrap = document.querySelector(".bottom_layer_wrap");
  var bottom_layer_wrap_height = bottom_layer_wrap.getBoundingClientRect().height;
  var respon_ta_height = window.innerHeight - respon_ta.getBoundingClientRect().top - bottom_layer_wrap_height;

  action();
  window.addEventListener("resize", () => {
    action();
  });

  function action() {
    bottom_layer_wrap_height = bottom_layer_wrap.getBoundingClientRect().height;
    respon_ta_height = window.innerHeight - respon_ta.getBoundingClientRect().top - bottom_layer_wrap_height;
    respon_ta.style.height = `${respon_ta_height }px`;
  }
}

function simpleChatFunc() {
  const d_simple_call = document.querySelector(".d_simple_call");
  const simple_chatbox = document.querySelector(".simple_chatbox");
  const chat_qus = document.querySelectorAll(".chat_qus");
  const btn_chatsend = document.querySelector(".btn_chatsend");
  d_simple_call.addEventListener("click", (e) => {
    e.preventDefault();
    simple_chatbox.classList.add("active");
    d_simple_call.classList.add("hidden");
    btn_chatsend.disabled = true;
  });
  if (chat_qus.length) {
    chat_qus.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        simple_chatbox.classList.remove("active");
        d_simple_call.classList.remove("hidden");
        btn_chatsend.disabled = false;
      });
    });
  }
  if (simple_chatbox !== null) {
    document.addEventListener("click", (e) => {
      e.preventDefault();
      let etargetObj = e.target;
      if (etargetObj.closest(".simple_chatbox") === null && etargetObj.closest(".bottom_quickitem_list") === null) {
        simple_chatbox.classList.remove("active");
        d_simple_call.classList.remove("hidden");
      }
    })
  }
}

function toggleItem(...item) {
  const items = document.querySelectorAll(item);
  items.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      element.classList.toggle("active");
    });
  });
}

function headBannerFunc() {
  const pageWrap = document.querySelector(".page_wrap");
  const headbannerWrap = document.querySelector(".head-banner-wrap");
  const headerRowZone = document.querySelector(".header_row_zone");
  const headerRowWrap = document.querySelector(".header_row_wrap");
  var headbannerWrapHeight = 0;
  let addHeight = document.createElement("div");
  let addHeightDom = null;
  const headerWrap = document.querySelector(".header_wrap");
  var headerWrapHeight = 0;
  const headbanner = headbannerWrap.querySelectorAll(".swiper-slide");
  let headbannerObj = null;
  if (headbannerWrap !== null && headbanner.length > 0) {
    headbannerObj = new Swiper(".head-banner-wrap", {
      speed: 800,
      loop: true,
      pagination: {
        clickable: true,
        el: ".head-banner-wrap .swiper-pagination",
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    });
  }

  addHeight.classList.add("add_height");
  pageWrap.append(addHeight);
  addHeightDom = document.querySelector(".add_height");
  //addHeightDom.style.height = window.innerHeight+"px";
  bannerHeight();

  window.addEventListener("resize", (e) => {
    bannerHeight();
  });

  var scrollY = window.scrollY !== undefined ? window.scrollY : window.pageYOffset;
  window.addEventListener("scroll", (e) => {
    scrollY = window.scrollY !== undefined ? window.scrollY : window.pageYOffset;
    if (scrollY > headbannerWrapHeight) {
      headerRowWrap.classList.add("fixed");
    } else {
      headerRowWrap.classList.remove("fixed");
    }
    // if(scrollY > headbannerWrapHeight){
    //   pageWrap.classList.remove("skin2");
    //  // addHeightDom.style.height = `0px`;
    // }else if(scrollY <= headbannerWrapHeight/4){
    //   pageWrap.classList.add("skin2");
    //   //addHeightDom.style.height = window.innerHeight+"px";
    // }
  });

  function bannerHeight() {
    headbannerWrapHeight = headbannerWrap !== null ? headbannerWrap.getBoundingClientRect().height : 0;
    headerWrapHeight = headerWrap !== null ? headerWrap.getBoundingClientRect().height : 0;
    if (window.innerWidth > window.innerHeight) {
      headbannerWrapHeight = 0;
    }
    headerRowZone.style.height = headerRowZone.children[0].getBoundingClientRect().height + "px";
  }
}

function topBannerFunc() {
  const topbannerWrap = document.querySelector(".top-banner-wrap");
  const topbanner = topbannerWrap.querySelectorAll(".swiper-slide");
  let topbannerObj = null;
  console.log(topbannerObj, topbanner);
  if (topbannerWrap !== null && topbanner.length > 0) {
    topbannerObj = new Swiper(".top-banner-wrap", {
      speed: 800,
      loop: true,
      pagination: {
        clickable: true,
        el: ".top-banner-wrap .swiper-pagination",
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    });
  }
}


function getNextSiblings(elem, filter) {
  var sibs = [];
  var nextElem = elem.parentNode.firstChild;
  do {
    if (nextElem.nodeType === 3) continue; // ignore text nodes
    if (nextElem === elem) continue; // ignore elem of target
    if (nextElem === elem.nextElementSibling) {
      if (!filter || filter(elem)) {
        sibs.push(nextElem);
        elem = nextElem;
      }
    }
  } while (nextElem = nextElem.nextSibling)
  return sibs;
}

function getPreviousSiblings(elem, filter) {
  var sibs = [];
  while (elem = elem.previousSibling) {
    if (elem.nodeType === 3) continue; // ignore text nodes
    if (!filter || filter(elem)) sibs.push(elem);
  }
  return sibs;
}

function optionCombo() {
  var combo_target = document.querySelectorAll(".combo_target");
  combo_target.forEach((element) => {
    var comboThis = element;
    var comboParent = comboThis.closest(".combo_option_item");
    var combo_option = comboParent.querySelectorAll(".combo_option");
    element.addEventListener("click", (e) => {
      e.preventDefault();
      var thisEventObj = e.currentTarget;
      var thisEventObjParent = thisEventObj.closest(".combo_option_item");
      thisEventObjParent.classList.toggle("active");
      heightRender(thisEventObj);
    });
    combo_option.forEach((thisOption) => {
      thisOption.addEventListener("click", (e) => {
        e.preventDefault();
        var thisEventObj = e.currentTarget;
        comboThis.textContent = thisEventObj.textContent;
        comboParent.classList.remove("active");
      });
    });
  });

  window.addEventListener("resize", () => {
    combo_target.forEach((element) => {
      heightRender(element);
    });
  });

  function heightRender(target) {
    var thisObj = target;
    var thisObjParent = thisObj.closest(".combo_option_item");
    var thisObjOption = thisObjParent.querySelector(".combo_option_list_wrap");

    thisObjOption.style.removeProperty("max-height");
    if (thisObjParent.classList.contains("active")) {
      thisObjOption.style.maxHeight = (thisObjParent.getBoundingClientRect().top - 20) + "px";
    }
  }
}
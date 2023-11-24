const progress = document.querySelector(".progress");
const stepsCompleted = document.querySelector(".range_completed");
const loader = document.querySelectorAll(".loader");
const customize = document.querySelectorAll(".customize");
const customizeLeft = document.querySelectorAll(".customize_left");
const guide = document.querySelectorAll(".setup_show");
const setupHeader = document.querySelectorAll(".setup-header");
const headerToggle = document.querySelector(".setup-card__header-toggle");
const headerToggleHide = document.querySelector(".header-toggle__hide");
const headerToggleShow = document.querySelector(".header-toggle__show");
const setupBody = document.querySelector(".setup-body");
const setupBodyDiv = document.querySelector(".setup_body-one");
const alert = document.querySelector(".alert");
const alertClose = document.querySelector(".alert-action__close");
const notification = document.querySelector(".user-section__notification");
const userToaster = document.querySelector(".user-section__name");
const toasterUser = document.querySelector(".toaster-user");
const notificationToaster = document.querySelector(".alert-toaster");
const allSettingsLink = toasterUser.querySelectorAll(".link__link");
const settings = document.querySelector(".settings_link");
const setupToggleDiv = document.querySelector(".setup-card__header");

// Add or remove a class
function toggleClass(element, className) {
  element.classList.toggle(className);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function addClass(element, className) {
  element.classList.add(className);
}
function showElement(element) {
  element.style.display = "block";
}
function hideElement(element) {
  element.style.display = "none";
}
function toggleToaster(val1, val2, val3, val4) {
  removeClass(val2, "show");
  addClass(val3, "show");
  val3.focus();
  val4.ariaExpanded = "true";
}

function handlePopupArrowKeyPress(event, menuItemIndex, list) {
  // create vars: lastMenuItem & firstMenuItem
  const isLastMenuItem = menuItemIndex === list.length - 1;
  const isFirstMenuItem = menuItemIndex === 0;
  const nextMenuItem = list.item(menuItemIndex + 1);
  const previousMenuItem = list.item(menuItemIndex - 1);
  // if the user pressed arrow right or arrow down, focus on next one
  if (event.key === "Home") {
    list.item(0).focus();
  }
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    if (isLastMenuItem) {
      list.item(0).focus();
      return;
    }
    nextMenuItem.focus();
  }
  // if the user pressed arrow up or arrow left, focus on the previous one
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    if (isFirstMenuItem) {
      list.item(list.length - 1).focus();
      // isLastMenuItem.focus();
      return;
    }
    previousMenuItem.focus();
  }
  // if the user is on the last item, focus on first menu item
  // if the user is on first menu item, focus on last menuitem
}
function openMenu() {
  toggleToaster(notification, notificationToaster, toasterUser, userToaster);
  userToaster.classList.add("focused");
  allSettingsLink.item(0).focus();
  toasterUser.addEventListener("keyup", handleUserToasterEscapeKey);
  allSettingsLink.forEach((menuItem, menuItemIndex) => {
    menuItem.addEventListener("keyup", function (event) {
      handlePopupArrowKeyPress(event, menuItemIndex, allSettingsLink);
    });
  });
}

function keyPress() {
  const scrollDivs = setupBodyDiv.querySelectorAll(".customize");
  scrollDivs.item(0).focus();
  scrollDivs.item(0).querySelector(".loader").focus();
  scrollDivs.forEach((menuItem, menuItemIndex) => {
    menuItem.addEventListener("keyup", (event) => {
      event.preventDefault();
      handlePopupArrowKeyPress(event, menuItemIndex, scrollDivs);
    });
  });
}
function handleUserToasterEscapeKey(event) {
  if (event.key === "Escape") {
    toggleUserToasterBody();
    userToaster.focus();
  }
}
function closeMenu(element, element2) {
  removeClass(element2, "show");
  element.ariaExpanded = "false";
  // removeClass(element, "focused");
}
function toggleUserToasterBody() {
  const isShowing = toasterUser.classList.contains("show");
  const isExpanded = userToaster.attributes["aria-expanded"].value === true;
  if (isShowing) {
    userToaster.classList.remove("focused");
    closeMenu(userToaster, toasterUser);
  } else {
    openMenu();
  }
}
function toggleNotificationToasterBody() {
  const isShowing = notificationToaster.classList.contains("show");
  const isExpanded = notification.attributes["aria-expanded"].value === true;
  if (isShowing) {
    closeMenu(notification, notificationToaster);
  } else {
    toggleToaster(userToaster, toasterUser, notificationToaster, notification);
    // const firstIcon = notificationToaster.querySelector(".alert--filter");
    // firstIcon.focus();
    userToaster.classList.remove("focused");
  }
}
document.querySelector(".user__name").addEventListener("click", () => {
  allSettingsLink.item(0).focus();
});

// -- START OF CLICK AND KEYPRESS EVENTS FOR THE USERTOASTER--- //
userToaster.addEventListener("click", (event) => {
  toggleUserToasterBody();
  toasterUser.addEventListener("keyup", handleUserToasterEscapeKey(event));
});
userToaster.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    toggleUserToasterBody();
  }
});
// -- END OF CLICK AND KEYPRESS EVENTS FOR THE USERTOASTER--- //

// -- START OF CLICK AND KEYPRESS EVENTS FOR THE NOTIFICATIONTOASTER--- //
notification.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    closeMenu(notification, notificationToaster);
    // toggleNotificationToasterBody();
    notification.focus();
  }
});
notification.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    notificationToaster.classList.add("show");
  }
});
notification.addEventListener("click", toggleNotificationToasterBody);
// -- END OF CLICK AND KEYPRESS EVENTS FOR THE NOTIFICATION--- //

alertClose.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    alert.classList.add("hide");
    alert.setAttribute("aria-hidden", "true");
    alert.setAttribute("aria-live", "off");
  }
});
alertClose.addEventListener("click", () => {
  alert.classList.add("hide");
  alert.setAttribute("aria-hidden", "true");
  alert.setAttribute("aria-live", "off");
});

function toggleOpenSetupBody() {
  setupBody.classList.add("show");
  setupBody.setAttribute("aria-hidden", "false");
  setupToggleDiv.setAttribute("aria-expanded", "true");
  headerToggleHide.setAttribute("aria-hidden", "true");
  headerToggleShow.classList.add("hide");
  // headerToggleShow.classList.remove("headerFocus");
  headerToggleHide.classList.add("show");
  headerToggleHide.querySelector(".icon").setAttribute("aria-hidden", "false");
  headerToggleHide.focus();
  // headerToggleHide.classList.add("headerFocus");
  keyPress();
}

setupBody.addEventListener("keyup", (event) => {
  if (event.key === "Home") {
    setupBody.classList.remove("show");
    headerToggleHide.classList.remove("show");
    setupToggleDiv.setAttribute("aria-expanded", "false");
    headerToggleShow.classList.remove("hide");
    headerToggleShow.focus();
  }
});
headerToggleShow.addEventListener("keyup", (event) => {
  const code = event.key;
  const isShowing = setupBody.classList.contains("show");
  // const isShowing = setupBody.classList.contains("show");
  if (code === "Enter") {
    event.preventDefault();
    if (!isShowing) {
      setupBody.classList.add("show");
    }
  }
});
function toggleCloseSetupBody() {
  setupBody.classList.remove("show");
  setupBody.setAttribute("aria-hidden", "true");
  setupToggleDiv.setAttribute("aria-expanded", "false");
  headerToggleShow.classList.remove("hide");
  headerToggleHide.querySelector(".icon").setAttribute("aria-hidden", "true");
  headerToggleShow.focus();
  // headerToggleShow.classList.add("headerFocus");
  // headerToggleHide.classList.remove("headerFocus");
  headerToggleHide.classList.remove("show");
}
headerToggleShow.addEventListener("click", toggleOpenSetupBody);

function toggleBodyHeader(event) {
  const code = event.key;
  const expanded = setupToggleDiv.getAttribute("aria-expanded") === "true";
  // const isShowing = setupBody.classList.contains("show");
  if (code === "Enter") {
    event.preventDefault();
    if (!expanded) {
      toggleOpenSetupBody();
    }
  }
}
headerToggleShow.addEventListener("keyup", (event) => {
  toggleBodyHeader(event);
});
headerToggleHide.addEventListener("keyup", (event) => {
  const code = event.key;
  const expanded = setupToggleDiv.getAttribute("aria-expanded") === "true";
  const isShowing = setupBody.classList.contains("show");
  if (code === "Escape") {
    event.preventDefault();
    if (expanded) {
      toggleCloseSetupBody();
    }
  }
});
headerToggleHide.addEventListener("click", toggleCloseSetupBody);

function onBoardingSteps(item, content) {
  customize.forEach((otherTabs) => {
    otherTabs.querySelector(".setup_hidden").classList.remove("show");
    const checked = otherTabs.querySelector(".loader_checked");
    if (!checked.classList.contains("show")) {
      otherTabs.classList.remove("active-customize");
    }
  });
  content.classList.add("show");
  item.querySelector(".loader").focus();
  item.classList.add("active-customize");
}
customize.forEach((item) => {
  const header = item.querySelector(".setup-header");
  const content = item.querySelector(".setup_hidden");
  // const checked = item.querySelector(".loader_checked")
  header.addEventListener("click", () => {
    onBoardingSteps(item, content);
  });
  item.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      onBoardingSteps(item, content);
    }
  });
});

function getNextUncheckedStep() {
  let nextStep = null;
  customize.forEach((step, index) => {
    const checked = step.querySelector(".loader_checked");
    if (!checked.classList.contains("show") && !nextStep) {
      nextStep = customize[index];
    }
  });
  return nextStep;
}

let stepsCompletedCount = 0;

loader.forEach((load) => {
  const loaderEmpty = load.querySelector(".loader_empty");
  const loaderHover = load.querySelector(".loader_hover");
  const loaderHoverFilled = load.querySelector(".loader_hover--filled");

  loaderEmpty.addEventListener("mouseenter", () => {
    loaderHover.style.display = "block";
    loaderEmpty.style.display = "none";
  });
  loaderEmpty.addEventListener("mouseleave", () => {
    loaderHover.style.display = "none";
    loaderEmpty.style.display = "block";
  });

  loaderEmpty.addEventListener("click", () => {
    loaderHoverFilled.style.display = "block";
  });
});

function loadingState(load) {
  //loaders
  const loaderChecked = load.querySelector(".loader_checked");
  const blurCheck = load.querySelector(".blur_check");
  const loaderHoverFilled = load.querySelector(".loader_hover--filled");
  const loaderEmpty = load.querySelector(".loader_empty");
  const loaderLoading = load.querySelector(".loader_loading");
  //checked element
  const checkedElement = loaderChecked.classList.contains("show");
  const parentElement = load.parentElement;
  const grandParent = parentElement.parentElement;
  //hidden content
  const hiddenStep = grandParent.querySelector(".setup_hidden");
  if (!checkedElement) {
    loaderEmpty.classList.add("hide");
    loaderLoading.classList.add("show");
    setTimeout(() => {
      loaderLoading.classList.remove("show");
      blurCheck.classList.add("rotate-blur-check");
      blurCheck.classList.add("show");
      blurCheck.style.transform = "rotate(200deg)";
      loaderHoverFilled.style.display = "none";
      setTimeout(() => {
        blurCheck.style.transition = "transform 0.5s ease-in-out"; // Smooth transition
        blurCheck.style.transform = "rotate(135deg)"; // Rotate to 135deg for blur effect
        setTimeout(() => {
          blurCheck.classList.remove("show");
          loaderChecked.classList.add("rotate-dark-check");
          loaderChecked.classList.add("show");
          loaderHoverFilled.style.display = "none";
          grandParent.classList.add("active-customize");
          grandParent.classList.add("checked");

          const nextStep = getNextUncheckedStep();
          if (nextStep) {
            const nextContent = nextStep.querySelector(".setup_hidden");
            nextContent.classList.add("show");
            nextStep.classList.add("active-customize");
          }
          if (!loaderEmpty.classList.contains("hide")) {
            grandParent.classList.remove("active-customize");
            grandParent.classList.remove("checked");
          }

          if (!checkedElement && stepsCompletedCount < 5) {
            stepsCompletedCount++;
            updateSliderAndSteps(stepsCompletedCount);
            hiddenStep.classList.remove("show");
          }
          if (checkedElement) {
            stepsCompletedCount--;
            updateSliderAndSteps(stepsCompletedCount);
            hiddenStep.classList.remove("show");
          }
        }, 200);
      }, 600);
    }, 600);
  } else {
    blurCheck.classList.remove("show");
    blurCheck.style.transform = "rotate(0deg)";
    blurCheck.classList.remove("rotate-blur-check");
    loaderEmpty.classList.remove("hide");
    loaderChecked.classList.remove("rotate-dark-check");
    loaderChecked.classList.remove("show");
    loaderLoading.classList.remove("show");
    if (!loaderEmpty.classList.contains("hide")) {
      grandParent.classList.remove("active-customize");
      grandParent.classList.remove("checked");
    }

    if (!checkedElement && stepsCompletedCount < 5) {
      stepsCompletedCount++;
      updateSliderAndSteps(stepsCompletedCount);
      hiddenStep.classList.remove("show");
    }
    if (checkedElement) {
      stepsCompletedCount--;
      updateSliderAndSteps(stepsCompletedCount);
      hiddenStep.classList.remove("show");
    }
  }
  loaderChecked.classList.remove("rotate-dark-check");
  blurCheck.classList.remove("rotate-blur-check");
}

function loadingKeyState(load, event) {
  //loaders
  const loaderChecked = load.querySelector(".loader_checked");
  const blurCheck = load.querySelector(".blur_check");
  const loaderHoverFilled = load.querySelector(".loader_hover--filled");
  const loaderEmpty = load.querySelector(".loader_empty");
  const loaderLoading = load.querySelector(".loader_loading");
  //checked element
  const checkedElement = loaderChecked.classList.contains("show");
  const parentElement = load.parentElement;
  const grandParent = parentElement.parentElement;
  //hidden content
  const hiddenStep = grandParent.querySelector(".setup_hidden");
  if (event.key === "Enter") {
    if (!checkedElement) {
      loaderEmpty.classList.add("hide");
      loaderLoading.classList.add("show");
      setTimeout(() => {
        loaderLoading.classList.remove("show");
        blurCheck.classList.add("rotate-blur-check");
        blurCheck.classList.add("show");
        blurCheck.style.transform = "rotate(200deg)";
        loaderHoverFilled.style.display = "none";
        setTimeout(() => {
          blurCheck.style.transition = "transform 0.5s ease-in-out"; // Smooth transition
          blurCheck.style.transform = "rotate(135deg)"; // Rotate to 135deg for blur effect
          setTimeout(() => {
            blurCheck.classList.remove("show");
            loaderChecked.classList.add("rotate-dark-check");
            loaderChecked.classList.add("show");
            loaderHoverFilled.style.display = "none";
            grandParent.classList.add("active-customize");
            hiddenStep.classList.remove("show");
            grandParent.classList.add("checked");

            const nextStep = getNextUncheckedStep();
            if (nextStep) {
              const nextContent = nextStep.querySelector(".setup_hidden");
              nextContent.classList.add("show");
              nextStep.classList.add("active-customize");
            }

            loaderChecked.classList.remove("rotate-dark-check");
            blurCheck.classList.remove("rotate-blur-check");

            if (!loaderEmpty.classList.contains("hide")) {
              grandParent.classList.remove("active-customize");
              grandParent.classList.remove("checked");
            }

            if (!checkedElement && stepsCompletedCount < 5) {
              stepsCompletedCount++;
              updateSliderAndSteps(stepsCompletedCount);
              hiddenStep.classList.remove("show");
            }
            if (checkedElement) {
              stepsCompletedCount--;
              updateSliderAndSteps(stepsCompletedCount);
              hiddenStep.classList.remove("show");
            }
          }, 200);
        }, 600);
      }, 600);
    } else {
      blurCheck.classList.remove("show");
      blurCheck.style.transform = "rotate(0deg)";
      blurCheck.classList.remove("rotate-blur-check");
      loaderEmpty.classList.remove("hide");
      loaderChecked.classList.remove("rotate-dark-check");
      loaderChecked.classList.remove("show");
      loaderLoading.classList.remove("show");

      loaderChecked.classList.remove("rotate-dark-check");
      blurCheck.classList.remove("rotate-blur-check");

      if (!loaderEmpty.classList.contains("hide")) {
        grandParent.classList.remove("active-customize");
        grandParent.classList.remove("checked");
      }

      if (!checkedElement && stepsCompletedCount < 5) {
        stepsCompletedCount++;
        updateSliderAndSteps(stepsCompletedCount);
        hiddenStep.classList.remove("show");
      }
      if (checkedElement) {
        stepsCompletedCount--;
        updateSliderAndSteps(stepsCompletedCount);
        hiddenStep.classList.remove("show");
      }
    }
  }
  if (event.key === "Escape") {
    blurCheck.classList.remove("show");
    blurCheck.style.transform = "rotate(0deg)";
    blurCheck.classList.remove("rotate-blur-check");
    loaderEmpty.classList.remove("hide");
    loaderChecked.classList.remove("rotate-dark-check");
    loaderChecked.classList.remove("show");
    loaderLoading.classList.remove("show");
  }
}

loader.forEach((load) => {
  load.addEventListener("click", () => {
    loadingState(load);
  });
});

loader.forEach((load) => {
  load.addEventListener("keyup", (event) => {
    loadingKeyState(load, event);
  });
});

const range = document.querySelector(".footer-range");
function updateSliderAndSteps(steps) {
  stepsCompletedCount = steps;
  const total = 5;
  const percent = (steps / 5) * 100;
  progress.style.width = `${percent}%`;
  stepsCompleted.textContent = `${steps}`;
  range.setAttribute("aria-valuenow", steps);
  range.setAttribute("aria-valuemax", 5);
  range.setAttribute("aria-valuetext", `${steps} out of ${total} completed`);
}

const elements = {
  progress: document.querySelector(".progress"),
  stepsCompleted: document.querySelector(".range_completed"),
  loader: document.querySelectorAll(".loader"),
  customize: document.querySelectorAll(".customize"),
  customizeLeft: document.querySelectorAll(".customize_left"),
  guide: document.querySelectorAll(".setup_show"),
  setupHeader: document.querySelectorAll(".setup-header"),
  headerToggle: document.querySelector(".header-toggle"),
  setupBody: document.querySelector(".setup-body"),
  setupBodyDiv: document.querySelector(".setup_body-one"),
  alert: document.querySelector(".alert"),
  alertClose: document.querySelector(".alert-action__close"),
  notification: document.querySelector(".user-section__notification"),
  userToaster: document.querySelector(".user-section__name"),
  toasterUser: document.querySelector(".toaster-user"),
  notificationToaster: document.querySelector(".alert-toaster"),
  headerToggle: document.querySelector(".header-toggle"),
  headerToggleShow: document.querySelector(".header-toggle__show"),
  headerToggleHide: document.querySelector(".header-toggle__hide"),
  allSettingsLink: document
    .querySelector(".toaster-user")
    .querySelectorAll(".link__link"),
  settings: document.querySelector(".settings_link"),
  setupToggleDiv: document.querySelector(".setup-card__header"),
  hiddenMessage: document.getElementById("visuallyHiddenMessage"),
  range: document.querySelector(".footer-range"),
};

// Utility Functions
const toggleClass = (element, className) => {
  element.classList.toggle(className);
};
const removeClass = (element, className) => {
  element.classList.remove(className);
};
const addClass = (element, className) => {
  element.classList.add(className);
};
const hasClass = (element, className) => {
  return element.classList.contains(className);
};
const isAttributeEqualTo = (element, attributeName, value) => {
  return element.getAttribute(attributeName) === value;
};
const setAttribute = (element, attributeName, attributeValue) => {
  element.setAttribute(attributeName, attributeValue);
};
const setAriaLabel = (element, newLabel) => {
  element.setAttribute("aria-label", newLabel);
};

function toggleToaster(val1, val2, val3, val4) {
  removeClass(val2, "show");
  addClass(val3, "show");
  val3.focus();
  val4.ariaExpanded = "true";
  val1.ariaExpanded = "false";
}
function toggleNotification() {
  toggleClass(elements.notificationToaster, "show");
  removeClass(elements.toasterUser, "show");
}
let stepsCompletedCount = 0;
// Click Event Listeners
elements.alertClose.addEventListener("click", hideAlert);
elements.headerToggleShow.addEventListener("click", toggleSetupBody);
elements.headerToggleHide.addEventListener("click", hideSetupBody);
document.querySelector(".user__name").addEventListener("click", () => {
  allSettingsLink.item(0).focus();
});
elements.userToaster.addEventListener("click", () => {
  toggleUserToasterBody();
  elements.toasterUser.addEventListener("keyup", handleUserToasterEscapeKey);
});
elements.notification.addEventListener("click", toggleNotificationToasterBody);

// Key event listeners
elements.userToaster.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    toggleUserToasterBody();
  }
});
elements.notification.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeMenu(elements.notification, elements.notificationToaster);
    elements.notification.focus();
  }
});
elements.notification.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addClass(elements.notificationToaster, "show");
  }
});
elements.alertClose.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    hideAlert();
  }
});
// elements.setupBody.addEventListener("keyup", handleSetupBodyKeyup);
elements.headerToggleShow.addEventListener(
  "keyup",
  handleHeaderToggleShowKeyup
);
elements.headerToggleHide.addEventListener(
  "keyup",
  handleHeaderToggleHideKeyup
);
elements.headerToggleShow.addEventListener(
  "keyup",
  handleHeaderShowToggleKeyUp
);

// Main- Functions
elements.setupHeader.forEach((item) => {
  item.addEventListener("focusin", function (event) {
    const isTrue = isAttributeEqualTo(item, "aria-expanded", "false");
    if (isTrue) {
      setAriaLabel(item, "Click or press enter to expand");
      // statusCheck("Click or press enter to expand");
    } else {
      setAriaLabel(item, "");
    }
  });
});
// function ArialLabel() {
//   elements.loader.forEach((item) => {
//     const isAril = item
//       .querySelector(".loader_checked")
//       .classList.contains("show");
//     if (!isAril) {
//       setAriaLabel(item, " mark this step as complete");
//     }
//   });
// }
// ArialLabel();

// Function for arrow key left, right, up, and down navigation

function handlePopupArrowKeyPress(event, menuItemIndex, list) {
  const isLastMenuItem = menuItemIndex === list.length - 1;
  const isFirstMenuItem = menuItemIndex === 0;
  const nextMenuItem = list.item(menuItemIndex + 1);
  const previousMenuItem = list.item(menuItemIndex - 1);
  // if the user pressed arrow right or arrow down, focus on next one
  if (event.key === "Home") {
    event.preventDefault();
    list.item(0).focus();
    // if (list.item(0).classList.contains("checked")) {
    //   setAriaLabel(list.item(0), "Mark this step as incomplete");
    // }
    // if (!list.item(0).classList.contains("checked")) {
    //   setAriaLabel(list.item(0), "Mark this step as complete");
    // }
  }
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    if (isLastMenuItem) {
      list.item(0).focus();
      // if (list.item(0).classList.contains("checked")) {
      //   setAriaLabel(
      //     list.item(0).querySelector(".loader"),
      //     "Mark this step as incomplete"
      //   );
      // }
      // if (!list.item(0).classList.contains("checked")) {
      //   setAriaLabel(
      //     list.item(0).querySelector(".loader"),
      //     "Mark this step as complete"
      //   );
      // }
      return;
    }
    nextMenuItem.focus();
  }
  // if the user pressed arrow up or arrow left, focus on the previous one
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    if (isFirstMenuItem) {
      list.item(list.length - 1).focus();
      // if (!list.item(list.length - 1).classList.contains("checked")) {
      //   setAriaLabel(
      //     list.item(list.length - 1).querySelector(".loader"),
      //     "Mark this step as complete"
      //   );
      // }
      // isLastMenuItem.focus();
      return;
    }
    previousMenuItem.focus();
    // if (previousMenuItem.classList.contains("checked")) {
    //   setAriaLabel(
    //     previousMenuItem.querySelector(".loader"),
    //     "Mark this step as incomplete"
    //   );
    // }
    // if (!previousMenuItem.classList.contains("checked")) {
    //   setAriaLabel(
    //     previousMenuItem.querySelector(".loader"),
    //     "Mark this step as complete"
    //   );
    // }
  }
}
// Handle User Toaster Escape Key
function handleUserToasterEscapeKey(event) {
  if (event.key === "Escape") {
    event.preventDefault();
    toggleUserToasterBody();
    statusCheck("User Settings Panel has been closed");
    elements.userToaster.focus();
  }
}
// Toggle User Toaster Body
function toggleUserToasterBody() {
  const isShowing = hasClass(elements.toasterUser, "show");
  // const isExpanded = isAttributeEqualTo(elements.userToaster, "aria-expanded", "true")
  if (isShowing) {
    removeClass(elements.userToaster, "focused");
    closeMenu(elements.userToaster, elements.toasterUser);
    statusCheck("User Settings Panel has been closed back");
  } else {
    openMenu();
    statusCheck("User Settings Panel is open");
    removeClass(elements.notification, "focused");
  }
}
// Toggle Notification Toaster Body
function toggleNotificationToasterBody() {
  const isShowing = hasClass(elements.notificationToaster, "show");
  // const isExpanded = isAttributeEqualTo(elements.notification, "aria-expanded", "true")
  if (isShowing) {
    closeMenu(elements.notification, elements.notificationToaster);
    removeClass(elements.notification, "focused");
    statusCheck("Notifications Panel has been closed back");
  } else {
    toggleToaster(
      elements.userToaster,
      elements.toasterUser,
      elements.notificationToaster,
      elements.notification
    );
    addClass(elements.notification, "focused");
    statusCheck("Notification panel is open");
    elements.notificationToaster.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        closeMenu(elements.notification, elements.notificationToaster);
        statusCheck("Notification panel has been closed back");
        removeClass(elements.notification, "focused");
        elements.notification.focus();
      }
    });
    const cionc = elements.notificationToaster.querySelectorAll(".icon");
    cionc.item(0).focus();
    removeClass(elements.userToaster, "focused");
  }
}
// function to hide alert box
function hideAlert() {
  addClass(elements.alert, "hide");
  setAttribute(
    elements.alertClose,
    "aria-label",
    "You just closed the alert portal"
  );
  // statusCheck("You just closed the alert portal");
  setAttribute(elements.alertClose, "aria-hidden", "true");
  setAttribute(elements.alert, "aria-live", "off");
}
// function to toggle open the onboarding modal
function toggleSetupBody() {
  removeClass(elements.headerToggleShow, "show");
  removeClass(elements.setupBody, "hide");
  removeClass(elements.headerToggleHide, "hide");
  // setAttribute(elements.setupToggleDiv,"aria-expanded", "true");
  elements.headerToggleHide.focus();
  setAttribute(
    elements.headerToggleHide.querySelector(".icon"),
    "aria-hidden",
    "false"
  );
  statusCheck("Onboarding step opened");
  setAttribute(
    elements.headerToggleShow.querySelector(".icon"),
    "aria-hidden",
    "true"
  );
}
// function to close the onboarding modal
function hideSetupBody() {
  addClass(elements.setupBody, "hide");
  addClass(elements.headerToggleHide, "hide");
  addClass(elements.headerToggleShow, "show");
  setAttribute(elements.headerToggleShow, "aria-expanded", "false");
  elements.headerToggleShow.focus();
  // setAttribute(elements.setupToggleDiv,"aria-expanded", "false");
  if (hasClass(elements.setupBody, "hide")) {
    statusCheck("Onboarding step closed");
  }
  setAttribute(
    elements.headerToggleHide.querySelector(".icon"),
    "aria-hidden",
    "true"
  );
  setAttribute(
    elements.headerToggleShow.querySelector(".icon"),
    "aria-hidden",
    "false"
  );
}
// Function to announce the visibility change to screen readers
// Function to annouce to screen readers
function announceVisibility(label) {
  const labelledByIds = label.getAttribute("aria-labelledby").split(" ");
  const labelText = labelledByIds
    .map((id) => document.getElementById(id).textContent)
    .join(", "); // Concatenate multiple labelledBy elements if needed
  elements.hiddenMessage.ariaLabel = `${labelText} description is now visible.`;
  // Set focus to the hidden message to trigger screen reader announcement
  elements.hiddenMessage.focus();
}
// another function to annouce to screen readers
function statusCheck(content) {
  elements.hiddenMessage.ariaLabel = `${content}`;
  console.log(elements.hiddenMessage);
  // Set focus to the hidden message to trigger screen reader announcement
  elements.hiddenMessage.focus();
}
//function that controls the key event to toggle the onboarding modal
function toggleBodyHeader(event) {
  const code = event.key;
  const notExpanded = isAttributeEqualTo(
    elements.headerToggleShow,
    "aria-expanded",
    "false"
  );
  if (code === "Enter") {
    event.preventDefault();
    if (notExpanded) {
      toggleSetupBody();
      removeClass(elements.headerToggleShow, "show");
      elements.headerToggleShow.setAttribute("aria-expanded", "true");
    }
  }
}
// function that controls the key events of the toggling of the open icon of the onboarding modal
function handleHeaderToggleShowKeyup(event) {
  toggleBodyHeader(event);
}
// function that controls the key events of the toggling of the close icon of the onboarding modal
function handleHeaderToggleHideKeyup(event) {
  const code = event.key;
  const expanded = isAttributeEqualTo(
    elements.setupToggleDiv,
    "aria-expanded",
    "true"
  );
  if (code === "Escape") {
    event.preventDefault();
    if (expanded) {
      hideSetupBody();
    }
  }
}
// function that controls the key events of the toggling of the open icon of the onboarding modal
function handleHeaderShowToggleKeyUp(event) {
  const code = event.key;
  const isShowing = hasClass(elements.setupBody, "show");
  if (code === "Enter") {
    event.preventDefault();
    if (!isShowing) {
      removeClass(elements.setupBody, "hide");
      removeClass(elements.headerToggleShow, "show");
      removeClass(elements.headerToggleHide, "hide");
    }
  }
}
// Get Next Unchecked Step
function getNextUncheckedStep(elements, currentIndex) {
  // Create an empty array to hold references to customize elements
  const customizeArray = [];
  // Populate customizeArray with elements from customize NodeList
  elements.customize.forEach((element) => {
    customizeArray.push(element);
  });
  let nextStepAsc = null;
  let nextStepDesc = null;
  // Check ascending order (currentIndex + 1 to end)
  for (let i = currentIndex + 1; i < elements.customize.length; i++) {
    const checked = elements.customize[i].classList.contains("checked");
    if (!checked) {
      nextStepAsc = elements.customize[i];
      break;
    }
  }
  // Check descending order (currentIndex - 1 to start)
  for (let i = currentIndex - 1; i >= 0; i--) {
    const checked = elements.customize[i].classList.contains("checked");
    if (!checked) {
      nextStepDesc = elements.customize[i];
      break;
    }
  }

  // Choose the nearest unchecked step
  if (nextStepAsc && nextStepDesc) {
    const ascDistance = Math.abs(
      currentIndex - customizeArray.indexOf(nextStepAsc)
    );
    const descDistance = Math.abs(
      currentIndex - customizeArray.indexOf(nextStepDesc)
    );
    return ascDistance <= descDistance ? nextStepAsc : nextStepDesc;
  } else {
    return nextStepAsc || nextStepDesc;
  }
}
// function to hide the other steps when one is open
function hideAllTabs(content) {
  elements.customize.forEach((tab) => {
    const hiddenContent = tab.querySelector(".setup_hidden");
    const tabLoader = tab.querySelector(".loader");
    const tabHeader = tab.querySelector(".setup-header");
    const isTrue = isAttributeEqualTo(tabHeader, "aria-expanded", "true");
    if (isTrue) {
      setAttribute(tabHeader, "aria-expanded", "false");
    }
    if (hiddenContent !== content) {
      removeClass(hiddenContent, "show");
      setAriaLabel(tabLoader, "");
      removeClass(tab, "active-customize");
    }
  });
}
// function that controls the opening and closing of the onboarding steps
function onBoardingSteps(item, content) {
  const header = item.querySelector(".setup-header");
  const contentIsHidden = !content.classList.contains("show");
  if (contentIsHidden) {
    hideAllTabs(content);
  }
  addClass(content, "show");
  const loader = item.querySelector(".loader");
  checkActive();
  setAttribute(header, "aria-expanded", "true");
  addClass(item, "active-customize");
  item.querySelector(".loader").focus();
  const checked = hasClass(item, "checked");
  if (checked) {
    setAriaLabel(loader, "Click this to mark this step as incomplete");
  }
  item.style.animationName = "none";
}
// this function is meant to control the animation
function checkActive() {
  hideActive = !elements.headerToggleHide.classList.contains("hide");
  showActive = elements.headerToggleShow.classList.contains("show");
}
checkActive();
// the event listener for the onboarding steps
elements.customize.forEach((item) => {
  const header = item.querySelector(".setup-header");
  const content = item.querySelector(".setup_hidden");
  const handleStepClick = () => {
    onBoardingSteps(item, content);
  };
  const handleStepKeyup = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onBoardingSteps(item, content);
    }
  };
  header.addEventListener("click", handleStepClick);
  item.addEventListener("keyup", handleStepKeyup);
});

// Function to update slider and steps
function updateSliderAndSteps(steps) {
  stepsCompletedCount = steps;
  const total = 5;
  const percent = (steps / total) * 100;
  elements.progress.style.width = `${percent}%`;
  elements.stepsCompleted.textContent = `${steps}`;
  elements.range.setAttribute("aria-valuenow", steps);
  elements.range.setAttribute("aria-valuemax", total);
  elements.range.setAttribute(
    "aria-valuetext",
    `${steps} out of ${total} completed`
  );
  setAttribute(
    elements.range,
    "aria-label",
    `${steps} out of ${total} completed`
  );
}
// function to open menu
function openMenu() {
  toggleToaster(
    elements.notification,
    elements.notificationToaster,
    elements.toasterUser,
    elements.userToaster
  );
  addClass(elements.userToaster, "focused");
  // elements.userToaster.classList.add("focused");
  elements.allSettingsLink.item(0).focus();
  elements.toasterUser.addEventListener("keyup", handleUserToasterEscapeKey);
  elements.allSettingsLink.forEach((menuItem, menuItemIndex) => {
    menuItem.addEventListener("keyup", (event) => {
      handlePopupArrowKeyPress(event, menuItemIndex, elements.allSettingsLink);
    });
  });
}
// Close Menu
function closeMenu(element, element2) {
  removeClass(element2, "show");
  element.setAttribute("aria-expanded", "false");
}

// this is to control the Key Press for the onboarding steps
function keyPress() {
  const scrollDivs = elements.setupBodyDiv.querySelectorAll(".customize");
  scrollDivs.item(0).focus();
  // scrollDivs.item(0).querySelector(".loader").focus();
  // if (scrollDivs.item(0).classList.contains("checked")) {
  //   setAriaLabel(scrollDivs.item(0), " as incomplete");
  // } else {
  //   setAriaLabel(scrollDivs.item(0), " as complete");
  // }
  scrollDivs.forEach((menuItem, menuItemIndex) => {
    menuItem.addEventListener("keyup", (event) => {
      event.preventDefault();
      handlePopupArrowKeyPress(event, menuItemIndex, scrollDivs);
    });
  });
}
keyPress();
// Loader Click Event
function loadingState(load, index) {
  const currentIndex = index;
  const elements = {
    customize: document.querySelectorAll(".customize"),
    loaderChecked: load.querySelector(".loader_checked"),
    blurCheck: load.querySelector(".blur_check"),
    loaderHoverFilled: load.querySelector(".loader_hover--filled"),
    loaderEmpty: load.querySelector(".loader_empty"),
    loaderLoading: load.querySelector(".loader_loading"),
    parentElement: load.parentElement,
    grandParent: load.parentElement.parentElement.parentElement,
    hiddenStep:
      load.parentElement.parentElement.parentElement.querySelector(
        ".setup_hidden"
      ),
    setupHeader:
      load.parentElement.parentElement.parentElement.querySelector(
        ".setup-header"
      ),
  };
  const checkedElement = hasClass(elements.loaderChecked, "show");
  if (!checkedElement) {
    setLoadingState(elements);
    setTimeout(() => {
      setSuccessState(elements, currentIndex);
      setAriaLabel(load, "");
    }, 800);
  } else {
    setAriaLabel(load, "");
    setIncompleteState(elements, load);
    setTimeout(() => {
      setIncompleteSuccessState(elements, checkedElement);
    }, 800);
  }
  removeClass(elements.loaderChecked, "rotate-dark-check");
  removeClass(elements.blurCheck, "rotate-blur-check");
}
// key event function
function loadingKeyState(load, event, index) {
  const currentIndex = index;
  const elements = {
    customize: document.querySelectorAll(".customize"),
    loaderChecked: load.querySelector(".loader_checked"),
    blurCheck: load.querySelector(".blur_check"),
    loaderHoverFilled: load.querySelector(".loader_hover--filled"),
    loaderEmpty: load.querySelector(".loader_empty"),
    loaderLoading: load.querySelector(".loader_loading"),
    parentElement: load.parentElement,
    grandParent: load.parentElement.parentElement.parentElement,
    hiddenStep:
      load.parentElement.parentElement.parentElement.querySelector(
        ".setup_hidden"
      ),
    setupHeader:
      load.parentElement.parentElement.parentElement.querySelector(
        ".setup-header"
      ),
  };
  const checkedLoader = hasClass(elements.loaderChecked, "show");
  const checkedElement = hasClass(elements.loaderChecked, "show");
  if (event.key === "Enter") {
    handleEnterKey(elements, checkedElement, currentIndex, checkedLoader, load);
    setAriaLabel(load, "");
  }
  if (event.key === "Escape" && checkedElement) {
    setAriaLabel(load, "");
    handleEscapeKey(elements, checkedElement, load);
  }
  removeClass(elements.loaderChecked, "rotate-dark-check");
  removeClass(elements.blurCheck, "rotate-blur-check");
}
elements.loader.forEach((load, index) => {
  load.addEventListener("click", () => {
    loadingState(load, index);
  });
});
elements.loader.forEach((load, index) => {
  load.addEventListener("keyup", (event) => {
    event.preventDefault();
    loadingKeyState(load, event, index);
  });
});

// generic function for the loading states
function setLoadingState(elements) {
  addClass(elements.loaderEmpty, "hide");
  addClass(elements.loaderLoading, "show");
  statusCheck("Loading!");
}
function setSuccessState(elements, currentIndex, load) {
  removeClass(elements.loaderLoading, "show");
  addClass(elements.blurCheck, "show");
  addClass(elements.blurCheck, "rotate-blur-check");
  setTimeout(() => {
    handleNextSteps(elements, currentIndex);
  }, 500);
  handleStepsCompleted(elements, load);
}
function handleNextSteps(elements, currentIndex) {
  elements.blurCheck.classList.remove("show");
  elements.loaderChecked.classList.add("rotate-dark-check");
  elements.loaderChecked.classList.add("show");
  elements.grandParent.classList.add("checked");
  if (elements.grandParent.classList.contains("checked")) {
    statusCheck("Successfully marked this step");
  }
  setTimeout(() => {
    if (elements.grandParent.classList.contains("checked")) {
      const nextStep = getNextUncheckedStep(elements, currentIndex);
      if (nextStep) {
        elements.customize.forEach((step) => {
          if (step !== nextStep) {
            if (step.classList.contains("active-customize")) {
              removeClass(step, "active-customize");
            }
            const notHeader = step.querySelector(".setup-header");
            setAttribute(notHeader, "aria-expanded", "false");
            const notNextStepContent = step.querySelector(".setup_hidden");
            if (notNextStepContent.classList.contains("show")) {
              removeClass(notNextStepContent, "show");
              removeClass(step, "active-customize");
            }
          }
        });
        const nextStepContent = nextStep.querySelector(".setup_hidden");
        addClass(nextStepContent, "show");
        checkActive();
        addClass(nextStep, "active-customize");
        // statusCheck("You're now on the next onboarding step");
        const nextStepHeader = nextStep.querySelector(".setup-header");
        setAttribute(nextStepHeader, "aria-expanded", "true");
        nextStep.querySelector(".loader").focus();
        if (nextStep.classList.contains("checked")) {
          setAriaLabel(
            nextStep.querySelector(".loader"),
            "Mark this step as incomplete"
          );
        }
        if (elements.grandParent.classList.contains("active-customize")) {
          removeClass(elements.grandParent, "active-customize");
        }
        setAriaLabel(
          elements.grandParent.querySelector(".loader"),
          "Mark this step as incomplete"
        );
      }
    }
  }, 1900);
}
function handleStepsCompleted(elements, load, load) {
  if (!elements.loaderEmpty.classList.contains("hide")) {
    removeClass(elements.grandParent, "active-customize");
    removeClass(elements.grandParent, "checked");
  }
  if (stepsCompletedCount < 5) {
    stepsCompletedCount++;
    updateSliderAndSteps(stepsCompletedCount);
    if (stepsCompletedCount < 5) {
      removeClass(elements.hiddenStep, "show");
    }
  }
  setTimeout(() => {
    if (stepsCompletedCount === 5) {
      statusCheck("You've successfully marked all steps as complete");
    }
  }, 1200);
}
function setIncompleteState(elements, load) {
  removeClass(elements.blurCheck, "show");
  removeClass(elements.blurCheck, "rotate-blur-check");
  removeClass(elements.loaderChecked, "show");
  addClass(elements.loaderLoading, "show");
  statusCheck("Loading!");
}
function setIncompleteSuccessState(elements, checkedElement) {
  removeClass(elements.loaderLoading, "show");
  removeClass(elements.loaderEmpty, "hide");
  removeClass(elements.loaderChecked, "rotate-dark-check");
  if (!elements.loaderEmpty.classList.contains("hide")) {
    statusCheck("You've successfully unchecked this step");
    removeClass(elements.grandParent, "active-customize");
    removeClass(elements.grandParent, "checked");
  }
  setTimeout(() => {
    handleIncompleteSteps(elements, checkedElement);
  }, 500);
}
function handleIncompleteSteps(elements, checkedElement) {
  if (checkedElement) {
    stepsCompletedCount--;
    updateSliderAndSteps(stepsCompletedCount);
    if (stepsCompletedCount > 0) {
      removeClass(elements.hiddenStep, "show");
      setAttribute(elements.setupHeader, "aria-expanded", "false");
    } else {
      if (stepsCompletedCount === 0) {
        addClass(elements.grandParent, "active-customize");
        addClass(elements.hiddenStep, "show");
        setAttribute(elements.setupHeader, "aria-expanded", "true");
        elements.customize.forEach((content) => {
          const hiddenContent = content.querySelector(".setup_hidden");
          if (elements.hiddenStep !== hiddenContent) {
            removeClass(hiddenContent, "show");
            removeClass(content, "active-customize");
          }
        });
        statusCheck("You've successfully unchecked all steps");
      }
    }
    setAriaLabel(
      elements.grandParent.querySelector(".loader"),
      "Mark this step as complete"
    );
  }
}
function handleEnterKey(
  elements,
  checkedElement,
  currentIndex,
  checkedLoader,
  load
) {
  if (!checkedElement) {
    // if (!checkedLoader) {
    //   setAriaLabel(load, " as complete");
    // } else {
    //   setAriaLabel(load, " as incomplete");
    // }
    setLoadingState(elements);
    setTimeout(() => {
      setSuccessState(elements, currentIndex, load);
    }, 1000);
  }
}
function handleEscapeKey(elements, checkedElement, load) {
  setIncompleteState(elements, checkedElement, load);
  setTimeout(() => {
    setIncompleteSuccessState(elements, checkedElement);
  }, 300);
}

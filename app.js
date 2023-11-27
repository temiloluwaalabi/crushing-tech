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
const hiddenMessage = document.getElementById("visuallyHiddenMessage");

// Add or remove a class
// Function to announce the visibility change to screen readers
function announceVisibility(label) {
  const labelledByIds = label.getAttribute("aria-labelledby").split(" ");
  const labelText = labelledByIds
    .map((id) => document.getElementById(id).textContent)
    .join(", "); // Concatenate multiple labelledBy elements if needed

  hiddenMessage.ariaLabel = `${labelText} description is now visible.`;
  // Set focus to the hidden message to trigger screen reader announcement
  hiddenMessage.focus();
}
function statusCheck(content) {
  hiddenMessage.ariaLabel = `${content}`;
  // Set focus to the hidden message to trigger screen reader announcement
  hiddenMessage.focus();
}

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
keyPress();
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
    const cionc = notificationToaster.querySelectorAll(".icon");
    cionc.item(0).focus();

    // const firstIcon = notificationToaster.querySelector(".alert--filter");
    // firstIcon.focus();
    userToaster.classList.remove("focused");
  }
}
document.querySelector(".user__name").addEventListener("click", () => {
  allSettingsLink.item(0).focus();
});
function getNextUncheckedStep(currentIndex) {
  // Create an empty array to hold references to customize elements
  const customizeArray = [];
  // Populate customizeArray with elements from customize NodeList
  customize.forEach((element) => {
    customizeArray.push(element);
  });
  let nextStepAsc = null;
  let nextStepDesc = null;
  // Check ascending order (currentIndex + 1 to end)
  for (let i = currentIndex + 1; i < customize.length; i++) {
    const checked = customize[i].classList.contains("checked");
    if (!checked) {
      nextStepAsc = customize[i];
      break;
    }
  }
  // Check descending order (currentIndex - 1 to start)
  for (let i = currentIndex - 1; i >= 0; i--) {
    const checked = customize[i].classList.contains("checked");
    if (!checked) {
      nextStepDesc = customize[i];
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

// refactor the key event for everything, check MDN to be sure

function checkActive() {
  hideActive = !headerToggleHide.classList.contains("hide");
  showActive = headerToggleShow.classList.contains("show");
  // customize.forEach((item) => {
  //   const content = item.querySelector(".setup_hidden");
  //   if (content.classList.contains("show")) {
  //     content.style.maxHeight = content.scrollHeight + "px";
  //   } else {
  //     content.style.maxHeight = 0;
  //   }
  // });
}

// hideActive = !headerToggleHide.classList.contains("hide");
// showActive = headerToggleShow.classList.contains("show");

// if (hideActive) {
//   setupBody.style.height = setupBody.scrollHeight + "px";
// }

checkActive();

function toggleOpenSetupBody() {
  setupBody.classList.remove("hide");
  headerToggleHide.focus();
  headerToggleShow.classList.remove("show");
  headerToggleHide.querySelector(".icon").setAttribute("aria-hidden", "false");
  statusCheck("Onboarding step opened");
  if (showActive) {
  }
  // setupBody.setAttribute("aria-hidden", "false");
  // setupToggleDiv.setAttribute("aria-expanded", "true");
  // headerToggleHide.setAttribute("aria-hidden", "true");
  headerToggleHide.classList.remove("hide");
  headerToggleShow.querySelector(".icon").setAttribute("aria-hidden", "true");
  // headerToggleHide.classList.add("headerFocus");
}
// setupBody.addEventListener("keyup", (event) => {
//   if (event.key === "Home") {
//     setupBody.classList.add("hide");
//     headerToggleHide.classList.remove("show");
//     setupToggleDiv.setAttribute("aria-expanded", "false");
//     headerToggleShow.classList.remove("hide");
//     headerToggleShow.focus();
//   }
// });
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
  setupBody.classList.add("hide");
  headerToggleHide.classList.add("hide");
  headerToggleShow.classList.add("show");
  headerToggleShow.focus();
  if (setupBody.classList.contains("hide")) {
    statusCheck("Onboarding step closed");
  }
  headerToggleHide.querySelector(".icon").setAttribute("aria-hidden", "true");
  headerToggleShow.querySelector(".icon").setAttribute("aria-hidden", "false");
}

headerToggleShow.addEventListener("click", toggleOpenSetupBody);

function toggleBodyHeader(event) {
  const code = event.key;
  const notExpanded =
    headerToggleShow.getAttribute("aria-expanded") === "false";
  if (code === "Enter") {
    event.preventDefault();
    if (notExpanded) {
      toggleOpenSetupBody();
      headerToggleShow.setAttribute("aria-expanded", "true");
    }
  }
}
headerToggleShow.addEventListener("keyup", (event) => {
  toggleBodyHeader(event);
});
headerToggleHide.addEventListener("keyup", (event) => {
  const code = event.key;
  const expanded = headerToggleShow.getAttribute("aria-expanded") === "true";
  if (code === "Escape") {
    event.preventDefault();
    if (expanded) {
      headerToggleShow.setAttribute("aria-expanded", "false");
      toggleCloseSetupBody();
    }
  }
});
headerToggleHide.addEventListener("click", toggleCloseSetupBody);

function onBoardingSteps(item, content) {
  const header = item.querySelector(".setup-header");
  const contentIsHidden = !content.classList.contains("show");

  if (contentIsHidden) {
    customize.forEach((otherTabs) => {
      const otherContent = otherTabs.querySelector(".setup_hidden");
      if (otherContent !== content) {
        otherContent.classList.remove("show");
        otherTabs.classList.remove("active-customize");
        otherTabs
          .querySelector(".setup-header")
          .setAttribute("aria-expanded", "false");
      }
    });
    content.classList.add("show");
    checkActive();
    header.setAttribute("aria-expanded", "true");
    announceVisibility(content);
    item.querySelector(".loader").focus();
    item.classList.add("active-customize");
    item.style.animationName = "none";
  }
}
customize.forEach((item) => {
  const header = item.querySelector(".setup-header");
  const content = item.querySelector(".setup_hidden");
  header.addEventListener("click", () => {
    onBoardingSteps(item, content);
  });
  item.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      onBoardingSteps(item, content);
    }
  });
});
// onboarding ends

//

let stepsCompletedCount = 0;
//click event for loaders change
// loader.forEach((load) => {
//   const loaderEmpty = load.querySelector(".loader_empty");
//   const loaderHover = load.querySelector(".loader_hover");
//   const loaderHoverFilled = load.querySelector(".loader_hover--filled");

//   loaderEmpty.addEventListener("mouseenter", () => {
//     loaderHover.style.display = "block";
//     loaderEmpty.style.display = "none";
//   });
//   loaderEmpty.addEventListener("mouseleave", () => {
//     loaderHover.style.display = "none";
//     loaderEmpty.style.display = "block";
//   });

//   loaderEmpty.addEventListener("click", () => {
//     loaderHoverFilled.style.display = "block";
//   });
// });
// click event for checking
function loadingState(load, index) {
  //loaders
  const currentIndex = index;
  const loaderChecked = load.querySelector(".loader_checked");
  const blurCheck = load.querySelector(".blur_check");
  const loaderHoverFilled = load.querySelector(".loader_hover--filled");
  const loaderEmpty = load.querySelector(".loader_empty");
  const loaderLoading = load.querySelector(".loader_loading");
  //checked element
  const checkedElement = loaderChecked.classList.contains("show");
  const parentElement = load.parentElement;
  const parentGrandParents = parentElement.parentElement;
  const grandParent = parentGrandParents.parentElement;

  //hidden content
  const hiddenStep = grandParent.querySelector(".setup_hidden");
  if (!checkedElement) {
    if (!loaderChecked.classList.contains("show")) {
      load.addEventListener("focusin", () => {
        load.ariaLabel = "Mark this step as complete";
      });
    }
    loaderEmpty.classList.add("hide");
    loaderLoading.classList.add("show");
    statusCheck("Loading, please wait!");
    setTimeout(() => {
      loaderLoading.classList.remove("show");
      blurCheck.classList.add("show");
      blurCheck.classList.add("rotate-blur-check");
      setTimeout(() => {
        blurCheck.classList.remove("show");
        loaderChecked.classList.add("rotate-dark-check");
        loaderChecked.classList.add("show");
        grandParent.classList.add("checked");
        if (grandParent.classList.contains("checked")) {
          statusCheck("Successfully marked this step as complete");
        }
        const nextStep = getNextUncheckedStep(currentIndex);
        if (nextStep) {
          customize.forEach((step) => {
            if (step !== nextStep) {
              if (step.classList.contains("active-customize")) {
                step.classList.remove("active-customize");
              }
              const content = step.querySelector(".setup_hidden");
              if (content.classList.contains("show")) {
                content.classList.remove("show");
                step.classList.remove("active-customize");
              }
            }
          });
          const nextContent = nextStep.querySelector(".setup_hidden");
          nextContent.classList.add("show");
          checkActive();
          nextStep.classList.add("active-customize");
          if (nextStep.classList.contains("active-customize")) {
            statusCheck("You're now on the next onboarding step");
          }
          if (grandParent.classList.contains("active-customize")) {
            grandParent.classList.remove("active-customize");
          }
        }
        if (!loaderEmpty.classList.contains("hide")) {
          grandParent.classList.remove("active-customize");
          grandParent.classList.remove("checked");
        }
        if (stepsCompletedCount < 5) {
          stepsCompletedCount++;
          updateSliderAndSteps(stepsCompletedCount);
          if (stepsCompletedCount < 5) {
            hiddenStep.classList.remove("show");
          }
        }
      }, 500);
    }, 1000);
  } else {
    if (loaderChecked.classList.contains("show")) {
      loaderChecked.addEventListener("focusin", () => {
        load.ariaLabel = "Mark this step as incomplete";
      });
    }
    blurCheck.classList.remove("show");
    blurCheck.classList.remove("rotate-blur-check");
    loaderChecked.classList.remove("show");
    loaderLoading.classList.add("show");
    statusCheck("Loading... please wait!");
    setTimeout(() => {
      loaderLoading.classList.remove("show");
      loaderEmpty.classList.remove("hide");
      loaderChecked.classList.remove("rotate-dark-check");
      if (!loaderEmpty.classList.contains("hide")) {
        statusCheck("Successfully marked this step as incomplete");
        grandParent.classList.remove("active-customize");
        grandParent.classList.remove("checked");
      }
      if (checkedElement) {
        stepsCompletedCount--;
        updateSliderAndSteps(stepsCompletedCount);

        if (stepsCompletedCount > 0) {
          hiddenStep.classList.remove("show");
        } else {
          if (stepsCompletedCount === 0) {
            grandParent.classList.add("active-customize");
            hiddenStep.classList.add("show");
            customize.forEach((content) => {
              const hiddenContent = content.querySelector(".setup_hidden");
              if (hiddenStep !== hiddenContent) {
                hiddenContent.classList.remove("show");
                content.classList.remove("active-customize");
              }
            });
          }
        }
      }
    }, 300);
  }
  loaderChecked.classList.remove("rotate-dark-check");
  blurCheck.classList.remove("rotate-blur-check");
}
// key event for checking
function loadingKeyState(load, event, index) {
  const currentIndex = index;
  //loaders
  const loaderChecked = load.querySelector(".loader_checked");
  const blurCheck = load.querySelector(".blur_check");
  const loaderHoverFilled = load.querySelector(".loader_hover--filled");
  const loaderEmpty = load.querySelector(".loader_empty");
  const loaderLoading = load.querySelector(".loader_loading");
  //checked element
  const checkedElement = loaderChecked.classList.contains("show");
  const parentElement = load.parentElement;
  const parentGrandParents = parentElement.parentElement;
  const grandParent = parentGrandParents.parentElement;
  //hidden content
  const hiddenStep = grandParent.querySelector(".setup_hidden");
  if (event.key === "Enter") {
    //hidden content
    const hiddenStep = grandParent.querySelector(".setup_hidden");
    if (!checkedElement) {
      if (!loaderChecked.classList.contains("show")) {
        load.addEventListener("focusin", () => {
          load.ariaLabel = "Mark this step as complete";
        });
        loaderEmpty.classList.add("hide");
        loaderLoading.classList.add("show");
        statusCheck("Loading, please wait!");
        setTimeout(() => {
          loaderLoading.classList.remove("show");
          blurCheck.classList.add("show");
          blurCheck.classList.add("rotate-blur-check");
          setTimeout(() => {
            blurCheck.classList.remove("show");
            loaderChecked.classList.add("rotate-dark-check");
            loaderChecked.classList.add("show");
            grandParent.classList.add("checked");
            if (grandParent.classList.contains("checked")) {
              statusCheck("Successfully marked this step as complete");
            }
            const nextStep = getNextUncheckedStep(currentIndex);

            if (nextStep) {
              customize.forEach((step) => {
                if (step !== nextStep) {
                  if (step.classList.contains("active-customize")) {
                    step.classList.remove("active-customize");
                  }
                  const content = step.querySelector(".setup_hidden");
                  if (content.classList.contains("show")) {
                    content.classList.remove("show");
                    step.classList.remove("active-customize");
                  }
                }
              });
              const nextContent = nextStep.querySelector(".setup_hidden");
              nextContent.classList.add("show");
              checkActive();
              nextStep.classList.add("active-customize");
              if (nextStep.classList.contains("active-customize")) {
                statusCheck("You're now on the next onboarding step");
              }
              nextStep.querySelector(".loader").focus();
              if (grandParent.classList.contains("active-customize")) {
                grandParent.classList.remove("active-customize");
              }
            }

            if (!loaderEmpty.classList.contains("hide")) {
              grandParent.classList.remove("active-customize");
              grandParent.classList.remove("checked");
            }
            if (stepsCompletedCount < 5) {
              stepsCompletedCount++;
              updateSliderAndSteps(stepsCompletedCount);
              if (stepsCompletedCount < 5) {
                hiddenStep.classList.remove("show");
              }
            }
          }, 500);
        }, 1000);
      } else {
        if (loaderChecked.classList.contains("show")) {
          loaderChecked.addEventListener("focusin", () => {
            load.ariaLabel = "Mark this step as incomplete";
          });
        }
        blurCheck.classList.remove("show");
        blurCheck.classList.remove("rotate-blur-check");
        loaderChecked.classList.remove("rotate-dark-check");
        loaderChecked.classList.remove("show");
        loaderLoading.classList.add("show");
        statusCheck("Loading, Please wait!");
        setTimeout(() => {
          loaderLoading.classList.remove("show");
          loaderEmpty.classList.remove("hide");
          if (!loaderEmpty.classList.contains("hide")) {
            statusCheck("Successfully marked this step as incomplete");
            grandParent.classList.remove("active-customize");
            grandParent.classList.remove("checked");
          }
          if (checkedElement) {
            stepsCompletedCount--;
            updateSliderAndSteps(stepsCompletedCount);

            if (stepsCompletedCount > 0) {
              hiddenStep.classList.remove("show");
            } else {
              if (stepsCompletedCount === 0) {
                grandParent.classList.add("active-customize");
                hiddenStep.classList.add("show");
                customize.forEach((content) => {
                  const hiddenContent = content.querySelector(".setup_hidden");
                  if (hiddenStep !== hiddenContent) {
                    hiddenContent.classList.remove("show");
                    content.classList.remove("active-customize");
                  }
                });
              }
            }
          }
        }, 300);
      }
    }
    if (event.key === "Escape") {
      if (loaderChecked.classList.contains("show")) {
        loaderChecked.addEventListener("focusin", () => {
          load.ariaLabel = "Mark this step as incomplete";
        });
      }
      blurCheck.classList.remove("show");
      blurCheck.classList.remove("rotate-blur-check");
      loaderChecked.classList.remove("rotate-dark-check");
      loaderChecked.classList.remove("show");
      loaderLoading.classList.add("show");
      statusCheck("Loading, Please wait!");
      setTimeout(() => {
        loaderLoading.classList.remove("show");
        loaderEmpty.classList.remove("hide");
        if (!loaderEmpty.classList.contains("hide")) {
          statusCheck("Successfully marked this step as incomplete");
          grandParent.classList.remove("active-customize");
          grandParent.classList.remove("checked");
        }
        if (checkedElement) {
          stepsCompletedCount--;
          updateSliderAndSteps(stepsCompletedCount);

          if (stepsCompletedCount > 0) {
            hiddenStep.classList.remove("show");
          } else {
            if (stepsCompletedCount === 0) {
              grandParent.classList.add("active-customize");
              hiddenStep.classList.add("show");
              customize.forEach((content) => {
                const hiddenContent = content.querySelector(".setup_hidden");
                if (hiddenStep !== hiddenContent) {
                  hiddenContent.classList.remove("show");
                  content.classList.remove("active-customize");
                }
              });
            }
          }
        }
      }, 300);
    }
  }
}
loader.forEach((load, index) => {
  load.addEventListener("click", () => {
    loadingState(load, index);
  });
});
loader.forEach((load, index) => {
  load.addEventListener("keyup", (event) => {
    loadingKeyState(load, event, index);
  });
});

// range stuff
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

// watch the last video and make some edits

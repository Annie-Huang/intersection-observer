/* If you do it through setInterval, it's going to constantly check if this thing is on page.
   It's not very performance because it just constantly doing work in the background and
   it's not always going to be super accurate.
 */

const cards = document.querySelectorAll('.card');

/*
Each intersectionObserverEntry has the following attributes {
  boundingClientRect: {     <----- actual shape of the element
    bottom
    height
    left
    right
    top
    width
    x
    y
  }
  intersectionRatio: 1      <----- What percentage of the object is on the screen. 1 means 100%
  intersectionRect: {}      <----- got similar property as boundingClientRect. The amount of space that is visible on the screen of the thing we are actually targeting
  isIntersecting: true      !!! <----- is intersecting. By default, it is whether it's on the screen, visible to the user
  isVisible: false          <----- experimental feature. Don't really do much right now.
  rootBounds
  target: div.card          !!! <----- The actual thing we are observing
  time
}
*/
const observer = new IntersectionObserver((entries) => {
  console.log(entries);
  entries.forEach(entry => {
    entry.target.classList.toggle('show', entry.isIntersecting)
  })
}, {
  // threshold default is 0, meaning as soon as the first pixel is visible. You can change it 1, meaning only the whole target is visible, then we do the logic.
  // this also means as soon as the first pixel disappear in the top card (when scrolling down), we will make the card disappear.
  threshold: 1
});

// observer.observe(cards[0]);

// You only see if it you move faster, because by default as soon as a single pixel is show on the screen, we will add .show class into the card.
// That is why we need the threshold option.
cards.forEach(card => observer.observe(card))

/* If you do it through setInterval, it's going to constantly check if this thing is on page.
   It's not very performance because it just constantly doing work in the background and
   it's not always going to be super accurate.
 */

const cards = document.querySelectorAll('.card');
const cardContainer = document.querySelector('.card-container');

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
const observer = new IntersectionObserver(
  (entries) => {
    console.log(entries);
    entries.forEach((entry) => {
      entry.target.classList.toggle('show', entry.isIntersecting);

      // As soon as the target is in the page and we add .show, we stop observing, meaning leave it to the page even if we scroll up again.
      // if(entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  {
    // threshold default is 0, meaning as soon as the first pixel is visible. You can change it 1, meaning only the whole target is visible, then we do the logic.
    // this also means as soon as the first pixel disappear in the top card (when scrolling down), we will make the card disappear.
    threshold: 1,

    // rootMargin meaning subtract (for negative value) the container (e.g. the page) top and bottom by 100px each.
    // When you enable this, disable 'threshold: 1', otherwise it will go into infinite loop.
    // We usually have this in position value. E.g. rootMargin: "100px", can mean when we are about 100px from the actual image, start down loading the image.
    // rootMargin: "-100px",

    // you can define a root container, as long as it's scrollable, it will work. But 99% of time you will not need to change the this property, because you usually left it to observe the entire page.
    // root:
  }
);

const lastCardObserver = new IntersectionObserver((entries) => {
  const lastCard = entries[0];

  if (!lastCard.isIntersecting) return;
  loadNewCards();

  // switch to the new last-child so we can continue to monitor the correct value.
  lastCardObserver.unobserve(lastCard.target);
  lastCardObserver.observe(document.querySelector('.card:last-child'));
}, {});

lastCardObserver.observe(document.querySelector('.card:last-child'));

// observer.observe(cards[0]);
// You only see if it you move faster, because by default as soon as a single pixel is show on the screen, we will add .show class into the card.
// That is why we need the threshold option.
cards.forEach((card) => observer.observe(card));

function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement('div');
    card.textContent = 'New Card';
    card.classList.add('card');
    observer.observe(card);
    cardContainer.append(card);
  }
}

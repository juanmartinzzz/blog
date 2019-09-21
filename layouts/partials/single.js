let scrollTimeoutId;
const media = $("media");
const toleranceToShowMedium = 60;
const windowMiddle = ($(window).height()/2);
const mediaWidth = $(window).width() - $('#article').outerWidth();

media.css({width: mediaWidth+"px"});

const setMediaContent = element => {
  element.removeClass('hidden');
}

const clearMediaContent = () => {
  media.children().addClass('hidden');
}

const getRandomId = () => {
  return (Math.random()*1e32).toString(36);
}

$("[medium]").each(function() {
  const medium = $(this);
  const id = getRandomId();
      if(mediaWidth > 250) {
        medium.next().prop({id}).addClass('reference');
        medium.appendTo(media).addClass(`${id} hidden`);
      } else {
        medium.addClass('hidden');
      }
  })

const onScroll = () => {
  clearMediaContent();
  const windowScrollTop = $(window).scrollTop();
  const currentMiddle = windowScrollTop + windowMiddle;

  $(".reference").each(function() {
    const reference = $(this);
    const element = $('.'+reference.prop('id'));
    const referencePositionTop = reference.offset().top - toleranceToShowMedium;
    const referencePositionBottom = reference.offset().top + reference.outerHeight() + toleranceToShowMedium;
    
    if(currentMiddle > referencePositionTop && currentMiddle < referencePositionBottom) {
      setMediaContent(element);
    }
  })
}

onScroll();

$(window).scroll(function() {
  clearTimeout(scrollTimeoutId);
  
  scrollTimeoutId = setTimeout(() => {
    onScroll();
  }, 15);
})
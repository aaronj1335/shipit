(function() {
  // Full list of configuration options available here:
  // https://github.com/hakimel/reveal.js#configuration
  Reveal.initialize({
    controls: false,
    progress: true,
    history: true,
    center: true,

    // default/cube/page/concave/zoom/linear/fade/none
    transition: 'fade',
    transitionSpeed: 'fast',

    // Optional libraries used to extend on reveal.js
    dependencies: [
      { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
      { src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
      { src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
      { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
      { src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
      { src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
      // { src: 'plugin/search/search.js', async: true, condition: function() { return !!document.body.classList; } }
      // { src: 'plugin/remotes/remotes.js', async: true, condition: function() { return !!document.body.classList; } }
    ]
  });

  function onChange(e) {
    var video = document.getElementsByTagName('video')[0];
    if (e.currentSlide.hasAttribute('data-play-video')) {
      document.body.className += ' black-background';
      video.play();
      video.className = '';
    } else {
      document.body.className =
        document.body.className.replace(/[ ]?black-background/g, '');
      video.pause();
      video.className = 'hidden';
    }
  }

  Reveal.addEventListener('ready', onChange);
  Reveal.addEventListener('slidechanged', onChange);
})();

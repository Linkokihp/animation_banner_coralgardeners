
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Distortionfilter AnimationBanner Coral Gardeners MOSTLY by Phil ;)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


(function() {
    console.log('Distortionfilter AnimationBanner Started')
    window.CanvasSlideshow = function(options) {


      //--------------------Scope--------------------

      let that  =   this;


      //--------------------Options/default settings--------------------

      options                     = options || {};
      options.stageWidth          = options.hasOwnProperty('stageWidth') ? options.stageWidth : 450; //Canvas width
      options.stageHeight         = options.hasOwnProperty('stageHeight') ? options.stageHeight : 380; //Canvas height
      options.pixiSprites         = options.hasOwnProperty('sprites') ? options.sprites : [];
      options.centerSprites       = options.hasOwnProperty('centerSprites') ? options.centerSprites : true;
      options.displacementImage   = options.hasOwnProperty('displacementImage') ? options.displacementImage : 'src/img/dmap/clouds.jpg', //Chooses which dmap is used';
      options.navElement          = options.hasOwnProperty('navElement') ? options.navElement : document.querySelectorAll( '.scene-nav' );
      options.interactionEvent    = options.hasOwnProperty('interactionEvent') ? options.interactionEvent : '';
      options.displaceScaleTo     = (options.autoPlay === false) ? [0, 0] : [20, 20];
      options.textColor           = options.hasOwnProperty('textColor') ? options.textColor : '#ffffff';
      options.dispatchPointerOver = options.hasOwnProperty('dispatchPointerOver') ? options.dispatchPointerOver : false;


      //--------------------Variables--------------------  

      let renderer            = new PIXI.autoDetectRenderer(options.stageWidth, options.stageHeight, {transparent: true});
      let stage               = new PIXI.Container();
      let slidesContainer     = new PIXI.Container();
      let displacementSprite  = new PIXI.Sprite.fromImage(options.displacementImage);
      let displacementFilter  = new PIXI.filters.DisplacementFilter(displacementSprite); //Sets the Pixi Displacementfilter


      //--------------------Slidearray--------------------

      this.currentIndex = 0;


      //--------------------Initialise PIXI-Stuff--------------------

      this.initPixi = function() {

        // Add canvas to the HTML (Container div)
        document.getElementById('container').appendChild(renderer.view);
  
        // Add slide-container to the main container 
        stage.addChild( slidesContainer );

        // Enable Interactions
        stage.interactive = true;
        console.log(renderer.view.style); //CSS properties of Canvas

        // Fit renderer to the screen and defines position of pixicanvas
        if (options.fullScreen === true) { //In case of this Banner-Animation fullscreen: false
          renderer.view.style.objectFit = 'cover';
          renderer.view.style.width     = '100%';
          renderer.view.style.height    = '100%';
          renderer.view.style.top       = '44%';
          renderer.view.style.left      = '67%';
          renderer.view.style.webkitTransform = 'translate(-50%, -50%)';           
          renderer.view.style.transform = 'translate(-50%, -50%)';           
        } else { 
          renderer.view.style.maxWidth  = '100%';
          renderer.view.style.top       = '50%';
          renderer.view.style.left      = '67%';
          renderer.view.style.webkitTransform = 'translate(-50%, -50%)';           
          renderer.view.style.transform = 'translate(-50%, -50%)';//Centers the canvas to container
        }

        //Repeats the displacementsprite in future operations
        displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

        // Set the PIXI displacementfilter to stage and set some default values for the animation
        stage.filters = [displacementFilter];        
        
        //scales the displacementssprite 2 times
        displacementSprite.scale.x = 2;
        displacementSprite.scale.y = 2;
  
        // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
        displacementFilter.autoFit = options.displaceAutoFit;
        stage.addChild(displacementSprite);
      };


      //--------------------Load slides to canvas--------------------

      this.loadPixiSprites = function(sprites) {

        var rSprites = options.sprites;

        for (var i = 0; i < rSprites.length; i++) {
          var texture   = new PIXI.Texture.fromImage(sprites[i]);
          var image     = new PIXI.Sprite(texture);

          if (options.centerSprites === true) {
            image.anchor.set(0); //sets img anchor point          
          }

          if (i !== 0) {
            TweenMax.set(image, {
               alpha: 0 
              });
          }
          slidesContainer.addChild(image);
        }
      };
      

      //--------------------Default render animation--------------------
      
      if (options.autoPlay === true) {
        var ticker = new PIXI.ticker.Ticker();

        ticker.autoStart = options.autoPlay;

        ticker.add(function(delta) {
          displacementSprite.x += options.autoPlaySpeed[0] * delta;
          displacementSprite.y += options.autoPlaySpeed[1];
          renderer.render(stage);
        });
      };
      

      //--------------------Transition between slides--------------------
 
      var isPlaying   = false;  
      var slideImages = slidesContainer.children;    
      this.moveSlider = function(newIndex){

        isPlaying = true;

        var baseTimeline = new TimelineMax({ 
            onComplete: function() {
              that.currentIndex = newIndex;
              isPlaying = false;
              }
       });
        
        baseTimeline.clear();
        
        //Animation inbetween slides
        baseTimeline.to(displacementFilter.scale, 1, { 
          x: options.displaceScale[0],
          y: options.displaceScale[1]
        })
        .to(slideImages[that.currentIndex], {
          alpha: 0
        })
        .to(slideImages[newIndex], {
          alpha: 1
        })          
        .to(displacementFilter.scale, {
          x: options.displaceScaleTo[0],
          y: options.displaceScaleTo[1]
        });
      };


      //  --------------------Clickhandler--------------------
      
      var nav = options.navElement;
      
      for (var i = 0; i < nav.length; i++){
        var navItem = nav[i];

        navItem.onclick = function(event){
          // Makes sure the previous transition has ended
          if (isPlaying) {
            return false;
          }

          if (this.getAttribute('data-nav') === 'next'){
            if (that.currentIndex >= 0 && that.currentIndex < slideImages.length - 1){
              that.moveSlider(that.currentIndex + 1);
            } else {
              that.moveSlider(0);
            }
          } else {
            if (that.currentIndex > 0 && that.currentIndex < slideImages.length){
              that.moveSlider(that.currentIndex - 1);
            } else {
              that.moveSlider(spriteImages.length - 1);
            }
          }
          return false;
        }
      }


      //--------------------Init Functions to "draw" canvas--------------------

      this.init = function() {
        that.initPixi();
        that.loadPixiSprites(options.pixiSprites);
      };
      
      
      //--------------------Start initalisation--------------------
         
      this.init();
    };

    var spriteImages 	= document.querySelectorAll( '.slide-item__image' );
    var spriteImagesSrc = [];

    for (var i = 0; i < spriteImages.length; i++) {
      var img = spriteImages[i];
      spriteImagesSrc.push(img.getAttribute('src'));
    }

    //Set the speed of the animation
    var initCanvasSlideshow = new CanvasSlideshow({
      sprites: spriteImagesSrc,
      autoPlay: true,
      autoPlaySpeed: [5, 4],
      displaceScale: [200, 70],
    });

  })(); 
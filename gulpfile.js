process.env.DISABLE_NOTIFIER = true;
var elixir = require('laravel-elixir');

//Reset these defaults so it doesn't append 'resources/[resourcetype]' to everything
elixir.config.assetsPath = '';
elixir.config.css.less.folder = '';
elixir.config.css.sass.folder = '';
elixir.config.js.folder = '';
elixir.config.css.folder = '';
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |*/
 

 elixir(function(mix) {
    /*
     |--------------------------------------------------------------------------
     | Custom Assets
     |--------------------------------------------------------------------------
     | Compiles all custom styles and JavaScript
     |
     */
    //Versioned files
    var versionedFiles = [
    'css/app.css'
    ]; 

    //Main app styles
    mix.less('resources/assets/less/app.less');

    //Custom JS files
    var customScripts= [
    'app.js',
    'event/dashboard.js',
    'event/menu.js',
    ];

    for(var i in customScripts){
      var scriptName = customScripts[i];
      mix.scripts('resources/assets/js/'+scriptName,'public/js/'+scriptName );
      versionedFiles.push('js/'+scriptName);
    }

    mix.version(versionedFiles);

    /*
     |--------------------------------------------------------------------------
     | Vendor Assets
     |--------------------------------------------------------------------------
     | Compiles all vendor styles and JavaScript
     |
     */
    //Vendor SASS
    mix.sass([
      ], 'public/css/sass-compiled.css');

    //Vendor Less Styles
    mix.less([
      'bower_components/bootstrap/less/bootstrap.less',
      'bower_components/font-awesome/less/font-awesome.less',
      ], 'public/css/less-compiled.css');

    //Combine Styles
    mix.styles([
      'public/css/sass-compiled.css',
      'public/css/less-compiled.css',
      'bower_components/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css',
      'bower_components/toastr/toastr.css',
      ],'public/css/vendor.css');

    mix.scripts([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/moment/moment.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
      'bower_components/underscore/underscore.js',
      'bower_components/toastr/toastr.js',
      ], 'public/js/vendor.js');

    //Vendor Fonts
    mix.copy('bower_components/bootstrap/dist/fonts','public/fonts');
    mix.copy('bower_components/font-awesome/fonts/fontawesome-webfont.svg','public/fonts/fontawesome-webfont.svg');
    mix.copy('bower_components/font-awesome/fonts/fontawesome-webfont.woff2','public/fonts/fontawesome-webfont.woff2');
    mix.copy('bower_components/font-awesome/fonts/fontawesome-webfont.woff','public/fonts/fontawesome-webfont.woff');
    mix.copy('bower_components/font-awesome/fonts/fontawesome-webfont.ttf','public/fonts/fontawesome-webfont.ttf');
  });



elixir(function(mix) {

  mix.browserSync(
  {
    files:[
      'app/**/*',
      'public/**/*',
      'resources/views/**/*'
    ],
    proxy: 'weddinger.app',
    reloadDelay: 1000,
    open:true
  });

});
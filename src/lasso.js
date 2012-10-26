(function(){

   "use strict"; // jshint ;_;

    var root = this;

    // Require Underscore, if we're on the server, and it's not already present.
    var _ = root._;
    if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

    // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
    var $ = root.jQuery || root.Zepto || root.ender;

    var Backbone = root.Backbone;
    if (!_ && (typeof require !== 'undefined')) _ = require('backbone');

    // Add the lasso method to the prototype for Backbone Models
    Backbone.Model.prototype.lasso = function(form){

        var $form, model = this;

        // Check to see if a string or a jQuery object has been passed
        if(typeof form == 'string')
            $form = $(form);
        else if(form instanceof jQuery)
            $form = form;
        else
            return false;

        // Attach change event listeners to all of the form elements passed
        $form.find(':input').each(function(i,o){
            var $obj = $(o);
            $obj.on('change', function(e){
                if($obj.attr('name')){
                    model.set($obj.attr('name'), $obj.val());
                }
            });
        });

    }

}).call(this);
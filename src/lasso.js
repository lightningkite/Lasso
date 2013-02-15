(function() {

   'use strict'; // jshint ;_;

    var root = this;

    // Require Underscore, if we're on the server, and it's not already present.
    var _ = root._;
    if (!_ && (typeof require !== 'undefined')) {
        _ = require('underscore');
    }

    // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
    var $ = root.jQuery || root.Zepto || root.ender;

    var Backbone = root.Backbone;
    if (!_ && (typeof require !== 'undefined')) {
        _ = require('backbone');
    }

    // Add the lasso method to the prototype for Backbone Models
    Backbone.Model.prototype.lasso = function(form, options) {
        var $form, model = this;

        // Get options or use defaults. New options can be added here
        var modifiers = (options && options.hasOwnProperty('modifiers') &&
                options.modifiers instanceof Object) ? options.modifiers : {};

        // Check to see if a string or a jQuery object has been passed
        if (typeof form === 'string') {
            $form = $(form);
        } else if (form instanceof jQuery) {
            $form = form;
        } else {
            return;
        }

        // Attach change event listeners to all of the form elements passed
        $form.find('input, textarea, select').each(function(i, o) {
            var $obj = $(o);
            var name = $obj.attr('name');
            if (!name) { return; }
            var isCheckbox = $obj.is(':checkbox');
            var isRadio = $obj.is(':radio');
            var callback = function() {
                var val = isCheckbox ? $obj.prop('checked') : $obj.val();
                if (modifiers.hasOwnProperty(name) &&
                        typeof modifiers[name] === 'function') {
                    val = modifiers[name](val);
                }
                model.set(name, val, {silent: true});
                model.trigger('lasso');
                model.trigger('lasso:' + name);
            };
            $obj.on(isCheckbox || isRadio ? 'click' : 'change', callback);
        });
    };

}).call(this);

# Lasso
**Lasso** is a simple tool to allow binding *form element change events*
to *model properties*. Currently, the script requires **Backbone** and
**jQuery**.

### Lasso Setup
To use, simply include your **Lasso** reference into your scope and then call
lasso on the model you wish to attach your form to.

    var someModel = new SomeBackboneModel();
    someModel.lasso('#some-form');

You can pass in a jQuery selector or a jQuery object. The jQuery object is
useful for situations when you want to bind elements not yet attached to the
DOM.

    someModel.lasso($('#some-form'));
    // also
    someModel.lasso(this.$el.find('#some-form'));

Make sure to name each of the form elements in your form.

    <form id="some-form">
        <input type="text" name="text-element" />
    </form>

**Lasso** will then attach a change event to each of the form elements in the
form so that whenever they change the model properties with the corresponding
name will be updated.

This gives you the ability to build your form views and your models separately,
but saves you from having to define change events for every element.

### Options
An optional second argument lets you specify zero or more options with an
object. There is only on available option right now:

#### Modifiers
**Lasso** supports modifying the value displayed in a form before saving it to
the model. The is especially useful for localization such as displaying a date
to the user in one format but saving it to the model in another format. Just
pass a second argument to lasso specifying which names should be modified and
how.

    var options = {
        modifiers: {
            'text-element': function(val) {
                return val + ' this modified value will be saved to the model';
            }
        }
    };
    someModel.lasso('#some-form', options);

**Lasso** doesn't handle modifying the value of a model attribute before being
displayed to a user though - that's something your template library of choice
should do.

### Triggers
**Lasso** always updates the model silently so that a **Backbone** change event
doesn't occur and the value of hasChanged() remains useful. Since the change
event will never be triggered, a custom event is triggered for every update
instead.

    someModel.on('lasso:text-element', this.textElementUpdated, this);
    someModel.lasso('#some-form');

This event can be used to perform extra actions such as modifying the user
interface based on the current user selection.

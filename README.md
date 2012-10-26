# Lasso
**Lasso** is a simple tool to allow binding *form element change events* to *model properties*.  Currently, the script requires **Backbone** and **jQuery**.

### Lasso Setup
To use, simple include your **Lasso** reference into your scope and then call lasso on the model you wish to attach your form to.

    var someModel = new SomeBackboneModel();
    someModel.lasso('#some-form');
    
You can pass in a jQuery selector or a jQuery Object.

    someModel.lasso($('#some-form'));

Next, make sure to name each of the form elements in your form.

    <form id="some-form">
        <input type="text" name="text-element" />
    </form>

**Lasso** will then attach a change event to each of the form elements in the form so that whenever they change the model properties with the corresponding name will be updated.

This gives you the ability to build your form views and your models separately, but saves you from having to define change events for every element.
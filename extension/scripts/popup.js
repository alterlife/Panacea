"use strict"



/* Templates */
const panel_template = `
    <div class="panel panel-default">
    <div class="panel-heading">{{title}}</div>
    <div class="panel-body">
        {{checkboxHTML}}
    </div>
    </div>`;


const checkbox_template = `
    <div class="form-check">
        <input class="form-check-input" type="checkbox" id="{{optionkey}}">
        <label class="form-check-label" for="{{optionkey}}">
            {{label}}
        </label>
    </div>`;

function fill_template(template, filler) {
    for(var key in filler)
        template = template.replace(new RegExp('{{' + key + '}}', 'g'), filler[key]);
    return template;
}


var rhb = {
    /** **/
    buildMenu: function(site) {
        var checkboxHTML = "";

        if(site === undefined) {    // if no site is passed, build menus for all sites.
            for(site in menus)
                checkboxHTML += rhb.buildMenu(site);
            return checkboxHTML;
        }

        // build menu for the site passed as argument.
        var menu = menus[site];
        for(var optionkey in menu.options){
            checkboxHTML+= fill_template(checkbox_template, {optionkey: optionkey, label: menu.options[optionkey].text});
        }

        return fill_template(panel_template, {title: menu.title, checkboxHTML: checkboxHTML});
    },

    loadData: function() {
        $('input[type=checkbox]').each(function(index) {
            console.log("Loading: " + this.id);
            console.log(localStorage.getItem(this.id));
            console.log(localStorage.getItem(this.id) !== "false");
            this.checked = localStorage.getItem(this.id) !== "false";
        });
    },

    saveData: function() {
        $('input[type=checkbox]').each(function(index) {
            localStorage.setItem(this.id, this.checked);
            console.log(this.id);
            console.log(this.checked);
            console.log("Saved: " + localStorage.getItem(this.id));
        });
        alert('saved');
    }

};

$(document).ready(
    function() {
        $('#menus').html(rhb.buildMenu());

        rhb.loadData();

        $('#savebtn').click(function() {
            rhb.saveData();
        });
    }
);


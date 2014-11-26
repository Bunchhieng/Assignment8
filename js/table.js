/*

    File: /~bsoth/public_html/assignment8/js/table.js
    91.461 Assignment 8: Creating an interactive dynamic table
            Bunchhieng Soth, Umass Lowell Computer Science, Bunchhieng_soth@student.uml.edu
            Created on 11/17/2014

*/


/* I use part of Prof. Heines code to add border when error occurs. 
 **********************************************************************/
var tblValidator = {

    highlightError: function (strVarToTest) {
        $('#' + strVarToTest).css({
            "border": "2px solid red"
        });
        $('#' + strVarToTest).focus();
    },

    unhighlightError: function (strVarToTest) {
        $('#' + strVarToTest).css({
            "border": ""
        });
    }
}

/* This function is executed after the body has finished loading.
 ***********************************************************************/
$(document).ready(function () {
    var tabs = $('#tabs').tabs();
    // jQuery Validation is used to validate each input value from user.
    $('#form-horizontal').validate({
        rules: {
            pOne: {
                required: true,
                digits: true
            },
            pTwo: {
                required: true,
                digits: true
            },
            pThree: {
                required: true,
                digits: true
            },
            pFour: {
                required: true,
                digits: true
            }
        },
        messages: {
            pOne: {
                required: function () {
                    tblValidator.highlightError("pOne");
                    return "The Minimum Column Value is required."
                },
                digits: function () {
                    tblValidator.highlightError("pOne");
                    return "Please enter only digits for the Minimum Column Value.";
                }
            },
            pTwo: {
                required: function () {
                    tblValidator.highlightError("pTwo");
                    return "The Maximum Column Value is required."
                },
                digits: function () {
                    tblValidator.highlightError("pTwo");
                    return "Please enter only digits for the Maximum Column Value.";
                }
            },
            pThree: {
                required: function () {
                    tblValidator.highlightError("pThree");
                    return "The Minimum Row Value is required."
                },
                digits: function () {
                    tblValidator.highlightError("pThree");
                    return "Please enter only digits for the Minimum Row Value.";
                }
            },
            pFour: {
                required: function () {
                    tblValidator.highlightError("pFour");
                    return "The Maximum Row Value is required."
                },
                digits: function () {
                    tblValidator.highlightError("pFour");
                    return "Please enter only digits for the Maximum Row Value.";
                }
            }
        },
        success: function (error, element) {
            $(element).css({
                "border": ""
            });
        }
    });


    /* This block of code check whether there is no empty fill and starting point must be
    less than ending point.
    The keyup event is sent to an element when the user releases a key on the keyboard.
    *******************************************************/
    $('form > input').keyup(function () {
        var empty = false;
        $('form > input').each(function () {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if (empty) {
            $('input:submit').attr('disabled', 'disabled');
            $('#error4').html("Please fill in all input boxes.");
        } else if ($('#pOne').val() > $('#pTwo').val() || $('#pThree').val() > $('#pFour').val()) {
            $('input:submit').attr('disabled', 'disabled');
            $('#error4').html("Starting point must be less than ending point.");
        } else {
            $('input:submit').removeAttr('disabled');
            $('#error4').html('');
        }
    });


    /* This function creates checkbox based on how many dynamically created table.
     ********************************************************************/
    function createCheckBox(index_tabs) {
        var checkbox = document.createElement("input");
        // Set multiples key value pair for setAttribute.
        //checkbox.setAttribute("type", "checkbox");
        //checkbox.setAttribute("name", "ch-" + index_tabs);
        //checkbox.setAttribute("id", "ch-" + index_tabs);
        checkbox.type = "checkbox";
        checkbox.name = "ch-" + index_tabs;
        checkbox.id = "ch-" + index_tabs;
        var label = document.createElement("label");
        // label.setAttribute("for", "tab-" + index_tabs);
        label.htmlFor = "ch-" + index_tabs;
        label.id = "lb-" + index_tabs;
        label.appendChild(document.createTextNode("tab-" + index_tabs));
        // Append checkbox to checkbox div.
        document.getElementById('check').appendChild(checkbox);
        document.getElementById('check').appendChild(label);
    }

    /* A function is used to generate table.
     ******************************************************************/
    function createTable(index) {
        // Get four integers from user input.
        var pOne = parseInt(document.getElementById("pOne").value);
        var pTwo = parseInt(document.getElementById("pTwo").value);
        var pThree = parseInt(document.getElementById("pThree").value);
        var pFour = parseInt(document.getElementById("pFour").value);
        var oString = "",
            rowHTML;

        var nRows = pFour - pThree,
            nCols = pTwo - pOne;

        // Creating a <table> element and a <tbody> element.
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");


        // Creating all cells in the table.
        for (var i = pOne, ii = pTwo + 1; i <= ii; ++i) {
            // creates a table row
            var row = document.createElement("tr");
            for (var j = pThree, jj = pFour + 1; j <= jj; ++j) {
                // creates a cell
                var cell = document.createElement("td");
                var cellText;

                if (i == pOne && j == pThree)
                    cellText = document.createTextNode("");
                else if (i == pOne)
                    cellText = document.createTextNode(j - 1);
                else if (j == pThree)
                    cellText = document.createTextNode(i - 1);
                else
                    cellText = document.createTextNode((i - 1) * (j - 1));

                // Adding text to cell.
                cell.appendChild(cellText);
                // Adding cell to row.
                row.appendChild(cell);
            }
            // Add a row to the end of the table.
            tblBody.appendChild(row);
        }

        tbl.appendChild(tblBody);
        // Each generated table has it own id.
        tbl.setAttribute("id", "tb-" + index);
        // Table is dynamically inserted to tab based on index parameter.
        document.getElementById("tab-" + index).appendChild(tbl);
    }
    /* jQueury for tabs.
     ************************************************************************/
    /* 
        This variable is a counter for click event, which will be used to create checkbox.
        Checkbox is used to delete multiple tabs 
        *********************************************************************************/
    $('#submit').click(function () {
        var num_tabs = $('div#tabs ul li.tab').length + 1;
        createCheckBox(num_tabs);
        $('div#tabs ul').append('<li class="tab"><a href="#tab-' + num_tabs + '">Tab ' + num_tabs + '<span class="ui-icon ui-icon-circle-close ui-closable-tab"></span>' + '</a></li>');
        $('div#tabs').append('<div id="tab-' + num_tabs + '"></div>');
        createTable(num_tabs);
        $('#tabs').tabs("refresh");
        $('#tabs').tabs("option", "active", -1); //makes the new tab active
    });
    /* close icon: removing the tab on click.
     *******************************************************************/
    tabs.delegate("span.ui-icon-circle-close", "click", function () {
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        // Debugging purpose
        // alert(typeof(panelId)); // This line print out "tab-nums"
        $("#" + panelId).remove();
        // alert(panelId.replace(/[0-9]/g,''));
        /* Also remove checkbox and label when remove tab.
            regex uses to take only number from string */
        $("#ch-" + panelId.replace(/\D/g, '')).remove();
        $("#lb-" + panelId.replace(/\D/g, '')).remove();
        tabs.tabs("refresh");
    });

    /* Delete multiples tabs from the (checked) checkbox.
     *******************************************************************/
    $('#delete').click(function () {
        // Looping through all input that have type = checkbox.
        // If check box is checked, delete checkbox, label, table and tab.
        $("input[type='checkbox']:checked").each(function () {
            /* This code will delete the first tab and tabs
            $('#tabs > ul > li').remove();
            $('#tabs > #tab-1').remove();
            $("input[type='checkbox']:checked").remove();
            $("label").remove();
            ***********************************************/
            $('#tabs').tabs("refresh");
        });
    });
});
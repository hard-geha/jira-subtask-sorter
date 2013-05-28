// ==UserScript==
// @name       Jira Subtask DragNDrop Sorting
// @namespace  https://github.com/ymc-geha/jira-subtask-sorter
// @version    0.1
// @description  Allows sorting / reorganizing jira subtasks via drag n drop in parent full view
// @match      */browse/*
// @copyright  2012+, You
// ==/UserScript==

(function () {
    jQuery(function () {
        jQuery("#issuetable>tbody").sortable({start: function () {
            old_order = getorder();
        }, stop: function (event, ui) {
            new_order = getorder();
            for (i = 0; i <= new_order.length; i++) {
                id = ui.item[0].id;
                if (id == old_order[i])oldpos = i;
                if (id == new_order[i])newpos = i;
            }
            jQuery.ajax(
                {url: '/jira/secure/MoveIssueLink.jspa?id=' + jQuery('#key-val').attr('rel') + '&currentSubTaskSequence=' + oldpos + '&subTaskSequence=' + newpos, }
            );
        }});
        function getorder() {
            order = [];
            jQuery('#issuetable>tbody').children('tr').each(function (idx, elm) {
                    if (elm.id)order.push(elm.id)
                }
            );
            return order;
        }
    });
})()

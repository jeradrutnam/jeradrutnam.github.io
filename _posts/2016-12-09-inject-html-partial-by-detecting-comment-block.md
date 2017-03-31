---
layout: post
title:  Inject HTML Partial By Detecting Comment Block
comments: yes
date:   2016-12-09 10:10:35 +0530
modified_time: 
categories: UI
tags:
- UI
- HTML
- JavaScript
---

Well here is an quick method to do it. See the example below.

### Sample HTML

{% highlight html %}
<!-- [UUF-ZONE]{"name": "contents","zone": "start"} -->
<div>Contents Zone</div>
<!-- [UUF-ZONE]{"name": "contents","zone": "end"} -->

<br><br>

<!-- [UUF-ZONE]{"name": "footer","zone": "start"} -->
<div>Footer Zone</div>
<!-- [UUF-ZONE]{"name": "footer","zone": "end"} -->
{% endhighlight %}

### JavaScript/jQuery Code

{% highlight javascript %}
$(function() {

    var commentsObj = {};

    $("*").contents().filter(function(){
        return this.nodeName == '#comment';
    }).each(function(i, e){

        var commentName = e.nodeValue;

        if(commentName.indexOf('[UUF-ZONE]') >= 0){
            var commentValue = commentName.replace('[UUF-ZONE]', '');
            commentValue = JSON.parse(commentValue);

            if(!commentsObj[commentValue.name]){
               commentsObj[commentValue.name] = {};
            }
            commentsObj[commentValue.name][commentValue.zone] = e;
        }

    });

    $(commentsObj.contents.start).after("<div style='color:#f47b20'>Prepend<div>");
    $(commentsObj.contents.end).before("<div style='color:#f47b20'>Append</div>");

    var innerContents = $(commentsObj.footer.start).parent().contents();
    innerContents.slice(innerContents.index($(commentsObj.footer.start)) + 1, 
                        innerContents.index($(commentsObj.footer.end))).remove();
    $(commentsObj.footer.start).after("<div style='color:#f47b20'>Text is Replaced</div>");

});
{% endhighlight %}

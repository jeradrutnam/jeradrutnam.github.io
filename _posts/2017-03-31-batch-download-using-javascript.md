---
layout: post
title:  Batch Download Using Javascript
comments: yes
date:   2017-03-31 13:04:32 +0530
modified_time: 
categories: UI
tags:
- Chrome
- DevTools
- JavaScript
---

So here is the requirement, just think you have a website with an image album and you want to extract all the images at once. 
Right now you have to go through each image thumbnail and click to open the original size image and then you have to manually
save each image one by one. 

So here is an quick way to overcome this using Chrome developer tools console.

<br>

_Note:- This might not work for some websites where it has protected images_

<br>

Below is a sample code for websites which use jquery. But we can use the same logic and write a raw javascript script.

<br>

### JavaScript (jQuery)

{% highlight javascript %}
$('div.img').each(function(){

    // Write some logic to capture the url of the original image of each element
    // This is the part you have to figure how to find the image url. 
    // This is completely depends on the website implementation
    var str = $(this).css('background-image');
    str = str.match(/(["'])(?:(?=(\\?))\2.)*?\1/g);
    str = str[0].replace(/"/g, '');
    str = str.split('.jpg')[0] + '.jpg';
    
    // Construct the a element
    var link = document.createElement("a");
    link.target = "_blank";

    // Construct the uri
    link.href = str;
    document.body.appendChild(link);
    link.click();

    // Cleanup the DOM
    document.body.removeChild(link);
    delete link;
});
{% endhighlight %}

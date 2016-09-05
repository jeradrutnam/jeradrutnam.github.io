---
layout: post
title:  Version specific CSS for Microsoft IE
comments: yes
date:   2016-09-05 10:43:32 +0530
modified_time: 
categories: WSO2
tags: CSS

---

Here are few methods to target Microsoft Internet Explorer. Most are provided by Microsoft for their browser versions,

<br>

## IE Conditional Comments for Internet Explorer 9 & Below

{% highlight html %}
<!--[if lt IE 7]>  <html class="ie ie6"> <![endif]-->
<!--[if IE 7]>     <html class="ie ie7>  <![endif]-->
<!--[if IE 8]>     <html class="ie ie8"> <![endif]-->
<!--[if IE 9]>     <html class="ie ie9"> <![endif]-->
<!--[if gt IE 9]>  <html class="ie">     <![endif]-->
<!--[if !IE]><!--> <html>                <!--<![endif]-->
{% endhighlight %}

{% highlight html %}
<!--[if IE]>
    <link rel="stylesheet" type="text/css" href="ie-only.css" />
<![endif]-->
{% endhighlight %}

<br>

## IE CSS Hacks for Internet Explorer 8 & Below

{% highlight css %}
/* For IE 8 & Lower css hacks */
.some-class {
   margin-top: 10px\9 /* apply to all ie from 8 and below */
   *margin-top:10px;  /* apply to ie 7 and below */
   _margin-top:10px; /* apply to ie 6 and below */
}
{% endhighlight %}

<br>

## IE specific `@media-queries` for Microsoft Edge

{% highlight css %}
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
     /* IE10+ CSS styles */
     .some-class {
        margin-top: 10px;
     }
}

@supports (-ms-accelerator:true) {
     /* Microsoft Edge 12+ styles */
     .some-class {
        margin-top: 10px;
     } 
}
{% endhighlight %}
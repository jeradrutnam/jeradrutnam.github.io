---
layout: post
title:  Theming WSO2 Dashboard Server
comments: yes
date:   2016-07-25 11:00:29 +0530
modified_time: 
categories: WSO2
tags:
- Theme
- WSO2
- WSO2 Dashboard Server
---

This documentation guide is about how to change ‘Dashboard Server’ dashboard view look and feel.

<br> 

#### STEP 1: Navigate to Dashboard Server portal app :root folder

{% highlight text %}
<wso2ds-x.x.x>\repository\deployment\server\jaggeryapps\portal\
{% endhighlight %}

<br>

#### STEP 2: Create a theme folder in `~\extensions\themes\` with a custom name.

See the example folder structure below,

> **Tip**: Duplicate the  ~\extensions\themes\basic folder and rename it with a custom name 
( Basic folder contains a start-up folder structure ).

{% highlight text %}
portal
│    jaggery.conf
...
├─── extensions
│    ...
│    └─── themes
│        ├─── basic
│        └─── <custom-theme>
...
└─── theme
{% endhighlight %}

<br>

#### STEP 3: Navigate to `~\configs\` and open the `designer.json` file using a text editor 
and update the theme folder name there.

{% highlight text %}
{  
    ...
    "authentication": {
    	"activeMethod" : "custom-theme",
    	...
    },
    ...
    "theme": "custom-theme",
    ...
}
{% endhighlight %}

<br>

#### STEP 4: Done. Now duplicate any files from `~/theme/` folder to created custom theme folder in 
`~\extensions\themes\` to change it, see the example folder structure below.

{% highlight text %}
portal
│   jaggery.conf
...
├─── extensions
│    ...
│    ├─── themes
│         ├─── basic
│         └─── custom-theme
│              ├─── css
│              │    ├─── dashboard.css
│              │    ├─── portal.css
│              │    └─── + [ additional css ]
│              │
│              ├─── images
│              │    ├─── favicon.png
│              │    ├─── logo.png
│              │    └─── + [ additional images ]
│              │
│              ├─── js
│              │    └─── + [ additional js ]
│              │
│              └─── templates
│                   ├─── create-dashboard.jag
│                   ├─── dashboard-settings.jag
│                   ├─── dashboard.jag
│                   ├─── designer.jag
│                   ├─── global-navigation.jag
│                   ├─── index.jag
│                   ├─── login.jag
│                   └─── portal-header.jag
...
└─── themes
     ├─── images
     │    ├─── favicon.png
     │    └─── logo.png
     │
     └─── templates
          ├─── create-dashboard.jag
          ├─── create-gadget.jag
          ├─── dashboard-settings.jag
          ├─── dashboard.jag
          ├─── designer.jag
          ├─── global-navigation.jag
          ├─── index.jag
          ├─── locale_default.json
          ├─── locale_en.json
          ├─── locale_si.json
          ├─── login.jag
          ├─── portal-footer.jag
          └─── portal-header.jag
{% endhighlight %}

Note:- Maintain the same structure as in the `~/theme/` folder.

> **Tips**: Do not remove anything in copied .js or .css files in templates (.jag) files, 
> unless you know exactly what you are doing. Because this will break the page functionalities.

<br>

## Other useful tips

1.) Calling external files to templates

To access the custom-theme folder use the url pre-fixer: See the example below

{% highlight text %}
<%=urlPrefix%><%=utils.resolveUrl(' PATH ')%>
{% endhighlight %}

CSS:
{% highlight html %}
<link rel="stylesheet" href="<%=urlPrefix%><%=utils.resolveUrl('css/custom.css')%>">
{% endhighlight %}

JS:
{% highlight html %}
<script src="<%=urlPrefix%><%=utils.resolveUrl('js/custom.js')%>"></script>
{% endhighlight %}
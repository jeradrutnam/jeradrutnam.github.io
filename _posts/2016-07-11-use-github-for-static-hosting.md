---
layout: post
title:  Use GitHub for Static Hosting
comments: yes
date:   2016-07-11 11:00:29 +0530
modified_time: 
categories: Git
tags:
- Git
- GitHub
- Hosting
---

Creating websites for you and your projects on GitHub is very easy. Also GitHub is powered by Jekyll, which means you can also have your static blog
hosted in GitHub is few clicks away!

To geeting started: of cause you should have a GitHub account. Just follow the steps below.

you can also find these steps at: [https://pages.github.com/](https://pages.github.com/)

<br> 

## Creating GitHub.io repository

<br> 

#### STEP 1: Create a repository

Head over to GitHub and create a new repository named <username.github.io>, where username is your username (or organization name) on GitHub.

{% highlight text %}
e.g. jeradrutnam.github.io
{% endhighlight %}

<br> 

#### STEP 2: Clone the repository

Go to the folder where you want to store your project, and clone the new repository

{% highlight shell %}
git clone https://github.com/username/username.github.io
{% endhighlight %}

<br> 

#### STEP 3: Add you website files

Go to the cloned repository folder (e.g. username.github.io) and add your static/jekyll website files

> When you are adding jekyll site, ignore the `_site` folder. As GitHub compiling the jekyll site on server. So it's not necessary to add the site folder.

<br> 

#### STEP 4: Push it

Add, commit, and push your changes

{% highlight shell %}
git add --all   
git commit -m "Initial commit"   
git push -u origin master
{% endhighlight %}

<br> 

#### DONE - Check your website

To check the site, fire up a browser and go to [http://username.github.io](http://username.github.io).
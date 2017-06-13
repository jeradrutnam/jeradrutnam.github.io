---
layout: post
title:  Some git commands to remember
comments: yess
date:   2016-07-04 10:45:29 +0530
modified_time: 2017-06-13 12:49:29 +0530
categories: Git
tags:
- Git
- GitHub
- Command
- Console
---

Here is a list of Git commands that you should remember that will use more commonly. 

### Git Clone

{% highlight shell %}
git clone <repo> # Clone repo
git status # Check which branch you are working on
{% endhighlight %}   

### Git Create & Push Branch

{% highlight shell %}
git checkout -b <branch_name> # Create local branch
git push <remote_name> <branch_name> # Push branch to git, <remote-name> = "origin"
git add --all # Add changes to clone
git commit -m "string message" # Commit changes
{% endhighlight %}

### Git Rename Branch

{% highlight shell %}
git branch -m my-hot-feature feature-15 # Rename branch localy
git remote -v # Get remote name
git push origin :<old_branch_name> # Delete the remote branch with the old name
git push origin <new_branch_name> # Re-create the remote branch with the new name
{% endhighlight %}

### Git Delete Branch

{% highlight shell %}
git branch -d <branch_name> # Delete branch localy, -D for force delete
git push origin --delete <branch_name> # Delete remote branch
{% endhighlight %}

### Git Pull

{% highlight shell %}
git checkout master # Change branch to master
git pull # Pull the changes
git checkout <branch_name> # Change branch
{% endhighlight %}

### Git Push

{% highlight shell %}
git checkout master # Change branch to master
git pull # Pull the changes
git checkout <branch_name> # Change branch
git add --all # Add changes to staging
git commit -m "string message" # Commit changes to local
git push # Push commits to repo
{% endhighlight %}

### Configuring a Git remote for a fork - Set UPSTREAM

{% highlight shell %}
git remote -v # Checking remote repos
git remote add upstream <https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git> # Adding upstream [original repo] to git remote
git remote -v # Checking remote repos again to see whether its updated
{% endhighlight %}

### Change Git remote url - update orgin

{% highlight shell %}
git remote -v # Checking remote repos
git remote set-url <https://github.com/YOU/FORKED_REPOSITORY.git> # Change orign [fork repo] url
git remote -v # Checking remote repos again to see whether its updated
{% endhighlight %}

### Git fetch from Upstream

{% highlight shell %}
git fetch upstream # Git fetch from upstream
git checkout master # Change to local 'master' banrch
git merge upstream/master # Merge local with fetched upstream changes
{% endhighlight %}

### Git force merge local from branch

{% highlight shell %}
git fetch --all # Git fetch from branch
git reset --hard upstream/master # Git force reset local
git push origin master # Git push to repository master branch
{% endhighlight %}

### Git force pull

{% highlight shell %}
git fetch origin master # Git fetch master
git reset --hard FETCH_HEAD # Setting head to the fetched
git clean -df # Force clean to head
{% endhighlight %}

### Git force revet to a previous commit

{% highlight shell %}
git reset --hard <revision_id_of_last_known_good_commit> # Reset back to a last known good commit
git push --force # Force update repo
{% endhighlight %}

---
layout: post
title:  "Most Commonly Use GitHub Commands"
date:   2016-07-04 10:45:29 +0530
categories: CSS
---

Git Clone
=======================================================================================
`git clone <repo> (clone repo) 
git status (Check which branch you are working on)`


Git Create & Push Branch
========================================================================================
`git checkout -b <branch-name> (create local branch)
git push <remote-name> <branch-name> (push branch to git, <remote-name> = "origin")
git add --all (add changes to clone)
git commit -m "string message" (commit changes)`


Git Rename Branch
========================================================================================
`git branch -m my-hot-feature feature-15 (rename branch localy)
git remote -v (get remote name)
git push origin :<old_branch_name> (Delete the remote branch with the old name)
git push origin <new_branch_name> (Re-create the remote branch with the new name)`


Git Delete Branch
========================================================================================
`git branch -d <branchName> (delete branch localy, -D for force delete)
git push origin --delete <branchName> (delete remote branch)`

Git Pull
========================================================================================
`git checkout master (Change branch to master)
git pull (Pull the changes)
git checkout <branch_name> (Change branch)`


Git Push
========================================================================================
`git checkout master (Change branch to master)
git pull (Pull the changes)
git checkout <branch_name> (Change branch)
git add --all (add changes to staging)
git commit -m "string message" (commit changes to local)
git push (push commits to repo)`


Configuring a Git remote for a fork - Set UPSTREAM
========================================================================================
`git remote -v (Checking remote repos)
git remote add upstream <https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git> (Adding upstream [original repo] to git remote)
git remote -v (Checking remote repos again to see whether its updated)`


Git fetch from Upstream
========================================================================================
`git fetch upstream (git fetch from upstream)
git checkout master (change to local 'master' banrch)
git merge upstream/master (merge local with fetched upstream changes)`


Git force merge local from branch
========================================================================================
`git fetch --all
git reset --hard upstream/master
git push origin master`


Git force pull
========================================================================================
`git fetch origin master
git reset --hard FETCH_HEAD
git clean -df`

Git force revet to a previous commit
========================================================================================
`git reset --hard <revision_id_of_last_known_good_commit>
git push --force`
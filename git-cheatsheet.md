### Creating a create-react-app

- $ npx create-react-app <yourAppName>

### CRA npm commands:

Start the development server at localhost:3000

- $ npm start

Bundle the app into static files for production

- $ npm run build

Start the test runner

- $ npm test

### How to Clone a local Git project to Github:

Create a local git project folder, set up a basic file structure for your project and make a commit.

- $ git commit -am <msg>

Create a new repository on GitHub without a readme, license, or gitignore files and copy the SSH URL (not the HTTP URL).

CD into your local Git project folder and run:

- $ git remote add origin <SSH URL>

Push your local repo’s main branch to your remote GitHub repository (origin):

- $ git push origin main

### How to deploy your create-react-app to GH-Pages

First, goto github.com and create a repository and add the remote to your local repo:

- $ git remote add origin git@github.com:{username}/{repo-name}.git

Add, commit and push if not done:

- $ git commit -am 'commit message'
- $ git push origin main

CD into your react app folder and install the GitHub Pages package as a dev-dependency:

- $ npm install gh-pages --save-dev

Add these properties to your package.json inside the “homepage” and “scripts” objects:

"homepage": "https://{username}.github.io/{repo-name}/",
//...

"scripts": {
"predeploy": "npm run build",
"deploy": "gh-pages -d build",
//...

Now deploy it to GitHub Pages using the following command:

- $ npm run deploy

Lastly, goto your github repo and make your gh pages your default branch. After this, you can click your "homepage" link in your package.json file for a live preview.

### How to chain or combine commands into one:

To combine the following 4 commands:

- $ npm run build
- $ gh-pages -deploy build
- $ git commit -am
- $ git push origin main

place the following scripts inside package.json file’s "scripts" object:

"scripts": {
"predeploy": "npm run build",
"deploy": "gh-pages -d build",
"git": "npm run deploy && git add -A && git commit -m",
"postgit": "git push --all",
...
}

Then run:

- $ npm run git '<MESSAGE>'

### Git aliases:

The command below lets us type "git c" instead of "git commit":

- $ git config --global alias.c commit

To delete this alias, 

- $ git config --global --unset alias.c

If a command has more than one word, you need to use quotes:

- $ git config --global alias.unstage 'reset HEAD --'

If you want to run an external command rather than a Git subcommand, then you need to start the command with an exclamation: !. This is useful if you write your own tools that work with a Git repository. We can demonstrate by aliasing "git visual" to run "gitk":

- $ git config --global alias.run '!npm run git'  

To see a list of all aliases, we can read everything in git config:

- $ git config --global --list

Or we can read only aliases from git config using a regular expression: ^alias\. which matches all lines that start with the word "alias" with a single period . afterward.

- $ git config --get-regexp '^alias\.'

Finally, we can create another alias to list our aliases.

- $ git config --global alias.aliases "config --get-regexp '^alias\.'"

We can then use this alias to find all of our other aliases.

- $ git aliases

### How to Initialize a local git project:

CD into a new project folder and run:

- $ git init

### Logging Branches

- $ git log --oneline --decorate --graph --all

### Create a new branch

- $ git checkout -b <branchName>

### Delete a branch

- $ git branch -d <branchName>

### Change a project’s remote from ‘https’ to ‘ssh’ so that you don’t need to authenticate each time you push:

Goto your remote repo and copy its ssh url. Then on the terminal, cd into your local repo and run:

- $ git remote set-url origin <ssh url>

You can check if you have added the remote as HTTPS or SSH using:

- $ git remote -v

### Git Add

    • [$ git add -A] stages all changes including new files, modifications to tracked files, and file deletions. It is equivalent to [- $ git add .] plus [- $ git add -u]. Use this as default.
    • [$ git add .] stages new files and modifications, but does not stage deletions.
    • [$ git add -u] stages modifications and deletions of tracked files only, and disregards new files.
    • [$ git add *] means add all files in the current directory, except for files whose name begin with a dot. * is not part of git; it's a wildcard used by the shell. * expands to all the files in the current directory, and is only then passed to git, which adds them all. The "." (dot) is the current directory itself, and git will add it and the all the files under it.
    • [$ git add <filename>] to add individual files.

### The difference between [- $ git add .] and [- $ git add -A]

Both will stage all new, modified and deleted files in newer versions of Git, but [- $ git add -A] stages these changes in all directories at all levels, whether they are higher, lower or equal to your working repository. But [- $ git add .] will only stages these changes in the current and its sub-directories.

For example, suppose you have the following file structure:

/my-repo
.git/
rootfile.txt
subfolder/
nested-file.txt

And your current working directory is /my-repo.

You do [- $ rm rootfile.txt], then [- $ cd subfolder], followed by [- $ git add .]

Then the [- $ git add .] will not stage the removal of rootfile.txt because it was in a higher subdirectory, /my-repo. But doing [- $ git add -A] will stage this removal no matter where you perform the command from.

### Git Commit

    • [$ git commit -m "your message"] commit with message.
    • [$ git commit -a -m "your message"] add any changes to files that are currently tracked and commit with message.
    • [$ git commit --amend -m "your message"] to make your new commit overwrite the last commit into one significant update instead creating two trivial ones. A commit-message editor will then appear allowing you to edit the message of your previous commit. If you run this command without staging any new content, then you'll overwrite only the commit message.

### Force pushing for push conflicts after [$ git commit –amend]

The following is acceptable only if you are the only person working on the project.

If you amend a commit and try to push the result to a remote, git will not let you because local branch and remote branches no longer match. If git allowed such a push, then with two people pushing to the same repository, the last pusher would erase the previous pusher's work.

If you are the only person working on the project, you can force the push by using [- $ git push -f origin main]. Even this may not work as Git allows remote repositories to refuse non-fastforward pushes at the far end by using the configuration variable receive.denynonfastforwards, and the rejection will look like this:
! [remote rejected] master -> master (non-fast forward)

In this case, to complete the force push, you need to either (1) delete and recreate the remote branch or (2) change the remote's configuration.

Here is the first option, which invloves issuing the following commands:
[- $ git push origin :main] #delete main branch in github
[- $ git push origin main] #push main branch to github

Explanation of The above command pair:
The parameter to [- $ git push origin] uses the format <local_ref>:<remote_ref>, where <local_ref> is the name of the branch on the local repository and <remote_ref> is the name of the branch on the remote repository. The above command pair uses two shorthands. The colon “:” in front of the first shorthand parameter “:main” means we’ve left the <local_ref> part of that parameter empty, which signifies a null local_ref, which tells git to push a null branch to the remote side’s main branch. This makes git delete the main branch on the remote repo. The parameter “main” in the second command with no colon is shorthand for “main:main”, which means push the local branch with the name “main” to the remote branch with the same name.

### Git pull for push conflicts

If the remote repo was changed from outside of your local repo by someone else on your team, then you need to pull those changes into your local repo before pushing any new local repo changes to the remote repo.
[- $ git checkout] then [- $ git pull]

### Restoring a single local file back to its last committed state

- $ git restore <filename>

### Reverting all changes made on the current branch

- $ git reset --hard HEAD^

### Unstaging a staged file

[- $ git restore --staged <filename>]
https://github.blog/2015-06-08-how-to-undo-almost-anything-with-git/

### Git merge

After you have developed a new feature on a new branch called newBranch, you need to merge it into your main branch. You first have to checkout the main branch to get your HEAD back to main branch, then run - $ git merge newbranch to execute the said merge.

This will open up a commit message editor in the console asking you to enter a commit message for the merge.

    1. Type some message
    2. Press Ctrl+C+O
    3. Type a file name (such as "Merge_feature01") and press Enter
    4. Press Ctrl+X to exit

Now if you go to .git and you will find the file "Merge_feature01", containing the merge message.


### Subtree Push:

If you used a bundler like Webpack to output your production code to a separate folder named “dist” and want to serve that folder’s contents from your github pages hosting, you need to push that “dist” folder online into a separate branch in your remote’s origin root called “gh-pages“:

- $ git subtree push --prefix dist origin gh-pages

Note: This won’t work if you delete the gh-pages branch from github and try to redo the subtree push. If that’s the case, try this: https://gist.github.com/belohlavek/61dd16c08cd9c57a168408b9ac4121c2.

And if after the above you get an error saying:

- "Updates were rejected because a pushed branch tip is behind its remote counterpart. Check out this branch and integrate the remote changes (e.g. 'git pull ...') before pushing again",

Then you need to goto github, delete the gh-pages branch, then run the subtree push command again, which will now work. However, this is a workaround that is only acceptable for personal projects only. If you want to do it properly to preserve the gh-pages branch commit history, you need to study the Git docs.


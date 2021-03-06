#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    npm run build
    exit 0
fi

# Save some useful information
REPO=`git config remote.origin.url`
#SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SSH_REPO=$REPO
SHA=`git rev-parse --verify HEAD`

# Clone the existing gh-pages for this repo into build/
# Create a new empty branch if gh-pages doesn't exist yet (should only happen on first deply)
git clone $REPO build
cd build
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..

# Clean out existing contents
rm -rf build/**/* || exit 0

# Run our compile script
npm run build

# build let's go have some fun with the cloned repo
cd build
git config user.name "Travis CI"
git config user.email "travis@pointless.me"

# If there are no changes to the compiled out (e.g. this is a README update) then just bail.
if git diff --quiet; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add .
git commit -m "Deploy to GitHub Pages: ${SHA}"

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
eval `ssh-agent -s`
ssh-add ../keys/deploy

# Now that we're all set up, we can push.
git branch -m $TARGET_BRANCH
git push --force git@github.com:${TRAVIS_REPO_SLUG}.git $TARGET_BRANCH
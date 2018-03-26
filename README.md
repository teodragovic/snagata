
# Snagata

Personal training log

## Install instructions

Install Ruby -v 2.3.3 and Ruby DevKit -v 4.7.2

Both available [here](https://rubyinstaller.org/downloads/) or [here](https://www.dropbox.com/sh/38jr00rhvmsnacj/AAAhYzTVlnbGSbqxuHHWziGBa?dl=0)

Extract DevKit to `C:\` and install

```
cd C:\RubyDevKit
ruby dk.rb init
ruby dk.rb install
```

Install bundler and run to install dependencies

```
gem install bundler
bundle install
```

## Commands

Create new post

```
rake post['new post name']
```

Deploy

```
rake deploy
```

Build and spin localhost

```
rake serve
```

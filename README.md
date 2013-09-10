# don't just build, ship

[![Build Status](https://travis-ci.org/aaronj1335/shipit.png?branch=master)](https://travis-ci.org/aaronj1335/shipit)

these are the slides i used for my talk at [jquery conference austin][jqconf].
you can view them [here][slides].

i've posted this for reference, but it also serves as an example of the subject
matter of my talk: tools that help you ship.

## creating a secure github token

one of the ways you can automate the shipping process is deploying your app on
every successful travis build. in order to do so, you need to give travis the
means to push to your repository. a relatively secure, convenient way to do
that is by including an encrypted github api token in your `.travis.yml`:

1. [create a github api token][gh-token]

2. encrypt it using [travis's secure variables][secure-var]:

```shell
npm install -g travis-encrypt
travis-encrypt --repo gh-user-name/gh-repo-name --key GH_TOKEN --value <github token>
> fsqKj4hKmeB8T28xIkrYZqwM6i9CMvOnUUGXcx...
```

3. add that to your `.travis.yml` under the `env.global` list:

```yaml
env:
  global:
     - secure: fsqKj4hKmeB8T28xIkrYZqwM6i9CMvOnUUGXcx...
```

now in your travis build, you can use the `GH_TOKEN` environment variable to
push to your repo:

```shell
git clone https://${GH_TOKEN}@github.com/gh-user-name/gh-repo-name.git
```

## image credits

 - [bucky fuller's dymaxion house][dymaxion]
 - [some friggin guy getting hit by a bus][bus]
 - [clouds over the atlantic][ocean]
 - [roadblock in a vw ad][ad]
 - [success kid][kid]
 - [hal][]
 - [a hero][colbert]

[jqconf]: http://events.jquery.org/2013/austin/
[dymaxion]: http://www.nikolasschiller.com/blog/index.php/archives/2008/11/08/1550/
[bus]: http://www.benbruno.com/2012/09/new-trap-bar-deadlift-personal-best/
[ocean]: http://en.wikipedia.org/wiki/File:Clouds_over_the_Atlantic_Ocean.jpg
[ad]: http://www.germancarblog.com/2007/02/vw-touareg-road-block-ad.html
[kid]: http://www.flickr.com/photos/sammyjammy/1285612321/in/set-72157620597747933
[hal]: http://www.wallpaperup.com/2867/Space_Odyssey_-_Hal_9000.html
[colbert]: http://sharpwriter.deviantart.com/art/Stephen-Colbert-atop-an-eagle-189413801
[gh-token]: https://github.com/blog/1509-personal-api-tokens
[secure-var]: https://github.com/blog/1509-personal-api-tokens
[slides]: http://aaronstacy.com/shipit/

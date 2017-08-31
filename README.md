## Mastering Functional Programming With JavaScript
##### PacktPub and Michael Rosata

The code in this repo is used in the video courses created by Packt Publishing: ***"Mastering Functional Programming with JavaScript"*** (all courses are independant, but build into one final app and so there are different branches for all three).  You are currently looking at the ___master branch___ right now. The directions below should apply to you regardless which course you purchansed. However, for the best experience, go-to the branch for the course you purchased:

1. __Learn to Write Functional JavaScript__ [volume-one](https://github.com/mrosata/packt-mastering-fp/tree/volume-one)
2.  __Build Declarative Apps using Functional JavaScript__ [volume-two](https://github.com/mrosata/packt-mastering-fp/tree/volume-two)
3. __Mastering App Concerns with Functional JavaScript__ [volume-three](https://github.com/mrosata/packt-mastering-fp/tree/volume-three)

On the command line you may easily switch between different volumes
```bash
git checkout volume-one
git pull
```

The *second volume* "Declarative Apps using Functional Javascript", is on branch `volume-two`

```bash
git checkout volume-two
```

The master branch could be useful as a practice project. Feel free to use `master` as your base for developing functional programming skills in the future. The other branches are specific to volumes in the course.

To follow along with the videos, switch to the corresponding branch for that volume. IE: `git checkout volume-one` will bring you to a version of the project with all the starter files for Mastering Functional JavaScript. Both `volume-one` and `volume-two` are both available.


<br>

#### Setting Up the Project

You should have [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node](https://nodejs.org/en/download/) installed on your computer already. Additionally I recommend using [yarn](https://yarnpkg.org) for package management, but it's not required.
 
<br>

**1** - The first step is to download the project and move into the project directory.

```bash
# Clone the repo with either the HTTPS web address
git clone https://github.com/mrosata/packt-mastering-fp.git
# or if you have SSH setup for Git
git clone git@github.com:mrosata/packt-mastering-fp.git

cd packt-mastering-jp
```

<br>

**2** - After you have cloned the repo and changed into the project directory, move to the branch you want to work in and install the project dependencies using either `npm` or `yarn`.

```bash
git checkout volume-one

# using yarn, installation is one simple command:
yarn

# if using NPM to install, it's still simple:
npm install
```

<br>

**3** - When the install is complete, you should be able to run the dev server on `http://localhost:5000`.

```bash
# Start dev server through yarn
yarn serve
# Or run dev server using 
npm run serve
```


#### Additional Information

Please see the [wiki](https://github.com/mrosata/packt-mastering-fp/wiki) for additional info, including changes that may be on the way.

The dev server should live reload in the browser anytime you make changes to a file in the "app" directory. Any changes you make to the HTML `build/index.html` file won't trigger a reload, but you shouldn't need to touch that. The main entry file for the project is `app/entry.js`, but rather than working in that file, try to think of `app/index.js` as your "main" file


The dev server actually runs on "localhost:5000", if that is not desirable then you can configure the `HOST` and `PORT` values at the top of the [webpack.config.js](https://github.com/mrosata/packt-mastering-fp/blob/master/webpack.config.js) file. For instance, making the port "0.0.0.0" would allow you to view the site on other machines in your network.

---
Michael Rosata<br>
[Packt Publishing](https://www.packtpub.com)<br>
&copy; 2017
 

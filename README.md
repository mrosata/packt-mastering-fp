## Mastering Functional Programming With JavaScript
##### PacktPub and Michael Rosata

The code in this repo goes along with the videos in the Packt Publishing "Mastering Functional Programming with JavaScript" course and can be followed along through the different branches of the repo. The master branch will have some of the completed project functionality so that you could use it as a base for practicing your functional programming in the future if you wanted. The other branches are specific to volumes of the course.

To follow along with the videos, switch to the corresponding branch for that volume. IE: `git checkout volume-one` will bring you to a version of the project with all the starter files for the "volume one" videos. At the moment only `volume-one` is available.


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

# with yarn
yarn install

# if using NPM to install
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


The dev server should live reload in the browser anytime you make changes to a file in the "app" directory. Any changes you make to the HTML `build/index.html` file won't trigger a reload, but you shouldn't need to touch that. The main entry file for the project is `app/entry.js`, but rather than working in that file, try to think of `app/index.js` as your "main" file


The dev server actually runs on "localhost:5000", if that is not desirable then you can configure the `HOST` and `PORT` values at the top of the [webpack.config.js](https://github.com/mrosata/packt-mastering-fp/blob/master/webpack.config.js) file. For instance, making the port "0.0.0.0" would allow you to view the site on other machines in your network.

---
Michael Rosata<br>
Packt Publishing<br>
&copy; 2017

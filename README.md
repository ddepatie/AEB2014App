## Economic Issues, Food and You 

The "AEB2014" project was created to inspire students to learn about global and local food and economic-related issues. It was developed using MEANJS, a full-stack JavaScript solution for building web applications using MongoDB, Express, AngularJS, and Node.js. For more information on the webapp, use the link below.

##### [Click Here For the Deployed Site](http://ufdatawall.herokuapp.com/)

## Features and Highlights

#### Home Page
The landing page has general information on the site including the title, about, announcements and contact sections. It also includes the most expanded version of the header, which allows an admin to access admin and feedback controls and allows any user to search for documents in the site and edit their account information. The category buttons in the center of the page route to the search results page as well.

![Home Page](https://raw.github.com/CEN3031-Group-10c/AEB2014App/master/readme-img/home-page.jpg)

#### Search Results
Documents can be searched for and filtered using this search results page. Documents that are shown must fit the criteria of the filters on the right-hand side, meaning their tags must match those filters selected. Selecting a main filter allows access to a list of sub-filters as shown below. Additionally, the search bar in the header filters for any documents which also contain the entered text in their titles, descriptions or tags. Clicking on a document routes to the doc view page. It is also worth noting that documents are listed in order of view count (most to least).

![Search Results](https://raw.github.com/CEN3031-Group-10c/AEB2014App/master/readme-img/search-results.jpg)

#### Document Viewer
This simple document viewer can be used to view any document in our database. It adapts to the file type and is equipped to handle several document types including .pdf, .ppt and .doc, as well as virtually any image type. The buttons on the right-hand side allow any user to save/unsave a document for later, and admins have the ability to edit and remove documents from the system.

![Doc View](https://raw.github.com/CEN3031-Group-10c/AEB2014App/master/readme-img/doc-view.png)

#### Saved Documents Listing
Any user or admin who has saved documents for later can view them all here. The documents are shown with a thumbnail, description, and can be removed from the saved-docs view using the blue x button.

![Saved Docs](https://raw.github.com/CEN3031-Group-10c/AEB2014App/master/readme-img/saved-docs.jpg)

#### Full Document Listing (Admin Only)
Similar to the saved docs view, this allows any admin to view any stored document in a full-list format.

![Full Docs](https://raw.github.com/CEN3031-Group-10c/AEB2014App/master/readme-img/full-docs.jpg)

#### User Management (Admin Only)
This view allows admins to view basic info on every user in the system. The only editable information is the user's roles; any admin can use this feature to grant admin privileges to other users.

![User View](https://raw.github.com/CEN3031-Group-10c/AEB2014App/master/readme-img/user-view.png)

#### Create New Document (Admin Only)
Another admin only feature, this allows for simple insertion of docs into the system. The fields shown will accept any text up to a character limit, with the exception of the tags and type dropdowns which have a limited number of options.

![Create Doc](https://raw.github.com/CEN3031-Group-10c/AEB2014App/master/readme-img/create-doc.png)

#### Analytics Viewer (Admin Only)
Lastly, the analytics viewer allows an admin to see basic statics on the site such as the number of docs, users, tags and announcments. It also displays any documents which have a view count greater than 0, with their respective view count, as well as a list below of each documents with the associated tags.

![Analytics View](https://raw.github.com/CEN3031-Group-10c/AEB2014App/master/readme-img/analytics-viewer.jpg)

## Setting Up The Project

### Before You Begin
Before you begin we recommend you read about the basic building blocks that assemble a MEAN.JS application:
* MongoDB - Go through [MongoDB Official Website](http://mongodb.org/) and proceed to their [Official Manual](http://docs.mongodb.org/manual/), which should help you understand NoSQL and MongoDB better.
* Express - The best way to understand express is through its [Official Website](http://expressjs.com/), which has a [Getting Started](http://expressjs.com/starter/installing.html) guide, as well as an [ExpressJS Guide](http://expressjs.com/guide/error-handling.html) guide for general express topics. You can also go through this [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) for more resources.
* AngularJS - Angular's [Official Website](http://angularjs.org/) is a great starting point. You can also use [Thinkster Popular Guide](http://www.thinkster.io/), and the [Egghead Videos](https://egghead.io/).
* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.


### Prerequisites
The first thing you should do is install the Node.js dependencies. The boilerplate comes pre-bundled with a package.json file that contains the list of modules you need to start your application. To learn more about the modules installed visit the NPM & Package.json section.

Make sure you have installed all of the following prerequisites on your development machine:
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Git - [Download & Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to clone the existing project to your local machine.
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages. Make sure you've installed Node.js and npm first, then install bower globally using npm:

```bash
$ npm install -g bower
```

* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process. Make sure you've installed Node.js and npm first, then install grunt globally using npm:

```bash
$ npm install -g grunt-cli
```

#### Yo Generator		
-Another way would be to use the [Official Yo Generator](http://meanjs.org/generator.html), which generates a copy of the MEAN.JS 0.3.x boilerplate and supplies multiple sub-generators to ease your daily development cycles. 

```bash
$ npm install -g yo

$ npm install -g generator-meanjs
```

#### Github Repository
-To run this project, you will need to clone the github repository at this point. After installing git, in your local terminal or in the git bash, move to the directory you want to keep the project in. Then, type the following command:

```bash
$ git clone https://github.com/CEN3031-Group-10c/AEB2014App.git
```

If you choose to use the git bash, the command is instead:

```bash
$ clone https://github.com/CEN3031-Group-10c/AEB2014App.git
```

### Last Steps
Once you've downloaded the boilerplate and installed all the prerequisites, you're just a few steps away from starting to develop your MEAN application.

To install Node.js dependencies you're going to use npm again. In the application folder run this in the command-line:

```bash
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* Finally, when the install process is over, npm will initiate a bower install command to install all the front-end modules needed for the application

### Running The Application
After the install process is over, you'll be able to run your application using Grunt, just run grunt default task:

```
$ grunt
```

The application should run on port 3000 with the *development* environment configuration, so in your browser just go to [http://localhost:3000](http://localhost:3000)

That's it! The application should be running. To proceed with your development, check the other sections in this documentation.
If you encounter any problems, try the Troubleshooting section.

### Testing Your Application
You can run the full test suite included with MEAN.JS with the test task:

```bash
$ grunt test
```

This will run both the server-side tests (located in the app/tests/ directory) and the client-side tests (located in the public/modules/*/tests/).

To execute only the server tests, run the test:server task:

```bash
$ grunt test:server
```

And to run only the client tests, run the test:client task:

```bash
$ grunt test:client
```

### Getting Started With MEAN.JS
You have your application running, but there is a lot of stuff to understand. We recommend you go over the [Official Documentation](http://meanjs.org/docs.html).
In the docs we'll try to explain both general concepts of MEAN components and give you some guidelines to help you improve your development process. We tried covering as many aspects as possible, and will keep it updated by your request. You can also help us develop and improve the documentation by checking out the *gh-pages* branch of this repository.

### License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Other Organizations
In developing this project, we used the public work of organizations beyond the scope of MEANJS. Here are the credentials for those organizations.

### Bootstrap
Code and documentation copyright 2011-2015 Twitter, Inc. Code released under [the MIT license](https://github.com/twbs/bootstrap/blob/master/LICENSE). Docs released under [Creative Commons](https://github.com/twbs/bootstrap/blob/master/docs/LICENSE).

### Font Awesome
- The Font Awesome font is licensed under the SIL OFL 1.1:
  - http://scripts.sil.org/OFL
- Font Awesome CSS, LESS, and Sass files are licensed under the MIT License:
  - http://opensource.org/licenses/mit-license.html
- The Font Awesome documentation is licensed under the CC BY 3.0 License:
  - http://creativecommons.org/licenses/by/3.0/
- Attribution is no longer required as of Font Awesome 3.0, but much appreciated:
  - `Font Awesome by Dave Gandy - http://fontawesome.io`
- Full details: http://fontawesome.io/license
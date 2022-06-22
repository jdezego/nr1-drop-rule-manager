# nr1-drop-rules

## Install

1. Ensure that you have [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [npm](https://www.npmjs.com/get-npm) installed. If you're unsure whether you have one or both of them installed, run the following commands (they will return versions numbers):

```bash
git --version
npm -v
```

2. Install the [New Relic One CLI](https://one.newrelic.com/launcher/developer-center.launcher). Follow the instructions to set up your New Relic development environment.

3. Clone this repository and run the code locally against your New Relic data:

```bash
nr1 nerdpack:clone -r https://github.com/jdezego/nr1-drop-rules.git
cd nr1-drop-rules
npm install
nr1 nerdpack:uuid -gf
npm start
```

4. Visit the onenr.io URL in the console output under Launchers: drop-rules-launcher

## Deploying this Nerdpack

Open a command prompt in the nerdpack's directory and run the following commands.

```bash
nr1 nerdpack:publish
nr1 subscription:set

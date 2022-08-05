# OpenFn Portability Specification v4

Providing our users with the freedom to leverage [our tools](link_to_toolkit)
_however they want_ is at the core of what we do. From preventing vendor
lock-in, to catering for diversity in technical capacities, data sovereignty
regulations, or IT architectures and strategies across governments, NGOs, and
the digital public goods community, ensuring that an OpenFn _project_ (with all
of its automated workflows, jobs, triggers, and credentials) can be (1)
_securely_ represented as code and (2) easily run, deployed, or debugged in a
variety of environments is crucial.

## Representing a project as code

Being able to save an entire project configuration _as code_ means that critical
downstream business requirements including:

- backups
- version control using an version control system (such as git)
- audit trail generation

are much easier to meet.

## Using that representation to _do things_

Once a project can be represented as code, an administrative user should be able
to use that representation to either:

- **deploy** this project, via a CLI, to an existing Lightning instance,
  creating or reconfiguring an existing project (or create Lightning deployment
  scripts that contain pre-configured projects... i.e., deploy Lightning to a
  new server and then configure it in a single script)
- **run** individual jobs or entire workflows from this project, via a CLI, to
  enable rapid local development, testing, and debugging.

## Important Concepts/Artifacts

### project.yaml

A `project.yaml` file is a description of an OpenFn project that can be run on
Lightning or using Devtools and any local environment that's able to use NodeJs.

### project.state.yaml

A `project.state.yaml` file creates an association between keys in your
`project.yaml` and real resource IDs in an actual deployment. Note that if you
plan to deploy a single project to multiple Lightning instances, you'll generate
(and need to use) multiple state files.

N.B.: While you may call that first workflow `Kobo-to-Postgres`, it's got the ID
`5bdsa...` when deployed to `demo.openfn.org` and `831jkl...` when deployed to
`moh.gov.gh`.

### .config.json

Your `.config.json` contains settings for the CLI,
it can also have sensitive information about _where_ you're
deploying a project and what apiToken to use when you call `devtools deploy`.

```json
{
  "email": "taylor@openfn.org",
  "apiToken": "123-abc-456",
  "apiUrl": "https://demo.openfn.org/api/v2",
  "createBlankCredentials": true,
}
```

## The CLI

The new devtools command line interface (CLI) will provide several key
functions:

- `init` will help you login to an existing Lightning project and create a
  `.config.json` file that you can later use for authenticated actions, such as
  deployment or secret fetching.
- `deploy` will use your config file and, optionally, a state file to create or
  update a project, with all of its associated workflows, jobs, triggers, and
  credentials, on a running Lightning instance.
- `run` will execute a workflow or an individual job, with (optionally) given an
  initial runtime state.

### Example usage

#### init

```sh
@openfn/devtools init
# Please enter a host
https://demo.openfn.org
# Please enter your email
taylor@openfn.org
# Please enter your password
********
# Produced a .config.json with your API token
```

#### deploy

```sh
@openfn/devtools deploy --help
# devtools deploy takes:
# --config, -c :: the config file
# --state, -s :: the project state file
# --project, -p :: the project.yaml file
```

```sh
@openfn/devtools deploy
# Error! You haven't provided a config. Where should we deploy this project?
```

```sh
@openfn/devtools deploy --config ~/.staging-lightning.json
# WARNING! No state file has been detected!
# Is this the first time you're deploying this project?
# ------
# Proposed changes:
# - Create new job x
# - Create new job y
# - Create new workflow z
# - ...all resources to be created or modified
# ------
# Are you sure you want to do this? (y/N)
y
# Deploying to demo.lightning.org as a new project!
# ...
# Done!
# Your new project ID is 123-abc-456...
# State file written to ./project.state.yaml
# Click here to view your project online: https://demo.openfn.org/123-abc-456...
```

```sh
cli deploy --config ~/.staging-lightning.json --state ~/.myState.yaml
# Proposed changes:
# - Create new job A
# - Update job B
# Are you sure you want to do this? (y/N)
y
# Deploying to demo.lightning.org as projectId "789-xyz-421..."
# ...
# Done!!!
# New state saved to ./myState.yaml
# Click here to view your project online: https://demo.openfn.org/789-xyz-421...
```

#### run

```sh
@openfn/devtools run --help
# devtools run takes:
# --workflow, -w :: a workflow key
# --job, -j :: a single job
# --isolate, -i :: if starting with a single job, do NOT trigger the execution of the next job in the workflow
# --state, -s :: an initial runtime state
# --outputs, -o :: a directory for writing output and input dataclips for runs
# --overrides, -X :: a local file used to override keys for which values may not be present (e.g., secrets in credentials which are not present locally and cannot be loaded via URI.)
# --adaptors, -a :: a path to your adaptors folder, to override automatic NPM installs for adaptors
```

```sh
@openfn/devtools run --workflow "CommCare-to-OpenMRS" -o ./tmp
# Fetching values from URIs... (we might load secrets from OpenFn.org, or job expressions from other files on your system)
# Interesting that none of your jobs have credentials. That's totally cool, just unusual.
# Running `job-1`... ✅
# Result written to `.tmp/job-1.output.json`
# Running `job-2`... ✅
# Result written to `.tmp/job-2.output.json`
# Running `job-3`... ❌
# `job-3` failed; log written to `./tmp/job-3.error.txt`
```

```sh
cli run --workflow "CommCare-to-OpenMRS" --overrides ./my-credentials.yaml
```

```sh
cli run --job "job-1" --isolate -o ./tmp --overrides ./keys-and-values.yaml
# Fetching values from URIs... (we might load secrets from OpenFn.org, or job expressions from other files on your system)
# Applying key:value overrides...
# Running `job-1`...
# Dependency missing: installing @openfn/language-openmrs... ✅
# ---> `job-1`... ✅
# Result written to `.tmp/job-1.output.json`
# Skipped next job in the flow because --isolate was passed.
```

```sh
cli run --workflow "My Big Project.CommCare-to-OpenMRS" -o ./tmp --adaptors ./localAdaptors
# Fetching values from URIs... (we might load secrets from OpenFn.org, or job expressions from other files on your system)
# Using @openfn/language-commcare from ./localAdaptors/language-commcare
# Running `job-1`... ✅
# Result written to `.tmp/job-1.output.json`
# Running `job-2`...
# @openfn/language-openmrs not found locally. Installing from NPM... ✅
# ---> `job-2`... ✅
# Result written to `.tmp/job-2.output.json`
```

## Roadmap

These will turn into GitHub issues soon 🙏

- [ ] do the first thing
- [ ] do the second thing
- [ ] do the last thing

### Out of scope for this phase

- Project users and IAM via project.yaml
- Deployments as code: multiple projects? admins? users?
- Lightning feature: It's been 17 minutes since you "committed" or "saved" this
  project as code. Do you want to?

# CLI

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

## Example usage

### init

```sh
openfn init
# Please enter a host
https://demo.openfn.org
# Please enter your email
taylor@openfn.org
# Please enter your password
********
# Produced a .config.json with your API token
```

### deploy

```sh
openfn deploy --help
# devtools deploy takes:
# --config, -c :: the config file
# --state, -s :: the project state file
# --project, -p :: the project.yaml file
```

```sh
openfn deploy
# Error! You haven't provided a config. Where should we deploy this project?
```

```sh
openfn deploy --config ~/.staging-lightning.json
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
openfn deploy --config ~/.staging-lightning.json --state ~/.myState.yaml
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

### run

```sh
openfn run --help
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
openfn run --workflow "CommCare-to-OpenMRS" -o ./tmp
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
openfn run --workflow "CommCare-to-OpenMRS" --overrides ./my-credentials.yaml
```

```sh
openfn run --job "job-1" --isolate -o ./tmp --overrides ./keys-and-values.yaml
# Fetching values from URIs... (we might load secrets from OpenFn.org, or job expressions from other files on your system)
# Applying key:value overrides...
# Running `job-1`...
# Dependency missing: installing @openfn/language-openmrs... ✅
# ---> `job-1`... ✅
# Result written to `.tmp/job-1.output.json`
# Skipped next job in the flow because --isolate was passed.
```

```sh
openfn run --workflow "My Big Project.CommCare-to-OpenMRS" -o ./tmp --adaptors ./localAdaptors
# Fetching values from URIs... (we might load secrets from OpenFn.org, or job expressions from other files on your system)
# Using @openfn/language-commcare from ./localAdaptors/language-commcare
# Running `job-1`... ✅
# Result written to `.tmp/job-1.output.json`
# Running `job-2`...
# @openfn/language-openmrs not found locally. Installing from NPM... ✅
# ---> `job-2`... ✅
# Result written to `.tmp/job-2.output.json`
```

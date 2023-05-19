_This repository outlines the specification v4 for making OpenFn integrations
completely portable. It has been written as part of the deliverable 6.1
'Specification for Lightning projects-as-code' of the Digital Square Global
Goods grant._

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

Your `.config.json` contains settings for the CLI, it can also have sensitive
information about _where_ you're deploying a project and what apiToken to use
when you call `devtools deploy`.

```json
{
  "email": "taylor@openfn.org",
  "apiToken": "123-abc-456",
  "apiUrl": "https://demo.openfn.org/api/v2",
  "createBlankCredentials": true
}
```

## The CLI

See [CLI](CLI.md) for more details.

## Roadmap

These will turn into GitHub issues soon 🙏

- [ ] Export project in Lightning. Create a function which generates a series of
      workflow folders with jobs files and and a project.yaml according to the
      outlined example. Add a button to the UI which allows users to export
      their project.
- [ ] Add an option to export projects from `OpenFn/platform-app` as v4
      specification for Lightning
- [ ] Deploy a Lightning project through the cli

### Out of scope for this phase

- Project users and IAM via project.yaml
- Deployments as code: multiple projects? admins? users?
- Lightning feature: It's been 17 minutes since you "committed" or "saved" this
  project as code. Do you want to?

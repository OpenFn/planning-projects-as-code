# Implementation Notes

## Behaviour Wish List

1. Be able to create a project.yaml file from a Lightning project

   - Create a function in Lightning which queries our databases to return all of
     the project info and generates a series of jobs, folders, and project.yaml

     The `project.zip` structure and files:

     ```
     /globals
     /workflow-a
        job-1.js
        job-2.js
        job-3.js
     /workflow-b
        job-4.js
     project.yaml
     project.state.yaml
     ```

     The `project.state.yaml`:

     ```yaml
     workflows:
     - id: "32hjkd1"
     key: "workflow-a"
     - id: "d712js1"
     key: "workflow-b"

     jobs:
     - id: "jk232hj"
     key: job-1
     - id: "l6s1n3"
     key: "job-2"

     credentials:
     - id: "cae14s"
     key: "credential-1"
     ```

2. Be able to send a yaml or json payload to a Lightning instance and have it
   perform the necessary operations to reflect the desired configuration.

   - Write a CLI in [kit](https://github.com/OpenFn/kit).
   - Write a function that takes a `reduced-deployment-payload.json` and
     generates a changeset.
     - For the CLI this is `plan`
     - For the server this is `Ecto.changeset()`
   - Respond to the CLI with the changeset.
   - Write a function that takes a changeset and implements those changes.
     - For the CLI this is `apply`
     - For the server this is `Repo.multi()`

3. Be able to export a project from `OpenFn/platform-app` and convert it into a
   Lightning project?

   - Give users the option to export as `v3` (microservice) and `v4` (lightning)
   - Write a big Ecto/Sql thing. (Base it on
     `lib/open_fn_web/controllers/export_controller.ex:369`)

4. Be able to run a workflow or a single job in a workflow with an arbitrary
   input state from the CLI, without needing to talk to a Lightning server.

   - Provide an entrypoint for `execute`
   - Run 'expression/reference to expression' with 'this state/reference to
     state',
   - Run 'reference to job' with ...

## Amber's Non-Negotiables

1. A lightning.org user makes a change _and_ a dev makes a change to the same
   project and it still works. (So long as they don't change filepaths or
   names.)

## Thoughts

1. Eject something from platform that serves lightning (not two way
   compatibility)
2. People can use "version control" (eg. github) on project.yaml files if they
   want.
3. When deploying to Lightning, the repo structure doesn't matter because
   `project.yaml` is your entrypoint. However, exports from Lightning will have
   a default structure - so if a UI user and projects-as-code user are both
   working on the same project and want to sync their work, they should keep the
   default file structure. **LATER:** The project.yaml might TELL lightning
   _how_ to create folder structure, to improve developer experience.
4. User needs a special role (admin) to deploy a config to a project.
5. switch to a "branch" and then have all your work saved there, rather than on
   prod?
6. **DON'T MAKE PEOPLE DEV on production** - give them the tools they need to
   run projects/workflows locally.
7. How do we check permissions for creating and editing individual resources
   when someone deploys through the cli

## Technical Ponderings

- The project.yaml is able to talk about things in terms of "keys". How that key
  is interpreted is up to the user.
- Do we have a single state file for all projects?  
  Or do we have one per project?
- We'll have to think carefully about where we check for security rules, so they
  appear in the changesets we return before deployng

```yml
# out of scope?
# if it finds "projects" then it expects "users" and "credentials"
# if it finds "workflows" then it's for one project
# this would only be usable by a superuser
projects:
  import: "first-project/project.yaml"
  import: "second-project/project.yaml"

  second-project:
    credentials:
      - my-salesforce-keys
```

what happens if the person doing the deployment is a github action ?

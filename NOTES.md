# Implementation Notes

## Amber's Non-Negotiables

1. A lightning.org user makes a change _and_ a dev makes a change to the same
   project and it still works. (So long as they don't change filepaths or
   names.)

## Thoughts

1. Eject something from platform that serves lightning (not two way
   compatibility)
2. People can use "version control" on project.yaml files if they want. We don't
   care.
3. Repo structure doesn't matter because `project.yaml` is your entrypoint.
4. User needs a special priv (admin) to deploy a config to a project.
5. **LATER:** The project.yaml TELLS lightning _how_ to create folder structure.
6. switch to a "branch" and then have all your work saved there, rather than on
   prod?
7. **DON'T MAKE PEOPLE DEV on production** - give them the tools they need to
   run projects/workflows locally.

## Technical Ponderings

- The project.yaml is able to talk about things in terms of "keys". How that key
  is interpreted is up to the user.
- Do we have a single state file for all projects?  
  Or do we have one per project?

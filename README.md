# Projects As Code

## Amber's Non-Negotiables

1. A lightning.org user makes a change _and_ a dev makes a change to the same project and it still works.
2. (So long as they don't change filepaths or names.)

## Thoughts

1. eject something from platform that serves lightning (not two way compatibility)
2. people can use "version control" on project.yaml files if they want. we don't care.
3. we have a workflow entity
4. repo structure doesn't matter, but `project.yaml` is your entrypoint
5. do credentials get saved encrypted!?
6. user needs a special priv (admin) to deploy a config to a project
7. the project.yaml TELLS lightning _how_ to create folder structure
  - How does renaming work? (think tf-state)
8. switch to a "branch" and then have all your work saved there, rather than on prod?
9. __DON'T MAKE PEOPLE DEV on production__ - give them the tools they need to run projects/workflows locally.

## CLI

```sh
cli init
# Produced a .config.yaml
```

```sh
cli deploy
# Error! You haven't provided a config... where should we be deploying this project?
```

```sh
cli deploy --config ~/.staging-lightning.json
# Watning, no tf-state found! do you want to:
# - Create x
# - Create y
# - List of resources to be created
# Want to do all this? (y/N)
y
# Deploying to demo.lightning.org as new project
# Done!!!
# Initial state file written to ./state.yaml
# FYI, your project ID on that lightning server is 123-abc-456...
# Click me to browse the beautiful workflow diagram: https://{host}/projectId
```

```sh
cli deploy --config ~/.staging-lightning.json --state ~/.myState.yaml
# detected changes...
# - Create x
# - Update y
# Ready to overwrite these resources? (y/N)
y
# Deploying to demo.lightning.org as projectId "123-abc-456"
# Done!!!
# State file updated at ./myState.yaml
# Click me to browse the beautiful workflow diagram: https://{host}/projectId
```

```sh
cli run workflow "CommCare-to-OpenMRS"
# WARNING, you didn't give us any secrets... we'll try to get them from openfn.org
# but we haven't built that feature yet!
cli run workflow "CommCare-to-OpenMRS" --secrets ./credentials.yaml
cli run workflow "CommCare-to-OpenMRS" --overrides ./keys-and-values.yaml
cli run workflow "My Big Project.CommCare-to-OpenMRS" --overrides ./keys-and-values.yaml
cli run workflow "My Big Project.CommCare-to-OpenMRS" --adaptors ./path/to/localAdaptors # OR IT NPM INSTALLS STUFF?
```

## Out of scope

1. Project users and IAM via project.yaml
2. Deployments as code: multiple projects? admins? users?
3. It's been 17 minutes since you "committed" or "saved" this project as code. Do you want to?

## Notes

State is an association between keys in your project.yaml and ids in an actual deployment
The project.yaml is able to talk about things in terms of keys - how that key is interpreted is up to the user

## Technical Ponderings

- Do we have a single state file for all projects?  
  Or do we have one per project?
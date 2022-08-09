# Test plan for portability spec v4

As a Lightning environment can be spun up as part of a CI/CD pipeline, we
envision a test suite for this specification as follows:

## On each commit/PR to this repo:

1. start new lighting instance via latest docker image
2. wait for green light
3. setup config.json
4. `deploy` each example project in the `/examples/` folder
   - For each, ensure that specs are valid.
